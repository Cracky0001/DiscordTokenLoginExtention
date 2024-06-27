// If you want to see my code, you will see bullshit comments like this
// My Balls are itching, I need to scratch them

// Sniff infos from manifest.json. Thats Cringe... i mean why not just hardcode it?
const manifestData = chrome.runtime.getManifest();
const version = manifestData.version;
const author = "Cracky";
const repositoryUrl = "https://github.com/Cracky0001/DiscordTokenLoginExtention";

// background image url. You can change it to whatever you want... maybe a dick pic?
const newImageUrl = 'https://cdn.discordapp.com/attachments/949646895565922374/1255529285696098334/background.png?ex=667d7644&is=667c24c4&hm=bb9a2229bec1b0fadb8e3fc1c6766ecb42d707e527686771afcbf410241a2e57&';

// CSS. i hate css
const style = document.createElement('style');
style.textContent = `
  body {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden; /* Verhindert Scrollen */
  }
  .content-1SgpWY, .content-2hZxGK, .mainBackground-1unmG6, .background-3tZjzH {
    background: none !important;
  }
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

// wait for the page to load. Maybe it will work better if i dont wait for the page to load? You can try it out. I love spaghetti code
window.addEventListener('load', function() {
  var artworkImage = document.querySelector('.artwork_bdd070');
  if (artworkImage) {
    artworkImage.src = newImageUrl;
    chrome.runtime.sendMessage({ type: 'log', data: 'Original image src changed to new background image' });
  } else {
    chrome.runtime.sendMessage({ type: 'error', data: 'Original image not found' });
  }

  // Check if the new image is loaded successfully. Damn i want to eat some spaghetti
  var img = new Image();
  img.onload = function() {
    chrome.runtime.sendMessage({ type: 'log', data: 'New image loaded successfully' });
  };
  img.onerror = function() {
    chrome.runtime.sendMessage({ type: 'error', data: 'Failed to load new image' });
  };
  img.src = newImageUrl;

  // create the token login UI. is there a way to eat the sun? I want to eat the sun!
  createTokenLoginUI();
});

// In germany we say "Halt die Fresse du dummer Hursohn" which means "Create the token login UI"
function createTokenLoginUI() {
  var tokenLoginDiv = document.createElement('div');
  tokenLoginDiv.id = 'token-login-div';

  var tokenLabel = document.createElement('label');
  tokenLabel.htmlFor = 'token-input';
  tokenLabel.innerText = 'Token Login:';
  tokenLoginDiv.appendChild(tokenLabel);

  var tokenInput = document.createElement('input');
  tokenInput.type = 'password';
  tokenInput.id = 'token-input';
  tokenInput.placeholder = 'Enter your token here';
  tokenLoginDiv.appendChild(tokenInput);

  var loginButton = document.createElement('button');
  loginButton.innerText = 'Login';
  loginButton.onclick = function() {
    var token = document.getElementById('token-input').value;
    showLoadingBar();
    loginWithToken(token);
  };
  tokenLoginDiv.appendChild(loginButton);

  var loadingBar = document.createElement('div');
  loadingBar.id = 'loading-bar';
  var loadingProgress = document.createElement('div');
  var loadingText = document.createElement('span');
  loadingText.innerText = 'Logging In...';
  loadingBar.appendChild(loadingProgress);
  loadingBar.appendChild(loadingText);
  tokenLoginDiv.appendChild(loadingBar);

  var infoDiv = document.createElement('div');
  infoDiv.id = 'info';
  infoDiv.innerHTML = 'Created by ' + author + ' - Version ' + version + ' - <a href="' + repositoryUrl + '" target="_blank">GitHub Repository</a>';
  tokenLoginDiv.appendChild(infoDiv);

  // Append the token login UI to the form if it exists, otherwise append it to the body. I wish my dog can talk to me. I dont have a dog.
  var loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.appendChild(tokenLoginDiv);
    chrome.runtime.sendMessage({ type: 'log', data: 'Token login UI created and appended to form' });
  } else {
    document.body.appendChild(tokenLoginDiv);
    chrome.runtime.sendMessage({ type: 'log', data: 'Token login UI created and appended to body' });
  }
}

// Override the Discord token with the provided token and reload the page. Why do i have to explain this? I want to eat some spaghetti
function loginWithToken(token) {
  if (!token) {
    alert('Please enter a token.');
    return;
  }

  function login(token) {
    setInterval(() => {
      document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = `"${token}"`;
    }, 50);
    setTimeout(() => {
      location.reload();
    }, 0);
  }

  login(token);
}

// Show the loading bar. Pls dont do drugs kids
function showLoadingBar() {
  var loadingBar = document.getElementById('loading-bar');
  loadingBar.style.display = 'block';
  var loadingProgress = loadingBar.firstChild;
  loadingProgress.style.width = '100%';
}

// Hi my name is Cracky and i love you all. I hope you enjoyed my code. 
// I will eat your @ss if you dont like my code.
// I hope you are a hot E-Girl so i can eat your @ss and your pu$$y at the same time.

// I love you all. Bye Bye