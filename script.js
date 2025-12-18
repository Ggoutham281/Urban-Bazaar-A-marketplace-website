// Select elements
const sellBtn = document.querySelector('.sell-btn');
const sellModal = document.getElementById('sellModal');
const closeSellModal = document.getElementById('closeSellModal');
const sellForm = document.getElementById('sellForm');
const productGrid = document.querySelector('.product-grid');

// Load saved items on page load
// ... (existing code for selecting elements) ...

// Load saved items on page load
document.addEventListener('DOMContentLoaded', loadProducts);

// Show modal
sellBtn.addEventListener('click', () => {
    sellModal.style.display = 'flex';
});

// Close modal
closeSellModal.addEventListener('click', () => {
    sellModal.style.display = 'none';
});

// Handle form submission (Simplified for URL)
 // ... existing JavaScript code

    // Handle form submission (Simplified for URL)
    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('itemName').value.trim();
        // CORRECTION: Changed 'itemCategory' to 'itemcategory' to match the HTML ID.
        const category = document.getElementById('itemcategory').value.trim().toLowerCase(); 
        const price = document.getElementById('itemPrice').value.replace(/[₹,]/g, '').trim(); // Remove symbols for saving as a number string
        const details = document.getElementById('itemDetails').value.trim();
        const location = document.getElementById('itemLocation').value.trim();
        const image = document.getElementById('itemImage').value.trim(); 

// ... rest of the JavaScript remains the same

    if (!name || !category || !price || !details || !image || !location) {
        alert('Please fill out all fields.');
        return;
    }

    const product = {
        name,
        category,
        price,
        details,
        image, // Save the URL, not file data
        location
    };
    
    addProductToGrid(product);
    saveProductToLocalStorage(product); // This will now save a small URL string

    sellForm.reset();
    sellModal.style.display = 'none';
    alert('Item added successfully!');
});


// Add product card to the grid
function addProductToGrid(product) {
    const newProduct = document.createElement('div');
    newProduct.classList.add('product');
    newProduct.setAttribute('data-category', product.category);
    newProduct.setAttribute('data-location', product.location);

    newProduct.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="info">
        <div class="price">₹ ${product.price}</div>
        <div class="details">${product.name}<br>${product.details}</div>
        <div class="location"> ${product.location}</div>
      </div>
    `;

    productGrid.appendChild(newProduct);
}

// Save a product to localStorage
function saveProductToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    // If the storage limit is exceeded, this will prevent successful saving.
    // By using a URL instead of file data, this is unlikely to fail.
    localStorage.setItem('products', JSON.stringify(products));
}

// Load all products from localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Only load saved products, not the existing ones from HTML.
    // If you want to append to the existing list, you might need to filter.
    products.forEach(addProductToGrid);
}
