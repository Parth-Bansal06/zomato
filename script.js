// Search Functionality with No Results Message (Optimized)
let searchTimeout;
document.getElementById("search-input").addEventListener("input", function () {
    clearTimeout(searchTimeout); // Clear any ongoing timeout
    searchTimeout = setTimeout(function () { // Delay search execution
        const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
        const restaurants = document.querySelectorAll(".restaurant");
        let resultsFound = false; // Flag to track if any results are found

        // Hide all restaurants initially
        restaurants.forEach((restaurant) => restaurant.style.display = "none");

        // Filter and display matching restaurants
        restaurants.forEach((restaurant) => {
            const restaurantName = restaurant.querySelector("h3").textContent.toLowerCase();
            const restaurantCuisine = restaurant.querySelector("p").textContent.toLowerCase();

            if (restaurantName.includes(searchQuery) || restaurantCuisine.includes(searchQuery)) {
                restaurant.style.display = "block"; // Show matching restaurant
                resultsFound = true; // Mark that results are found
            }
        });

        // Toggle the "No results found" message
        const noResultsMessage = document.getElementById("no-results-message");
        if (!resultsFound && !noResultsMessage) {
            const message = document.createElement("p");
            message.id = "no-results-message";
            message.textContent = "No restaurants found matching your search.";
            message.style.color = "#ff0000";  // Red color for visibility
            document.querySelector(".restaurant-listings").appendChild(message);
        } else if (resultsFound && noResultsMessage) {
            noResultsMessage.remove();
        }
    }, 500); // Delay search to improve performance
});

// Clear Search Button Functionality
const searchInput = document.getElementById("search-input");
const clearSearchButton = document.createElement("button");
clearSearchButton.textContent = "Clear Search";
clearSearchButton.id = "clear-search";
clearSearchButton.style.display = "none"; // Initially hidden
searchInput.parentElement.appendChild(clearSearchButton);

clearSearchButton.addEventListener("click", function () {
    searchInput.value = ""; // Clear input field
    searchInput.focus(); // Focus back on search input
    searchInput.dispatchEvent(new Event('input')); // Trigger input event to clear results
    clearSearchButton.style.display = "none"; // Hide clear button
});

// Show clear search button when the user types
searchInput.addEventListener("input", function () {
    if (searchInput.value.trim()) {
        clearSearchButton.style.display = "inline-block";
    } else {
        clearSearchButton.style.display = "none";
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Account for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Navigation Menu Toggle
const navMenu = document.querySelector('nav ul');
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰'; // Hamburger menu icon
document.querySelector('header').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Scroll Animations (Fade In Optimization)
const fadeInElements = document.querySelectorAll('.fade-in');
const isElementInView = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

const handleScrollAnimation = () => {
    fadeInElements.forEach(element => {
        if (isElementInView(element)) {
            element.classList.add('visible');
        }
    });
};

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScrollAnimation, 100); // Throttle the scroll event to improve performance
});

// Initialize fade-in animations on page load
document.addEventListener('DOMContentLoaded', handleScrollAnimation);

// Form Validation for Sign-In Page (Improved)
const signInForm = document.querySelector('form');

if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        
        if (!email.value || !password.value) {
            e.preventDefault();
            alert('Please fill in all fields.');
        } else if (!validateEmail(email.value)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });
}

// Email Validation Function
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

// Toggle Search Button Animation (Improved)
searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = "#d32f2f"; // Highlight border when focused
});

searchInput.addEventListener('blur', () => {
    searchInput.style.borderColor = "#ddd"; // Reset border color when focus is lost
});

// Initialize an empty cart
let cart = [];

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.cta-button');

// Handle adding items to the cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the menu item details
        const menuItem = button.closest('.menu-item');
        const name = menuItem.querySelector('h3').textContent;
        const price = parseFloat(menuItem.querySelector('p').textContent.replace('$', '').trim());

        // Add item to cart
        cart.push({ name, price });

        // Update cart UI
        updateCart();
    });
});

// Update the cart UI (display items in the modal)
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear current cart items in the UI
    cartItemsList.innerHTML = '';

    // Add each item in the cart to the UI
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        totalPrice += item.price;
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Show the cart modal when the "View Cart" button is clicked
document.getElementById('view-cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'block'; // Show modal
});

// Close the cart modal when the "Close" button is clicked
document.getElementById('close-cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none'; // Hide modal
});

// Empty the cart when the "Empty Cart" button is clicked
document.getElementById('empty-cart-btn').addEventListener('click', () => {
    cart = []; // Clear the cart array
    updateCart(); // Update the cart UI
    alert('Your cart has been emptied.');
});

// Optional: Implement a checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout!');
        // You could add a redirect or payment integration here
    }
});
