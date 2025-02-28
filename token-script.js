document.addEventListener('DOMContentLoaded', () => {
    const cryptoScroller = document.getElementById("crypto-scroller");

    // Fetching data from an external API
    fetch('https://api.yourcryptosource.com/prices') // Replace with your actual API URL
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

            // Clone and append
            cryptoCards.forEach(card => {
                const clone = card.cloneNode(true);
                cryptoScroller.appendChild(clone);
            });
        })
        .catch(error => console.error('Error fetching crypto prices:', error));
});
