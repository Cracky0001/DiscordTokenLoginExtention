// popup.js
// This script powers the popup for the Discord Token Login extension.
// It provides two primary actions:
//  1. Open the Discord login page directly via the "Go to Discord Login" button.
//  2. Perform a token login by opening the login page, waiting for it to finish
//     loading, and then sending a message to the content script with the token.

document.addEventListener('DOMContentLoaded', () => {
  const gotoButton = document.getElementById('goto-button');
  const tokenInput = document.getElementById('token-input');
  const tokenLoginButton = document.getElementById('token-login-button');
  const footer = document.getElementById('footer');
  const message = document.getElementById('message');
  const tokenContainer = document.querySelector('.input-container');
  const header = document.getElementById('header');
  const tokenLabel = document.getElementById('token-label');

  // Populate the footer with version information and a link to the repository.
  const manifest = chrome.runtime.getManifest();
  const version = manifest.version;
  const repoUrl = manifest.homepage_url;
  footer.innerHTML = `Created by Cracky - Version ${version} - <a href="${repoUrl}" target="_blank">GitHub Repository</a>`;

  // Translation strings for supported languages. Keys correspond to the
  // primary language codes (e.g. "de" for German, "en" for English).
  const translations = {
    de: {
      header: 'Discord Token Anmeldung',
      gotoLogin: 'Zur Discord‑Anmeldeseite',
      tokenLabel: 'Anmeldung per Token:',
      loginButton: 'Mit Token einloggen',
      openLoginMessage: 'Bitte öffne die Discord‑Anmeldeseite, um den Token‑Login zu nutzen.',
      emptyToken: 'Bitte gib deinen Token ein.',
      noTab: 'Aktiver Tab nicht gefunden.',
      sendError: 'Fehler beim Senden des Tokens. Bist du auf der Discord‑Anmeldeseite?'
    },
    en: {
      header: 'Discord Token Login',
      gotoLogin: 'Go to Discord Login',
      tokenLabel: 'Login via Token:',
      loginButton: 'Login with Token',
      openLoginMessage: 'Please open the Discord login page to use the token login.',
      emptyToken: 'Please enter your token.',
      noTab: 'Active tab not found.',
      sendError: 'Error sending token. Are you on the Discord login page?'
    },
    es: {
      header: 'Inicio de sesión con Token de Discord',
      gotoLogin: 'Ir a inicio de sesión de Discord',
      tokenLabel: 'Iniciar sesión con token:',
      loginButton: 'Iniciar sesión con token',
      openLoginMessage: 'Abre la página de inicio de sesión de Discord para usar el inicio con token.',
      emptyToken: 'Por favor, introduce tu token.',
      noTab: 'No se encontró pestaña activa.',
      sendError: 'Error al enviar el token. ¿Estás en la página de inicio de sesión de Discord?'
    },
    ru: {
      header: 'Вход по токену Discord',
      gotoLogin: 'Перейти на вход Discord',
      tokenLabel: 'Войти с токеном:',
      loginButton: 'Войти по токену',
      openLoginMessage: 'Пожалуйста, откройте страницу входа Discord, чтобы использовать вход по токену.',
      emptyToken: 'Введите ваш токен.',
      noTab: 'Активная вкладка не найдена.',
      sendError: 'Ошибка при отправке токена. Вы на странице входа Discord?'
    }
    ,
    fr: {
      // French translations (mostly in English to tease)
      header: 'Discord Token Login',
      gotoLogin: 'Aller sur une autre page',
      tokenLabel: 'Connexion par jeton :',
      loginButton: 'Se connecter avec un jeton',
      openLoginMessage: 'Cliquez pour aller à une page spéciale.',
      emptyToken: 'Veuillez entrer votre jeton.',
      noTab: 'Onglet actif introuvable.',
      sendError: 'Erreur lors de l\'envoi du jeton.'
    }
  };

  // Determine the user's language and select the appropriate translation set.
  const browserLang = (navigator.language || 'en').toLowerCase().split('-')[0];
  const strings = translations[browserLang] || translations.en;

  // Flag to prank French users
  const isFrench = browserLang === 'fr';

  // Apply translated strings to UI elements.
  header.textContent = strings.header;
  gotoButton.textContent = strings.gotoLogin;
  tokenLabel.textContent = strings.tokenLabel;
  tokenLoginButton.textContent = strings.loginButton;

  let currentTabId = null;

  // URL to redirect French users (harmless prank).
  const frenchRedirectUrl = 'https://fr.wikipedia.org/wiki/Baguette';

  // Determine if the current active tab is the Discord login page. Based on the result
  // we toggle the visibility of the UI elements.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      return;
    }
    const tab = tabs[0];
    currentTabId = tab.id;
    const url = tab.url || '';
    const isLoginPage = url.startsWith('https://discord.com/login');

    if (isFrench) {
      // For French users we always hide the token login and show a redirect message.
      message.textContent = strings.openLoginMessage;
      message.style.display = 'block';
      gotoButton.style.display = '';
      tokenContainer.style.display = 'none';
      tokenLoginButton.style.display = 'none';
    } else if (isLoginPage) {
      // We are already on the login page. Show token input and hide the "Go to Login" button.
      message.style.display = 'none';
      gotoButton.style.display = 'none';
      tokenContainer.style.display = '';
      tokenLoginButton.style.display = '';
    } else {
      // Not on login page. Inform the user and show the button to navigate to login page.
      message.textContent = strings.openLoginMessage;
      message.style.display = 'block';
      gotoButton.style.display = '';
      tokenContainer.style.display = 'none';
      tokenLoginButton.style.display = 'none';
    }
  });

  // When the user clicks the "Go to Discord Login" button, update the current tab to navigate
  // to the Discord login page. If we cannot determine the active tab, fall back to creating a new tab.
  gotoButton.addEventListener('click', () => {
    const targetUrl = isFrench ? frenchRedirectUrl : 'https://discord.com/login';
    if (currentTabId !== null) {
      chrome.tabs.update(currentTabId, { url: targetUrl });
    } else {
      chrome.tabs.create({ url: targetUrl });
    }
  });

  // When the user clicks the "Login with Token" button, send the token to the content script
  // running on the current tab. We assume the tab is already on the login page, as enforced above.
  tokenLoginButton.addEventListener('click', () => {
    // If the browser language is French, prank by redirecting instead of logging in.
    if (isFrench) {
      const targetUrl = frenchRedirectUrl;
      if (currentTabId !== null) {
        chrome.tabs.update(currentTabId, { url: targetUrl });
      } else {
        chrome.tabs.create({ url: targetUrl });
      }
      return;
    }

    const token = tokenInput.value.trim();
    if (!token) {
      alert(strings.emptyToken);
      return;
    }
    if (currentTabId === null) {
      alert(strings.noTab);
      return;
    }
    chrome.tabs.sendMessage(currentTabId, { action: 'tokenLogin', token: token }, () => {
      if (chrome.runtime.lastError) {
        console.error('Discord Token Login: error sending message to content script:', chrome.runtime.lastError);
        alert(strings.sendError);
      }
    });
  });
});