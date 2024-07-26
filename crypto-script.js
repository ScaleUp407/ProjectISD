const cryptoContainer = document.getElementById('crypto-container');

async function fetchCryptoPrices() {
  const apiKey = 'CG-urKFWuerWTDnC8bCxyjcdTHn'; 
  const specificSymbols = ['bitcoin', 'ethereum', 'litecoin'];
  const topLimit = 10; // Number of top tokens to fetch

  try {
    // Fetch specific coins
    const specificResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${specificSymbols.join(',')}&vs_currencies=usd`);
    const specificData = await specificResponse.json();

    // Fetch top coins
    const topResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${topLimit}&page=1&sparkline=false&price_change_percentage=24h`);
    const topData = await topResponse.json();

    cryptoContainer.innerHTML = ''; // Clear the container before adding new data

    // Display specific coins first
    for (const symbol of specificSymbols) {
      const price = specificData[symbol].usd;
      createCryptoCard(symbol.toUpperCase(), price);
    }

    // Display top coins (excluding those already displayed)
    for (const coin of topData) {
      if (!specificSymbols.includes(coin.id)) { // Avoid duplicates
        createCryptoCard(coin.symbol.toUpperCase(), coin.current_price, coin.price_change_percentage_24h.toFixed(2));
      }
    }

    // Start the scrolling animation
    startScrollAnimation();
  } catch (error) {
    console.error('Error fetching data:', error);
    cryptoContainer.innerHTML = '<p>Failed to fetch crypto prices.</p>';
  }
}

function createCryptoCard(symbol, price, changePercentage = null) {
  const cryptoCard = document.createElement('div');
  cryptoCard.classList.add('crypto-card');
  cryptoCard.innerHTML = `
    <h2>${symbol}</h2>
    <p>Price: $${price.toLocaleString()}</p>
    ${changePercentage ? `<p>24h Change: ${changePercentage}%</p>` : ''}
  `;
  cryptoContainer.appendChild(cryptoCard);
}

function startScrollAnimation() {
  const cryptoCards = document.querySelectorAll('.crypto-card');
  const totalWidth = Array.from(cryptoCards).reduce((acc, card) => acc + card.offsetWidth + 5, 0);

  const cryptoScroller = document.getElementById("crypto-scroller");
  cryptoScroller.style.setProperty('--total-card-width', `${totalWidth}px`);

  // Clone and append the cards for continuous scrolling
  cryptoCards.forEach(card => {
    const clone = card.cloneNode(true);
    cryptoScroller.appendChild(clone);
  });
}

// Initial fetch
fetchCryptoPrices();

// Update every minute
setInterval(fetchCryptoPrices, 60000);
