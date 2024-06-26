# Discord Token Login Extension

This browser extension adds a token login option to the Discord login page. It also provides a browser action button that, when clicked, redirects to the Discord login page.

## Features

- Adds a token login option directly on the Discord login page.
- Displays a loading bar with "Logging In..." text when attempting to log in.
- Provides a browser action button to quickly navigate to the Discord login page.

## Installation

### Chrome

1. **Clone or Download this Repository**
   - Clone this repository to your local machine using `git clone` or download the ZIP file and extract it.

2. **Navigate to chrome://extensions/**
   - Open your Chrome browser and navigate to `chrome://extensions/`.

3. **Enable Developer Mode**
   - In the top right corner, toggle the switch to enable "Developer mode".

4. **Load Unpacked Extension**
   - Click the "Load unpacked" button and select the directory where you cloned or extracted the repository.

5. **Verify the Extension**
   - The extension should now be loaded into Chrome. You should see the extension icon in the toolbar.

### Firefox

1. **Clone or Download this Repository**
   - Clone this repository to your local machine using `git clone` or download the ZIP file and extract it.

2. **Navigate to about:debugging**
   - Open your Firefox browser and navigate to `about:debugging`.

3. **Click on "This Firefox"**
   - Click on "Load Temporary Add-on" and select the `manifest.json` file from the directory where you cloned or extracted the repository.

4. **Verify the Extension**
   - The extension should now be loaded into Firefox. You should see the extension icon in the toolbar.

### Edge

1. **Clone or Download this Repository**
   - Clone this repository to your local machine using `git clone` or download the ZIP file and extract it.

2. **Navigate to edge://extensions/**
   - Open your Edge browser and navigate to `edge://extensions/`.

3. **Enable Developer Mode**
   - In the bottom left corner, toggle the switch to enable "Developer mode".

4. **Load Unpacked Extension**
   - Click the "Load unpacked" button and select the directory where you cloned or extracted the repository.

5. **Verify the Extension**
   - The extension should now be loaded into Edge. You should see the extension icon in the toolbar.

## Usage

1. **Using the Token Login**
   - Navigate to `https://discord.com/login`.
   - You will see the token login UI below the regular login fields.
   - Enter your token in the provided field and click the "Login" button.
   - A loading bar with "Logging In..." text will appear, and you will be logged in using your token.

2. **Using the Browser Action Button**
   - Click on the extension icon in the browser toolbar.
   - A popup will appear with a button labeled "Go to Discord Login".
   - Click the button to be redirected to the Discord login page.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
