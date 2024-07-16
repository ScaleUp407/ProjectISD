const cryptoContainer = document.getElementById('crypto-container');

async function fetchCryptoPrices() {
  const apiKey = 'CG-urKFWuerWTDnC8bCxyjcdTHn'; // Replace with your CoinGecko API key
  const cryptoSymbols = ['bitcoin', 'ethereum', 'litecoin']; // Add more if needed

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(',')}&vs_currencies=usd`);
    const data = await response.json();

    cryptoContainer.innerHTML = ''; // Clear previous prices

    for (const symbol of cryptoSymbols) {
      const price = data[symbol].usd;

      const cryptoCard = document.createElement('div');
      cryptoCard.classList.add('crypto-card');
      cryptoCard.innerHTML = `
        <h2>${symbol.toUpperCase()}</h2>
        <p>Price: $${price.toLocaleString()}</p>
      `;
      cryptoContainer.appendChild(cryptoCard);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    cryptoContainer.innerHTML = '<p>Failed to fetch crypto prices.</p>';
  }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000); // Update every minute
