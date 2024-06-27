document.getElementById('login-button').addEventListener('click', function() {
  chrome.tabs.create({ url: 'https://discord.com/login' });
});

// Load manifest data
const manifest = chrome.runtime.getManifest();
const version = manifest.version;
const repoUrl = manifest.homepage_url;
const footer = document.getElementById('footer');
footer.innerHTML = `Created by Cracky - Version ${version} - <a href="${repoUrl}" target="_blank">GitHub Repository</a>`;



  
  // My name is Cracky and I approve this message.
  // You need to love me, because I love you.
  // I am
  //    _____                _          
  //   / ____|              | |         
  //  | |     _ __ __ _  ___| | ___   _ 
  //  | |    | '__/ _` |/ __| |/ / | | |
  //  | |____| | | (_| | (__|   <| |_| |
  //   \_____|_|  \__,_|\___|_|\_\\__, |
  //                               __/ |
  //                              |___/
  // Its me, Cracky. I'm a good person, I swear.
  // I'm not a bad person, I'm a good person.
  // I love you, you love me, we are a happy family.