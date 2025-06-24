# 🧨 Minesweeper - Chrome Extension

Hi!  
This is a simple Minesweeper game I made as a Chrome extension. I built it because I wanted a quick, clean version of Minesweeper that you can play right in your browser, without ads or distractions.

## 🔧 What I used

I made the game using:
- **HTML** — for the structure of the popup
- **CSS** — for styling (manually adapted to look clean in a small window)
- **JavaScript** — for the game logic (mines, flags, timer, etc.)

I also made it work as a **popup** inside Chrome using the `manifest.json` and a couple of basic browser extension APIs.

## 🎮 Features

- Classic Minesweeper gameplay
- Easy, Medium, and Hard difficulty levels
- Timer and mine counter
- Works fully offline
- Lightweight and fast

## 📷 Screenshots

_Add your screenshot here (for example: popup view with different difficulties)_

![screenshot](./screenshots/game-view.png)

## 🧩 Install Extension

➡️ [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/YOUR-EXTENSION-ID)  
_(I'll update this link once it's published.)_

## 📁 Folder structure

```text
├── manifest.json
├── index.html
├── style.css
├── script.js
├── smile.png
├── dead.png
├── surprised.png
└── icons/
    └── icon48.png


🚀 How to run locally
If you want to test this extension locally:

1. Clone this repo

2. Go to chrome://extensions in your browser

3. Enable "Developer mode"

4. Click "Load unpacked" and select the folder with the extension

5. That’s it — the popup should work right away.



Thanks for checking this out! If you have ideas, feel free to fork or contribute.