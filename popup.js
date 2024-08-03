document.getElementById('get-fact').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'fetchFact' }, response => {
      document.getElementById('fact').textContent = response.fact;
    });
  });
  