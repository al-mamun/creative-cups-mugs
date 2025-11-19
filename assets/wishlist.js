// Wishlist functionality
class Wishlist {
  constructor() {
    this.items = this.loadFromStorage();
    this.init();
  }

  init() {
    this.updateCount();
    this.renderWishlist();
    this.attachEventListeners();
  }

  loadFromStorage() {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  }

  saveToStorage() {
    localStorage.setItem("wishlistItems", JSON.stringify(this.items));
  }

  addItem(product) {
    // Check if item already exists
    const exists = this.items.find((item) => item.id === product.id);
    if (!exists) {
      this.items.push(product);
      this.saveToStorage();
      this.updateCount();
      this.renderWishlist();
      return true;
    }
    return false;
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveToStorage();
    this.updateCount();
    this.renderWishlist();
  }

  clearAll() {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      this.items = [];
      this.saveToStorage();
      this.updateCount();
      this.renderWishlist();
    }
  }

  updateCount() {
    const countElements = document.querySelectorAll(
      "#wishlist-count, #wishlist-item-count"
    );
    countElements.forEach((el) => {
      el.textContent = this.items.length;
    });
  }

  isInWishlist(productId) {
    return this.items.some((item) => item.id === productId);
  }

  renderWishlist() {
    const grid = document.getElementById("wishlist-grid");
    const emptyState = document.getElementById("wishlist-empty");
    const header = document.getElementById("wishlist-header");

    if (!grid) return;

    if (this.items.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      if (header) header.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (header) header.style.display = "flex";

    grid.innerHTML = this.items
      .map(
        (product) => `
      <div class="wishlist-card" data-product-id="${product.id}">
        <button class="wishlist-card__remove" data-product-id="${product.id}">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        ${
          product.badge
            ? `<div class="wishlist-card__badge">${product.badge}</div>`
            : ""
        }
        <div class="wishlist-card__image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="wishlist-card__content">
          <div class="wishlist-card__category">${
            product.category || "Coffee Mugs"
          }</div>
          <h3 class="wishlist-card__title">${product.name}</h3>
          <div class="wishlist-card__rating">
            <div class="wishlist-card__stars">
              ${this.generateStars(product.rating || 4.5)}
            </div>
            <span class="wishlist-card__rating-text">${
              product.rating || 4.5
            } (${product.reviews || 0})</span>
          </div>
          <div class="wishlist-card__price">
            $${product.price.toFixed(2)}
            ${
              product.originalPrice
                ? `<span class="wishlist-card__price--original">$${product.originalPrice.toFixed(
                    2
                  )}</span>`
                : ""
            }
          </div>
          <div class="wishlist-card__stock ${
            product.inStock !== false
              ? "wishlist-card__stock--in"
              : "wishlist-card__stock--out"
          }">
            ${product.inStock !== false ? "In Stock" : "Out of Stock"}
          </div>
          <div class="wishlist-card__actions">
            <button class="wishlist-card__add-to-cart" data-product-id="${
              product.id
            }" ${product.inStock === false ? "disabled" : ""}>
              ${product.inStock !== false ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    this.attachCardEventListeners();
  }

  generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += `
        <svg class="wishlist-card__star" fill="currentColor">
          <path d="M8 1l2 4 4.5.7-3.3 3.2.8 4.6L8 11l-4 2.5.8-4.6L1.5 5.7 6 5l2-4z" />
        </svg>
      `;
    }
    return stars;
  }

  attachEventListeners() {
    // Clear all button
    const clearBtn = document.getElementById("clear-wishlist");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearAll());
    }

    // Add all to cart button
    const addAllBtn = document.getElementById("add-all-to-cart");
    if (addAllBtn) {
      addAllBtn.addEventListener("click", () => this.addAllToCart());
    }
  }

  attachCardEventListeners() {
    // Remove buttons
    document.querySelectorAll(".wishlist-card__remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.getAttribute("data-product-id"));
        this.removeItem(productId);
      });
    });

    // Add to cart buttons
    document.querySelectorAll(".wishlist-card__add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.getAttribute("data-product-id"));
        this.addToCart(productId);
      });
    });
  }

  addToCart(productId) {
    if (window.ecommerceApp) {
      window.ecommerceApp.addToCart(productId);
    } else {
      console.log("Adding to cart:", productId);
      alert("Product added to cart!");
    }
  }

  addAllToCart() {
    if (this.items.length === 0) return;

    const availableItems = this.items.filter((item) => item.inStock !== false);
    if (availableItems.length === 0) {
      alert("No items available to add to cart.");
      return;
    }

    if (confirm(`Add ${availableItems.length} item(s) to cart?`)) {
      console.log("Adding all to cart:", availableItems);
      alert(`${availableItems.length} item(s) added to cart!`);
    }
  }
}

// Initialize wishlist
let wishlistInstance;
if (document.getElementById("wishlist-grid")) {
  wishlistInstance = new Wishlist();
}

// Export for use in other pages
window.Wishlist = Wishlist;
window.wishlistInstance = wishlistInstance;
