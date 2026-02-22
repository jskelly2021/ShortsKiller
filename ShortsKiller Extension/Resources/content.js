 (() => {
   "use strict";

   // ---------- Config ----------
   const HOME_URL = "https://www.youtube.com/";
   const MOBILE_HOME_URL = "https://m.youtube.com/";

   // If you're on m.youtube.com, prefer mobile home
   function preferredHome() {
     return location.hostname.startsWith("m.") ? MOBILE_HOME_URL : HOME_URL;
   }

   // ---------- Redirect Shorts pages ----------
   function redirectIfOnShortsPage() {
     const path = location.pathname || "";
     // Common shorts URL patterns:
     // /shorts/<id>
     // /shorts/<id>?feature=share
     // sometimes /shorts
     if (path === "/shorts" || path.startsWith("/shorts/")) {
       // Try to convert to /watch?v=<id> when possible
       const parts = path.split("/");
       const maybeId = parts.length >= 3 ? parts[2] : null;

       if (maybeId && maybeId.length >= 6) {
         const target = `${preferredHome()}watch?v=${encodeURIComponent(maybeId)}`;
         location.replace(target);
       } else {
         location.replace(preferredHome());
       }
       return true;
     }
     return false;
   }

   // ---------- Remove Shorts UI (best effort selectors) ----------
   function removeShortsUI(root = document) {
     // 1) Remove shelves/renderers explicitly for shorts (desktop + mobile variants)
     const selectorsToRemove = [
       "ytd-reel-shelf-renderer",
       "ytd-rich-shelf-renderer[is-shorts]",
       "ytd-shorts-shelf-renderer",
       "ytd-reel-video-renderer",
       "ytm-reel-shelf-renderer",
       "ytm-reel-item-renderer",
       "ytm-shorts-lockup-view-model"
     ];

     for (const sel of selectorsToRemove) {
       root.querySelectorAll(sel).forEach(el => el.remove());
     }

     // 2) Remove any video tile/card that links to /shorts/<id>
     root.querySelectorAll('a[href^="/shorts/"]').forEach(a => {
       // Remove the "card" container if we can find it, else remove the link itself
       const container =
         a.closest("ytd-rich-item-renderer") ||
         a.closest("ytd-video-renderer") ||
         a.closest("ytd-grid-video-renderer") ||
         a.closest("ytm-media-item") ||
         a.closest("ytm-compact-video-renderer") ||
         a.closest("div");

       if (container) container.remove();
       else a.remove();
     });

     // 3) Remove left-nav “Shorts” entry (desktop)
     // Titles/aria-labels can vary by locale; this works for English.
     // If you want multi-language, you’d add more labels here.
     const navSelectors = [
       'ytd-guide-entry-renderer a[title="Shorts"]',
       'ytd-mini-guide-entry-renderer a[title="Shorts"]',
       'ytd-guide-entry-renderer a[href^="/shorts"]',
       'ytd-mini-guide-entry-renderer a[href^="/shorts"]'
     ];
     for (const sel of navSelectors) {
       root.querySelectorAll(sel).forEach(a => a.closest("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer")?.remove() || a.remove());
     }

     // 4) Remove top tabs/chips that lead to Shorts (sometimes appears as a chip)
     root.querySelectorAll('a[href^="/shorts"]').forEach(a => a.remove());
   }

   // ---------- Intercept clicks to Shorts ----------
   function rewriteShortsLinks(e) {
     const a = e.target?.closest?.("a");
     if (!a) return;

     const href = a.getAttribute("href") || "";
     if (!href.startsWith("/shorts/")) return;

     e.preventDefault();
     e.stopPropagation();

     const id = href.split("/")[2]?.split("?")[0];
     if (id) {
       location.assign(`/watch?v=${encodeURIComponent(id)}`);
     } else {
       location.assign(preferredHome());
     }
   }

   // ---------- Handle SPA navigations ----------
   // YouTube changes URLs without full page loads; we hook history methods.
   function hookHistory() {
     const _pushState = history.pushState;
     const _replaceState = history.replaceState;

     function onNav() {
       // redirect first, then cleanup
       redirectIfOnShortsPage();
       // queue microtask so DOM has a chance to update
       queueMicrotask(() => removeShortsUI(document));
     }

     history.pushState = function () {
       const ret = _pushState.apply(this, arguments);
       onNav();
       return ret;
     };

     history.replaceState = function () {
       const ret = _replaceState.apply(this, arguments);
       onNav();
       return ret;
     };

     window.addEventListener("popstate", onNav);
   }

   // ---------- MutationObserver: keep removing Shorts as they appear ----------
   function observeDom() {
     const obs = new MutationObserver(mutations => {
       // Fast path: only scan added nodes rather than the whole doc every time
       for (const m of mutations) {
         for (const node of m.addedNodes) {
           if (!(node instanceof Element)) continue;
           removeShortsUI(node);
         }
       }
     });

     obs.observe(document.documentElement, {
       childList: true,
       subtree: true
     });
   }

   // ---------- Boot ----------
   // 1) Early redirect if already on Shorts
   if (redirectIfOnShortsPage()) return;

   // 2) Rewrite clicks
   document.addEventListener("click", rewriteShortsLinks, true);

   // 3) Handle SPA navigation
   hookHistory();

   // 4) Initial cleanup (twice: early + after load)
   removeShortsUI(document);
   window.addEventListener("load", () => removeShortsUI(document));

   // 5) Observe the dynamic UI
   observeDom();
 })();
