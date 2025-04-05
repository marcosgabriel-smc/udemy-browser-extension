# Udemy Course Time Tracker (Firefox)

A Firefox extension that displays the remaining time for Udemy courses directly on the course page.

## Features

- Automatically detects and displays course duration on Udemy course pages
- Shows time in a clean, easy-to-read format
- Updates automatically when navigating between course sections
- Matches Udemy's design aesthetic

## Installation

### For Users

1. Download the `.xpi` file from the releases section
2. Open Firefox and go to `about:addons`
3. Click the gear icon and select "Install Add-on From File..."
4. Select the downloaded `.xpi` file
5. The extension will automatically activate when you visit any Udemy course page

### For Developers

1. Clone or download this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to the directory containing these files and select the `manifest.json` file
6. The extension will be temporarily installed and will work until you restart Firefox

## Usage

1. Navigate to any Udemy course page
2. The course duration will be displayed at the top of the course content
3. The time display will update automatically as you navigate through the course

## Files

- `manifest.json`: Extension configuration
- `content.js`: Main script that handles time extraction and display
- `styles.css`: Styling for the time display
- `icon48.png` and `icon128.png`: Extension icons (you'll need to add these)

## Publishing to Firefox Add-ons

To publish this extension to the Firefox Add-ons store:

1. Create an account on [Firefox Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/)
2. Create a new submission and upload the extension files
3. Follow the submission process to make your extension available to Firefox users 