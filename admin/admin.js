
let searchForm = document.querySelector(".search-form");

// show search box
document.querySelector("#search-btn").onclick = () => { 
    searchForm.classList.toggle("active")
    navbar.classList.remove("active");
    cartItems.classList.remove("active");
};

// navBar 
let navbar = document.querySelector(".navbar");

// show navBar 
document.querySelector("#menu-btn").onclick = () => { 
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItems.classList.remove("active")
};