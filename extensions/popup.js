document.getElementById('replaceText').addEventListener('click', function() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: 'replace_text'});
  });
});