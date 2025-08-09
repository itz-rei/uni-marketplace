const products = [{
        image: 'images/product-lists/—Pngtree—metal ball pen vector_15339954 (1).png',
        name: 'Ballpen',
        price: 500
    },{
        image: 'images/product-lists/flower.jpg',
        name: 'Sunflower Bouquet',
        price: 500
    },{
        image: 'images/product-lists/starbucks-kids-drinks.jpg',
        name: 'Starbuck Coffee',
        price: 250
    },{
        image: 'images/product-lists/Breakfast-Pastries-Platter-scaled.jpg',
        name: 'Pastries',
        price: 480
    },{
        image: 'images/product-lists/school-supplies.jpg',
        name: 'School Supplies',
        price: 500
    },{
        image:'images/product-lists/notebooks.jpg',
        name: 'Notebooks',
        price: 57
    },{
        image: 'images/product-lists/soccer-ball.jpg',
        name: 'Soccer Ball',
        price: 900
    },{
        image: 'images/product-lists/labubu-doll.jpg',
        name: 'Labubu Doll',
        price: 2000
    },{
        image: 'images/product-lists/keychains.jpg',
        name: 'Keychains',
        price: 50
    },{
        image: 'images/product-lists/flower-keychains.jpg',
        name: 'Flower Keychains',
        price: 95
    },{
        image: 'images/product-lists/sunscreen.jpg',
        name: 'Y.O.U Sunscreen',
        price: 499
    },{
        image: 'images/product-lists/sphagetti.jpg',
        name: 'Spaghetti',
        price: 50
    }
];

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-card">
            <img class="product-img" src="${product.image}">
            <div class="product-info">
                <h5>${product.name}</h5>
                <p class="price">₱${product.price}</p>
            </div>
        </div>
`;
});
console.log(productsHTML);

document.querySelector('.js-product-container')
    .innerHTML = productsHTML;
    