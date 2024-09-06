document.getElementById('login').onclick = function() {
    chrome.runtime.sendMessage({ action: 'login' });
  };
  
  const autoSuggest = document.getElementById('auto-suggest');
  autoSuggest.onchange = function() {
    chrome.storage.sync.set({ autoSuggest: autoSuggest.checked });
  };