
// search bar
let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => { 
    searchForm.classList.toggle("active")
    navbar.classList.remove("active");
    cartItems.classList.remove("active");
};

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => { 
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItems.classList.remove("active")
};
document.addEventListener('DOMContentLoaded', () => {
    const loadWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const container = document.getElementById('wishlist-items');
        container.innerHTML = '';
        
        wishlist.forEach(product => {
            container.innerHTML += `
                <div class="product">
                    <div class="img">
                        <img src="${product.image}" />
                        <div class="bar">
                            <i class="fa-solid fa-heart wishlist-btn active"></i>
                            <a href="#" class="add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                    <div class="info">
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
            `;
        });
    };
    
    loadWishlist();
});
