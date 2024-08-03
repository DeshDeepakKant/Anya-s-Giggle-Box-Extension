// background.js

// Event listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from popup:', message);

  if (message.action === 'fetchFact') {
    fetchFact().then(fact => {
      // Send the fact back to the popup
      sendResponse({ fact: fact });
    }).catch(error => {
      console.error('Error fetching fact:', error);
      sendResponse({ fact: 'Failed to fetch fact.' });
    });
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});

// Function to fetch a dad joke from the API
async function fetchFact() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  if (data.joke) {
    return data.joke;
  } else {
    throw new Error('Failed to fetch dad joke.');
  }
}
