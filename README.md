# ShortsKiller

ShortsKiller is a Safari Web Extension for iOS that removes YouTube Shorts for a cleaner, distraction-free browsing experience.

## Features

- Hides YouTube Shorts from the interface
- Redirects `/shorts` URLs to standard video pages
- Lightweight and fast
- No tracking, analytics, or data collection

## How It Works

The extension runs locally in Safari and modifies YouTube pages to remove Shorts-related elements. It does not send or store any user data.

## Installation (App Store)

1. Download the app from the App Store
2. Open Settings → Safari → Extensions
3. Enable **ShortsKiller**
4. Allow permissions for YouTube

## Development

### Requirements
- Xcode
- iOS device (for testing Safari extensions)

### Run Locally
1. Clone the repo
2. Open the project in Xcode
3. Build and run on a device
4. Enable the extension in Safari settings

## Project Structure

- `App/` – Host iOS app
- `Extension/` – Safari Web Extension
  - `manifest.json`
  - `content.js`
  - `content.css`

## Privacy

ShortsKiller does not collect, store, or share any personal data.

See full policy:
👉 [Privacy Policy](https://jskelly2021.github.io/ShortsKiller/privacy.html)

## License

MIT License
