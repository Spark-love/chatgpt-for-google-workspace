const composeButton = document.createElement('button');
composeButton.innerText = "ChatGPT Suggest";
composeButton.style = "background-color: #4CAF50; color: white;";

// Append button into Gmail's compose box
const toolbar = document.querySelector('.aDh');
toolbar.appendChild(composeButton);

composeButton.onclick = () => {
  const emailBody = document.querySelector('div[role="textbox"]').innerText;
  const prompt = "Generate an email response for the following: " + emailBody;
  chrome.runtime.sendMessage({ prompt });
};

const widget = document.createElement('div');
widget.innerHTML = '<textarea id="chatgpt-prompt"></textarea><button id="chatgpt-generate">Generate</button>';
widget.style = "position: fixed; top: 50px; right: 10px; width: 300px; background-color: white;";

document.body.appendChild(widget);

document.getElementById('chatgpt-generate').onclick = function() {
  const prompt = document.getElementById('chatgpt-prompt').value;
  chrome.runtime.sendMessage({ prompt });
};