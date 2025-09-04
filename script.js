document.addEventListener('DOMContentLoaded', function () {

    const productContainer = document.querySelector('.js-product-container');
    const productFormSection = document.getElementById('productFormSection');
    const mainSection = document.getElementById('home-section');
    const sellProductBtn = document.querySelector('.js-add-product-btn');

    // Modal selectors
    const detailsModal = document.getElementById('productDetailsModal');
    const closeDetailsModal = document.getElementById('closeDetailsModal');
    const modalProductImg = document.getElementById('modalProductImg');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalSellerName = document.getElementById('modalSellerName');
    const modalSellerContact = document.getElementById('modalSellerContact');
    const addToListBtn = document.getElementById('addToListBtn');
    const contactSellerBtn = document.getElementById('contactSellerBtn');

    // Hide form initially
    productFormSection.style.display = 'none';
    mainSection.style.display = 'block';

    // Show form on button click
    sellProductBtn.addEventListener('click', function (e) {
        e.preventDefault();
        productFormSection.style.display = 'block';
        mainSection.style.display = 'none';
        detailsModal.style.display = 'none';
        productFormSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Render products with data-index
    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach((product, index) => {
            const card = `
                <div class="product-card js-product-card" data-index="${index}">
                    <img class="product-img" src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h5>${product.name}</h5>
                        <p>${product.description}</p>
                        <p class="price">₱${product.price}</p>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML('beforeend', card);
        });
    }
    renderProducts();

    // PRODUCT DETAILS MODAL LOGIC
    productContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.js-product-card');
        if (card) {
            const index = card.getAttribute('data-index');
            const product = products[index];

            // Fill modal
            modalProductImg.src = product.image;
            modalProductName.textContent = product.name;
            modalProductPrice.textContent = `₱${product.price}`;
            modalProductDesc.textContent = product.description;
            modalSellerName.textContent = product.seller;
            modalSellerContact.textContent = product.messenger || 'No contact info';

            // Messenger/contact logic
            contactSellerBtn.onclick = () => {
                if (product.messenger) {
                    window.open(`https://m.me/${product.messenger}`, '_blank');
                } else {
                    alert('No contact info available.');
                }
            };

            // Add to List logic
            // addToListBtn.onclick = () => {
            //     alert('Added "' + product.name + '" to your list!');
            // };

            // Show modal
            detailsModal.style.display = 'flex';
        }
    });

    // Close modal
    closeDetailsModal.addEventListener('click', () => {
        detailsModal.style.display = 'none';
    });
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
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
    // Live preview Location
    document.getElementById('sellerLoc').addEventListener('change', function () {
        document.getElementById('previewLocation').textContent = this.value || 'Your Location will appear here.';
    });
    // Live preview Contact
    document.getElementById('contactInfo').addEventListener('input', function () {
        document.getElementById('previewContact').textContent = this.value || 'Your Contact will appear here.';
    });
    // Handle form submission
    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const imageFile = document.getElementById('image').files[0];
        const name = document.getElementById('name').value || 'Untitled Product';
        const description = document.getElementById('description').value || 'No description provided';
        const priceValue = document.getElementById('price').value || '0.00';
        const sellerLoc = document.getElementById('sellerLoc').value || 'Your Location';
        const contactInfo = document.getElementById('contactInfo').value || 'Your Contact';

        // Add to products array and re-render
        products.push({
            image: imageFile ? URL.createObjectURL(imageFile) : 'placeholder.jpg',
            name,
            description,
            price: priceValue,
            seller: 'You',
            messenger: contactInfo, // Store contact in messenger field, or add a new field if you like
            location: sellerLoc
        });
        renderProducts();

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
        document.getElementById('previewLocation').textContent = 'Your Location will appear here.';
        document.getElementById('previewContact').textContent = 'Your Contact will appear here.';
    });
    // Mobile menu logic
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.getElementById('mobileMenu');
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    // close menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
});
