chrome.runtime.onInstalled.addListener(() => {
    console.log('Service Worker installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'log') {
      console.log('Log from content script:', message.data);
    } else if (message.type === 'error') {
      console.error('Error from content script:', message.data);
    }
  });
  