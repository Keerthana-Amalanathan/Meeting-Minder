chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text === 'replace_text') {
    document.body.innerHTML = document.body.innerHTML.replace(/Hello, World!/g, 'Hello, Browser Extension!');
  }
});
