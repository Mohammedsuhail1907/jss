// Sample product data with categories
const products = [
    { name: 'Paracetamol Tablets', description: 'Effective for reducing fever and relieving mild to moderate pain.', MRP: '₹  199', category: 'Pain Relief' },
    { name: 'Ibuprofen Capsules', description: 'Non-prescription pain relief for headaches, muscle aches, and more.', MRP: '₹ 249', category: 'Pain Relief' },
    { name: 'Aspirin Tablets', description: 'Classic pain reliever for minor aches and pains.', MRP: '₹ 149', category: 'Pain Relief' },
    { name: 'Diclofenac Gel', description: 'Topical gel for localized pain relief, including arthritis.', MRP: '₹ 349', category: 'Pain Relief' },
    { name: 'Calcium Supplements', description: 'Supports bone health and muscle function.', MRP: '₹ 269', category: 'Vitamins and Supplements' },
    { name: 'Vitamin D3 Drops', description: 'Essential for strong bones and a healthy immune system.', MRP: '₹ 199', category: 'Vitamins and Supplements' },
    { name: 'Probiotic Capsules', description: 'Promotes gut health and digestive balance.', MRP: '₹ 299', category: 'Vitamins and Supplements' },
    { name: 'Vitamin B Complex', description: 'Boosts energy and supports overall health.', MRP: '₹ 249', category: 'Vitamins and Supplements' },
    { name: 'Cough Syrup', description: 'Relieves coughs and soothes sore throats.', MRP: '₹ 169', category: 'Cold and Flu Relief' },
    { name: 'Nasal Saline Spray', description: 'Provides gentle relief for dry or stuffy noses.', MRP: '₹ 119', category: 'Cold and Flu Relief' },
    { name: 'Antibacterial Hand Gel', description: 'Kills germs and bacteria without water.', MRP: '₹ 99', category: 'Cold and Flu Relief' },
    { name: 'Emergency First Aid Kit', description: 'Essential supplies for unexpected injuries.', MRP: '₹ 899', category: 'First Aid Supplies' },
    { name: 'Digital Thermometer', description: 'Quick and accurate temperature readings.', MRP: '₹ 199', category: 'First Aid Supplies' },
    { name: 'Adhesive Bandages', description: 'Waterproof bandages for minor cuts and scrapes.', MRP: '₹ 69', category: 'First Aid Supplies' },
    { name: 'Hydrocortisone Cream', description: 'Relieves itching and skin irritations.', MRP: '₹ 149', category: 'First Aid Supplies' },
    { name: 'Migraine Relief Tablets', description: 'Specially formulated for fast relief from migraine headaches.', MRP: '₹ 349', category: 'Pain Relief' },
    { name: 'Heat Pain Patch', description: 'Provides long-lasting heat therapy for muscle pain and stiffness.', MRP: '₹ 199', category: 'Pain Relief' },
    { name: 'Glucosamine Chondroitin Supplements', description: 'Supports joint health and reduces arthritis discomfort.', MRP: '₹ 449', category: 'Pain Relief' },
    { name: 'Anti-Inflammatory Cream', description: 'Reduces inflammation and swelling due to injuries.', MRP: '₹ 299', category: 'Pain Relief' },
    { name: 'Vitamin E Capsules', description: 'Promotes skin health and antioxidant protection.', MRP: '₹ 149', category: 'Vitamins and Supplements' },
    { name: 'Protein Powder', description: 'Provides a source of protein for muscle recovery and growth.', MRP: '₹ 399', category: 'Vitamins and Supplements' },
    { name: 'Vitamin A Supplements', description: 'Supports eye health and the immune system.', MRP: '₹ 129', category: 'Vitamins and Supplements' },
    { name: 'Decongestant Tablets', description: 'Relieves sinus congestion and pressure.', MRP: '₹ 109', category: 'Cold and Flu Relief' },
    { name: 'Vaporizing Rub', description: 'Soothes chest and throat discomfort due to colds.', MRP: '₹ 99', category: 'Cold and Flu Relief' },
    { name: 'Emergency First Aid Manual', description: 'Comprehensive guide for handling injuries and emergencies.', MRP: '₹ 199', category: 'First Aid Supplies' },
    { name: 'Alcohol-Free Hand Sanitizer', description: 'Kills germs without drying the skin.', MRP: '₹ 89', category: 'First Aid Supplies' },
    { name: 'Burn Cream', description: 'Cools and soothes minor burns and sunburns.', MRP: '₹ 99', category: 'First Aid Supplies' },
    // Add more products as needed
];


// Define the number of products to display per page
const productsPerPage = 9;

// Initialize the current page index
let currentPage = 0;

// Initialize productsToShow array
let productsToShow = [];

// Get references to the "Next" and "Previous" buttons
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

// Get references to the search input field and search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Get references to the sorting and filtering controls
const sortBySelect = document.getElementById('sortBy');
const categorySelect = document.getElementById('category');
const applyFiltersButton = document.getElementById('applyFilters');

// Get a reference to the product details section
const productDetailsSection = document.getElementById('productDetails');

// Function to display products on the current page
function displayProducts() {
    // Calculate startIndex and endIndex based on currentPage and productsPerPage
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Get a reference to the main container where products will be displayed
    const productContainer = document.querySelector('main');

    // Clear the existing product sections
    productContainer.innerHTML = '';

    // Loop through products and display them on the current page
    for (let i = startIndex; i < endIndex && i < productsToShow.length; i++) {
        const product = productsToShow[i];

        // Create a new product section element
        const productSection = document.createElement('section');
        productSection.classList.add('product');

        // Set the HTML content of the product section
        productSection.innerHTML = `
            <img src="product${i + 1}.jpg" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>MRP:</strong> ${product.MRP}</p>
            <button onclick="openModal(${i})">Show Details</button>
        `;

        // Append the product section to the main container
        productContainer.appendChild(productSection);
    }

    // Enable/disable navigation buttons based on the current page
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = endIndex >= productsToShow.length;
}

// Function to apply sorting and filtering
function applyFilters() {
    const sortBy = sortBySelect.value;
    const categoryFilter = categorySelect.value;

    // Apply sorting
    productsToShow.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'MRP') {
            return parseFloat(a.MRP) - parseFloat(b.MRP);
        }
    });

    // Apply filtering
    productsToShow = categoryFilter === 'all'
        ? products.slice() // Clone the original array
        : products.filter(product => product.category === categoryFilter);

    // Reset to the first page after filtering
    currentPage = 0;

    // Display the filtered products
    displayProducts();
}

// Event listener for the "Apply Filters" button
applyFiltersButton.addEventListener('click', () => {
    applyFilters();
});

// Event listener for changes in sorting and filtering options
sortBySelect.addEventListener('change', () => {
    applyFilters();
});

categorySelect.addEventListener('change', () => {
    applyFilters();
});

// Function to perform the search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter products based on search term
    productsToShow = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Reset to the first page after searching
    currentPage = 0;

    // Display the search results
    displayProducts();
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    performSearch();
});

// Event listener for the Enter key in the search input field
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Function to open the modal with product details
function openModal(index) {
    const product = productsToShow[index];

    // Update modal content
    document.getElementById('popupProductImage').src = `product${index + 1}.jpg`;
    document.getElementById('popupProductName').textContent = product.name;
    document.getElementById('popupProductDescription').textContent = product.description;
    document.getElementById('popupProductMRP').textContent = product.MRP;
    document.getElementById('popupProductDosage').textContent = product.dosage || "Not specified";
    document.getElementById('popupProductAvailability').textContent = product.availability || "Not specified";

    
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


applyFilters();