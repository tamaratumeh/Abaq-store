
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
