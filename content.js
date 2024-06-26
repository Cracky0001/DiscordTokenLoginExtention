// Take information from the manifest.json file to display it in the UI (version, author, repository URL) 
// And i like to write some jokes in my code, so don't be surprised if you see some. :D
const manifestData = chrome.runtime.getManifest();
const version = manifestData.version;
const author = "Cracky";
const repositoryUrl = "https://github.com/Cracky0001/DiscordTokenLoginExtention";

// CSS
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
    border: 1px solid #202225; 
    background-color: #202225; 
    color: white;
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #token-login-div button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #5865F2; 
    color: white;
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  #token-login-div button:hover {
    background-color: #4752c4; 
  }
  #token-login-div label {
    font-size: 14px;
    color: #b9bbbe;
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
    background-color: #5865F2;
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
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #info {
    margin-top: 20px;
    font-size: 12px;
    color: #b9bbbe;
    text-align: center;
  }
  #info a {
    color: #5865F2;
    text-decoration: none;
  }
  #info a:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);

// Create the token login UI. Damn, I'm so good at writing comments. :D
function createTokenLoginUI() {
  const tokenLoginDiv = document.createElement('div');
  tokenLoginDiv.id = 'token-login-div';

  const tokenLabel = document.createElement('label');
  tokenLabel.htmlFor = 'token-input';
  tokenLabel.innerText = 'Token Login:';
  tokenLoginDiv.appendChild(tokenLabel);

  const tokenInput = document.createElement('input');
  tokenInput.type = 'password';  // Will be displayed as dots (******). Oh btw, do u want have sex with me? ;)
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

  const infoDiv = document.createElement('div');
  infoDiv.id = 'info';
  infoDiv.innerHTML = `Created by ${author} - Version ${version} - <a href="${repositoryUrl}" target="_blank">GitHub Repository</a>`;
  tokenLoginDiv.appendChild(infoDiv);

  // Insert the token login div into the login form if it exists. Brother Ehhhh, whats that?
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.appendChild(tokenLoginDiv);
  } else {
    document.body.appendChild(tokenLoginDiv);
  }
}

// Overwrite the localStorage token with the new token. Token, like the brother from South Park? 
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

// Show the loading bar when logging in. Yeah, I'm a good developer.... No i am not a developer.
function showLoadingBar() {
  const loadingBar = document.getElementById('loading-bar');
  loadingBar.style.display = 'block';
  const loadingProgress = loadingBar.firstChild;
  loadingProgress.style.width = '100%';
}

// Initialize the UI. It stinks like a fart in here, but it's not me, I swear.
window.addEventListener('load', () => {
  createTokenLoginUI();
});

// All rights reserved to Cracky... No it's just a joke, you can use it as you want.
// But please don't share nude pictures of me, I'm shy. ;)
// Are you still reading this? You're a good person, I like you. <3
// Ok, I stop now. Bye! :D