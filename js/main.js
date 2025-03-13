// SWITCHING IMAGES EFFECT IN PRODUCT DETAIL PAGE
// Idea for this effect comes from https://www.youtube.com/watch?v=Y6wLZSDJE8E
const allHoverImages = document.querySelectorAll(".small-images img");
const imgContainer = document.querySelector(".big-image");

window.addEventListener("DOMContentLoaded", () => {
  // Ensure there's a default image to show
  if (allHoverImages.length > 0 && imgContainer) {
    // Set the initial image to the last image
    imgContainer.src = allHoverImages[3].src;
    allHoverImages[0].parentElement.classList.add("active");
  }
});

allHoverImages.forEach((image) => {
  image.addEventListener("mouseover", () => {
    // Update the large image with the small image's src
    imgContainer.src = image.src;
    resetActiveImg();
    image.parentElement.classList.add("active");
  });
});

function resetActiveImg() {
  allHoverImages.forEach((img) => {
    img.parentElement.classList.remove("active");
  });
}

// CART FUNCTIONALITY

document.addEventListener("DOMContentLoaded", () => {
  // Function to load cart data from localStorage
  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCart(cart);
    updateTotal(cart);
  }

  // Function to display the cart items
  function displayCart(cart) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    // Display and order of elements of an intem in the cart - Image, Name, Price, Quantity buttons, Remove button
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <h3>${item.price}€</h3>
          <div class="cart-item-actions">
            <button class="decrease-quantity" data-index="${index}">-</button>
            <span class="quantity"><h4>${item.quantity}</h4></span>
            <button class="increase-quantity" data-index="${index}">+</button>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", removeItem);
    });

    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });
  }

  // Function to update the total price
  function updateTotal(cart) {
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    document.getElementById("total-amount").textContent =
      totalAmount.toFixed(2);
  }

  // Function to remove an item from the cart
  function removeItem(event) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Function to decrease the quantity of an item
  function decreaseQuantity(event) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }
  }

  // Function to increase the quantity of an item
  function increaseQuantity(event) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Load the cart when the page is ready
  loadCart();
});

// ADD PRODUCT TO CART FUNCTIONALITY

document.addEventListener("DOMContentLoaded", () => {
  // Add product to cart
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const name = event.target.getAttribute("data-name");
      const price = parseFloat(event.target.getAttribute("data-price"));
      const image = event.target.getAttribute("data-image");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cart.findIndex((item) => item.name === name);
      if (existingItemIndex !== -1) {
        // Update quantity if the item already exists in the cart
        cart[existingItemIndex].quantity++;
      } else {
        // Add new item to cart
        cart.push({
          name: name,
          price: price,
          image: image,
          quantity: 1,
        });
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
});
