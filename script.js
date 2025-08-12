document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {
            image: 'images/product-lists/—Pngtree—metal ball pen vector_15339954 (1).png',
            name: 'Ballpen',
            price: 500
        },
        {
            image: 'images/product-lists/flower.jpg',
            name: 'Sunflower Bouquet',
            price: 500
        },
        {
            image: 'images/product-lists/starbucks-kids-drinks.jpg',
            name: 'Starbuck Coffee',
            price: 250
        },
        {
            image: 'images/product-lists/Breakfast-Pastries-Platter-scaled.jpg',
            name: 'Pastries',
            price: 480
        },
        {
            image: 'images/product-lists/school-supplies.jpg',
            name: 'School Supplies',
            price: 500
        },
        {
            image:'images/product-lists/notebooks.jpg',
            name: 'Notebooks',
            price: 57
        },
        {
            image: 'images/product-lists/soccer-ball.jpg',
            name: 'Soccer Ball',
            price: 900
        },
        {
            image: 'images/product-lists/labubu-doll.jpg',
            name: 'Labubu Doll',
            price: 2000
        },
        {
            image: 'images/product-lists/keychains.jpg',
            name: 'Keychains',
            price: 50
        },
        {
            image: 'images/product-lists/flower-keychains.jpg',
            name: 'Flower Keychains',
            price: 95
        },
        {
            image: 'images/product-lists/sunscreen.jpg',
            name: 'Y.O.U Sunscreen',
            price: 499
        },
        {
            image: 'images/product-lists/sphagetti.jpg',
            name: 'Spaghetti',
            price: 50
        }
    ];

    const productContainer = document.querySelector('.js-product-container');

    // Function to render initial products
    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const card = `
                <div class="product-card">
                    <img class="product-img" src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h5>${product.name}</h5>
                        <p class="price">₱${product.price}</p>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML('beforeend', card);
        });
    }
    renderProducts();

    // Sections
    const productFormSection = document.getElementById('productFormSection');
    const mainSection = document.getElementById('home-section');
    const sellProductBtn = document.querySelector('.js-add-product-btn');

    // Hide form initially
    productFormSection.style.display = 'none';
    mainSection.style.display = 'block';

    // Show form on button click
    sellProductBtn.addEventListener('click', function (e) {
        e.preventDefault();
        productFormSection.style.display = 'block';
        mainSection.style.display = 'none';
    });

    // Image preview in form
    document.getElementById('image').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('imagePreview');
        const placeholder = document.querySelector('.placeholder-text');

        if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        } else {
            preview.style.display = 'none';
            placeholder.style.display = 'block';
        }
    });

    // Live preview title
    document.getElementById('name').addEventListener('input', function () {
        document.getElementById('previewTitle').textContent = this.value || 'Product Title';
    });

    // Live preview price
    document.getElementById('price').addEventListener('input', function () {
        document.getElementById('previewPrice').textContent = this.value ? `₱${this.value}` : '₱0.00';
    });

    // Live preview description
    document.getElementById('description').addEventListener('input', function () {
        document.getElementById('previewDescription').textContent = this.value || 'Product description will appear here.';
    });

    // Handle form submission
    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const imageFile = document.getElementById('image').files[0];
        const name = document.getElementById('name').value || 'Untitled Product';
        const priceValue = document.getElementById('price').value || '0.00';
        const price = `₱${priceValue}`;

        // Create new product card matching design
        const productCard = `
            <div class="product-card">
                <img class="product-img" src="${imageFile ? URL.createObjectURL(imageFile) : 'placeholder.jpg'}" alt="${name}">
                <div class="product-info">
                    <h5>${name}</h5>
                    <p class="price">${price}</p>
                </div>
            </div>
        `;

        // Add to Today's Picks
        productContainer.insertAdjacentHTML('beforeend', productCard);

        // Hide form, show home
        productFormSection.style.display = 'none';
        mainSection.style.display = 'block';

        // Reset form & preview
        this.reset();
        document.getElementById('imagePreview').style.display = 'none';
        document.querySelector('.placeholder-text').style.display = 'block';
        document.getElementById('previewTitle').textContent = 'Product Title';
        document.getElementById('previewPrice').textContent = '₱0.00';
        document.getElementById('previewDescription').textContent = 'Product description will appear here.';
    });
});
