/*
 * Content script for the Discord Token Login extension.
 *
 * This script listens for messages from the popup and, when instructed,
 * injects the provided token into Discord's localStorage to perform a token
 * login. It intentionally does not modify the page's UI or styles.
 */

// Listen for messages from the extension (e.g., the popup).
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.action === 'tokenLogin' && message.token) {
    loginWithToken(message.token);
    // Respond to let the sender know the message was handled.
    sendResponse({ status: 'success' });
  }
});

/**
 * Performs a token-based login by repeatedly injecting the provided token into
 * localStorage via an iframe. After a short delay, the page reloads to
 * complete the login process.
 *
 * @param {string} token - The Discord authentication token.
 */
function loginWithToken(token) {
  if (!token || typeof token !== 'string') {
    console.warn('Discord Token Login: no token provided or invalid token.');
    return;
  }

  // Helper function to perform the injection and reload.
  function performLogin(tok) {
    // Repeatedly set the token in an iframe's localStorage. This is a common
    // technique used by token login extensions to bypass Discord's login form.
    const interval = setInterval(() => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      try {
        iframe.contentWindow.localStorage.token = `"${tok}"`;
      } catch (err) {
        console.error('Discord Token Login: failed to set token in localStorage:', err);
      }
      document.body.removeChild(iframe);
    }, 50);

    // After a short delay, stop setting the token and reload the page to apply
    // the token. The delay allows the token to be set a few times before
    // reloading.
    setTimeout(() => {
      clearInterval(interval);
      window.location.reload();
    }, 500);
  }

  performLogin(token);
}