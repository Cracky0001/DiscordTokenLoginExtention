document.getElementById('login-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://discord.com/login' });
  });
  