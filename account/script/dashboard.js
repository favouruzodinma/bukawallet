
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel without auto-cycling
    const myCarousel = new bootstrap.Carousel('#myCarousel', {
        interval: false, // Disable auto-cycling
        wrap: true,
        touch: true // Enable touch swiping
    });
    
    // Add functionality to close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide-index');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const indicators = document.querySelectorAll('.carousel-indicators li');
            
            // Hide the current slide
            carouselItems[slideIndex].style.display = 'none';
            indicators[slideIndex].style.display = 'none';
            
            // Find the next available slide to show
            let nextIndex = (parseInt(slideIndex) + 1) % carouselItems.length;
            while (nextIndex != slideIndex && carouselItems[nextIndex].style.display === 'none') {
                nextIndex = (nextIndex + 1) % carouselItems.length;
            }
            
            // If all slides are hidden, hide the carousel
            if (carouselItems[nextIndex].style.display === 'none') {
                document.getElementById('myCarousel').style.display = 'none';
            } else {
                // Show the next available slide
                myCarousel.to(nextIndex);
            }
        });
    });
});

// Using OpenSea API (note: you'll need an API key for production)
async function fetchNFTs() {
try {
    // In a real app, you would use your own backend or API key
    const response = await fetch('https://api.opensea.io/api/v2/collections?limit=5');
    const data = await response.json();
    
    if (data.collections && data.collections.length > 0) {
        displayNFTs(data.collections);
    } else {
        // Fallback data if API fails
        const fallbackNFTs = [
            { name: "Bored Ape", image_url: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=256" },
            { name: "Azuki", image_url: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=256" },
            { name: "Doodles", image_url: "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=256" },
            { name: "CloneX", image_url: "https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?auto=format&w=256" },
            { name: "CryptoPunk", image_url: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPkThPav3Y-9yd411tgfEuWFPBDGr-4dtE7SJl5YALaRmgoHvH1bVSSX=s250" }
        ];
        displayNFTs(fallbackNFTs);
    }
} catch (error) {
    console.error("Error fetching NFTs:", error);
    // Display fallback NFTs if API fails
    const fallbackNFTs = [
        { name: "Bored Ape", image_url: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=256" },
        { name: "Azuki", image_url: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=256" },
        { name: "Doodles", image_url: "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=256" },
        { name: "CloneX", image_url: "https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?auto=format&w=256" },
        { name: "CryptoPunk", image_url: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPkThPav3Y-9yd411tgfEuWFPBDGr-4dtE7SJl5YALaRmgoHvH1bVSSX=s250" }
    ];
    displayNFTs(fallbackNFTs);
}
}

function displayNFTs(nfts) {
const container = document.querySelector('.nft-container');
container.innerHTML = ''; // Clear any existing content

nfts.slice(0, 5).forEach(nft => {
    const nftCard = document.createElement('div');
    nftCard.className = 'nft-card';
    nftCard.style.minWidth = '120px';
    
    const nftImage = document.createElement('div');
    nftImage.className = 'nft-image rounded-3';
    nftImage.style.width = '120px';
    nftImage.style.height = '120px';
    nftImage.style.backgroundImage = `url(${nft.image_url || nft.image || 'https://via.placeholder.com/120'})`;
    nftImage.style.backgroundSize = 'cover';
    nftImage.style.backgroundPosition = 'center';
    
    const nftName = document.createElement('div');
    nftName.className = 'nft-name mt-2 text-center';
    nftName.style.fontSize = '0.75rem';
    nftName.textContent = nft.name || 'Unnamed NFT';
    
    nftCard.appendChild(nftImage);
    nftCard.appendChild(nftName);
    container.appendChild(nftCard);
});
}

// Fetch NFTs when page loads
document.addEventListener('DOMContentLoaded', fetchNFTs);
