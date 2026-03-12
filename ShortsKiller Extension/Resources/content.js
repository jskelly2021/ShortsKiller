
const REDIRECT_URL = "https://www.youtube.com/";

function isShortsPage() {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments.includes("shorts");
}

function redirectIfShorts() {
    if (isShortsPage() && window.location.href !== REDIRECT_URL) {
        window.location.replace(REDIRECT_URL);
    }
}

redirectIfShorts();
