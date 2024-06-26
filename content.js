// CSS für die UI hinzufügen
const style = document.createElement('style');
style.textContent = `
  #token-login-div {
    background-color: #36393F;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin-top: 20px;
  }
  #token-login-div input {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #72767d;
    background-color: #40444B;
    color: white;
  }
  #token-login-div button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #7289DA;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  #token-login-div button:hover {
    background-color: #5b6eae;
  }
  #token-login-div label {
    font-size: 14px;
    color: #b9bbbe;
  }
  #loading-bar {
    display: none;
    width: 100%;
    background-color: #40444B;
    border-radius: 5px;
    margin-top: 10px;
    position: relative;
    text-align: center;
  }
  #loading-bar div {
    width: 0;
    height: 10px;
    background-color: #7289DA;
    border-radius: 5px;
    transition: width 2s;
  }
  #loading-bar span {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
`;
document.head.appendChild(style);

// Erstellen des UI Elements
function createTokenLoginUI() {
  const tokenLoginDiv = document.createElement('div');
  tokenLoginDiv.id = 'token-login-div';

  const tokenLabel = document.createElement('label');
  tokenLabel.htmlFor = 'token-input';
  tokenLabel.innerText = 'Token Login:';
  tokenLoginDiv.appendChild(tokenLabel);

  const tokenInput = document.createElement('input');
  tokenInput.type = 'password';
  tokenInput.id = 'token-input';
  tokenInput.placeholder = 'Enter your token here';
  tokenLoginDiv.appendChild(tokenInput);

  const loginButton = document.createElement('button');
  loginButton.innerText = 'Login';
  loginButton.onclick = () => {
    const token = document.getElementById('token-input').value;
    showLoadingBar();
    loginWithToken(token);
  };
  tokenLoginDiv.appendChild(loginButton);

  const loadingBar = document.createElement('div');
  loadingBar.id = 'loading-bar';
  const loadingProgress = document.createElement('div');
  const loadingText = document.createElement('span');
  loadingText.innerText = 'Logging In...';
  loadingBar.appendChild(loadingProgress);
  loadingBar.appendChild(loadingText);
  tokenLoginDiv.appendChild(loadingBar);

  // UI unter den normalen Anmeldefeldern einfügen
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.appendChild(tokenLoginDiv);
  } else {
    document.body.appendChild(tokenLoginDiv);
  }
}

// Funktion zum Einloggen mit Token
function loginWithToken(token) {
  if (!token) {
    alert('Please enter a token.');
    return;
  }
  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow.localStorage.setItem('token', `"${token}"`);
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (e) {
    console.error('Error logging in with token:', e);
  }
}

// Funktion zum Anzeigen des Ladebalkens
function showLoadingBar() {
  const loadingBar = document.getElementById('loading-bar');
  loadingBar.style.display = 'block';
  const loadingProgress = loadingBar.firstChild;
  loadingProgress.style.width = '100%';
}

// Überprüfen, ob der Benutzer auf der Login-Seite ist
function isLoginPage() {
  return window.location.href === 'https://discord.com/login';
}

// UI einfügen, wenn die Seite geladen ist
window.addEventListener('load', () => {
  if (isLoginPage()) {
    createTokenLoginUI();
  } else {
    const tokenLoginDiv = document.getElementById('token-login-div');
    if (tokenLoginDiv) {
      tokenLoginDiv.remove();
    }
  }
});
