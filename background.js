chrome.identity.launchWebAuthFlow({
    url: "https://login.openai.com/oauth/authorize?client_id=<your_client_id>&response_type=token",
    interactive: true
  }, function(responseUrl) {
    const urlParams = new URLSearchParams(responseUrl.split('#')[1]);
    const accessToken = urlParams.get('access_token');
    chrome.storage.sync.set({ token: accessToken });
  });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const token = chrome.storage.sync.get(['token'], (result) => {
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: message.prompt,
          max_tokens: 150
        })
      })
      .then(response => response.json())
      .then(data => {
        sendResponse(data.choices[0].text);
      })
      .catch(error => {
        sendResponse({ error: 'Error connecting to ChatGPT' });
      });
    });
  
    // Return true to keep the response channel open
    return true;
  });