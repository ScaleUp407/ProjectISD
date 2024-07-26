document.addEventListener('DOMContentLoaded', () => {
    const cryptoScroller = document.getElementById("crypto-scroller");
    
async function fetchCryptoPrices() {
  const apiKey = 'CG-urKFWuerWTDnC8bCxyjcdTHn'; 
  const specificSymbols = ['bitcoin', 'ethereum', 'litecoin'];
  const topLimit = 10;
    
    // Fetching data from an external API
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=${specificSymbols.join(',')}&vs_currencies=usd`);
    const specificData = await specificResponse.json();') // Replace with your actual API URL
        .then(response => response.json())
        .then(data => {
            data.forEach(crypto => {
                const card = document.createElement('div');
                card.className = 'crypto-card';
                card.innerHTML = `<h3>${crypto.name}</h3><p>${crypto.price}</p>`;
                cryptoScroller.appendChild(card);
            });

            const cryptoCards = document.querySelectorAll(".crypto-card");

            // Calculate total width of all cards
            let totalWidth = 0;
            cryptoCards.forEach(card => {
                totalWidth += card.offsetWidth + 5; // Card width + margin
            });

            document.documentElement.style.setProperty('--total-card-width', `${totalWidth}px`);
            console.log(`Total width: ${totalWidth}px`); // Debugging

            // Clone and append
            cryptoCards.forEach(card => {
                const clone = card.cloneNode(true);
                cryptoScroller.appendChild(clone);
            });
        })
        .catch(error => console.error('Error fetching crypto prices:', error));
});
