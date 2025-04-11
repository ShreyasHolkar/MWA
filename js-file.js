// Sample data - in a real application, this would come from a backend
const artworksData = [
    {
        id: 1,
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        year: 1889,
        details: "Oil on canvas, 73.7 cm × 92.1 cm",
        description: "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village."
    },
    {
        id: 2,
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: 1503,
        details: "Oil on poplar panel, 77 cm × 53 cm",
        description: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as \"the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world\"."
    },
    {
        id: 3,
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        year: 1931,
        details: "Oil on canvas, 24 cm × 33 cm",
        description: "The Persistence of Memory is a 1931 painting by artist Salvador Dalí and one of the most recognizable works of Surrealism. First shown at the Julien Levy Gallery in 1932, the painting has been in the collection of the Museum of Modern Art in New York City since 1934."
    },
    {
        id: 4,
        title: "Guernica",
        artist: "Pablo Picasso",
        year: 1937,
        details: "Oil on canvas, 349 cm × 776 cm",
        description: "Guernica is a large 1937 oil painting on canvas by Spanish artist Pablo Picasso. It is one of his best-known works, regarded by many art critics as the most moving and powerful anti-war painting in history. It is exhibited in the Museo Reina Sofía in Madrid."
    },
    {
        id: 5,
        title: "The Night Watch",
        artist: "Rembrandt van Rijn",
        year: 1642,
        details: "Oil on canvas, 363 cm × 437 cm",
        description: "The Night Watch is a 1642 painting by Rembrandt van Rijn. It is in the collection of the Amsterdam Museum but is prominently displayed in the Rijksmuseum as the best-known painting in its collection. The Night Watch is one of the most famous Dutch Golden Age paintings."
    },
    {
        id: 6,
        title: "Water Lilies",
        artist: "Claude Monet",
        year: 1919,
        details: "Oil on canvas, 100 cm × 200 cm",
        description: "Water Lilies (Nymphéas) is a series of approximately 250 oil paintings by French Impressionist Claude Monet. The paintings depict Monet's flower garden at his home in Giverny and were the main focus of his artistic production during the last thirty years of his life."
    }
];

// Populate artworks
function populateArtworks() {
    const artworksContainer = document.getElementById('artworksContainer');
    
    artworksData.forEach(artwork => {
        const artworkElement = document.createElement('div');
        artworkElement.className = 'artwork';
        artworkElement.setAttribute('data-id', artwork.id);
        
        artworkElement.innerHTML = `
            <img src="/api/placeholder/400/300" alt="${artwork.title}" class="artwork-image">
            <div class="artwork-info">
                <div class="artwork-title">${artwork.title}</div>
                <div class="artwork-artist">${artwork.artist}, ${artwork.year}</div>
                <div class="artwork-details">${artwork.details}</div>
            </div>
        `;
        
        artworksContainer.appendChild(artworkElement);
        
        // Add click event to show modal
        artworkElement.addEventListener('click', () => {
            showArtworkModal(artwork);
        });
    });
}

// Show artwork modal
function showArtworkModal(artwork) {
    const modal = document.getElementById('artworkModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const modalDescription = document.getElementById('modalDescription');
    
    modalTitle.textContent = artwork.title;
    modalArtist.textContent = `${artwork.artist}, ${artwork.year}`;
    modalDescription.textContent = artwork.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('artworkModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Hero image animation effect
function animateHeroImage() {
    const heroImage = document.getElementById('heroImage');
    heroImage.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        heroImage.style.transform = 'scale(1)';
    }, 10000);
}

// Initialize the page
window.onload = function() {
    populateArtworks();
    setInterval(animateHeroImage, 20000);
};

// Search functionality
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const artworks = document.querySelectorAll('.artwork');
    
    artworks.forEach(artwork => {
        const id = artwork.getAttribute('data-id');
        const artworkData = artworksData.find(a => a.id == id);
        
        const titleMatch = artworkData.title.toLowerCase().includes(searchTerm);
        const artistMatch = artworkData.artist.toLowerCase().includes(searchTerm);
        
        if (titleMatch || artistMatch) {
            artwork.style.display = 'block';
        } else {
            artwork.style.display = 'none';
        }
    });
});
