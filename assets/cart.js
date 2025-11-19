// Cart Page JavaScript
class CartPage {
  constructor() {
    // Always show sample cart for demo
    this.cartItems = [
      {
        id: 1,
        productId: 1,
        title: "Ceramic Coffee Mug Set",
        price: 48.0,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
        quantity: 2,
        options: {
          color: "White",
          size: "Medium",
        },
      },
      {
        id: 2,
        productId: 2,
        title: "Insulated Water Bottle",
        price: 32.0,
        originalPrice: 40.0,
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        quantity: 1,
        options: {
          color: "Sage Green",
          size: "Large",
        },
      },
      {
        id: 3,
        productId: 3,
        title: "Luxury Soy Candle",
        price: 28.0,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
        quantity: 1,
        options: {
          scent: "Vanilla & Sandalwood",
        },
      },
    ];
    this.shippingRate = 8.99;
    this.taxRate = 0.08;
    this.freeShippingThreshold = 75;

    this.init();
  }

  init() {
    this.renderCartItems();
    this.updateCartSummary();
    this.renderRecommendedProducts();
    this.initializeEventListeners();
  }

  loadCartFromStorage() {
    // Sample cart is now set directly in constructor
    return this.cartItems;
  }

  saveCartToStorage() {
    localStorage.setItem("ecommerce_cart", JSON.stringify(this.cartItems));
  }

  initializeEventListeners() {
    // Quantity controls
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("quantity-btn")) {
        const action = e.target.dataset.action;
        const itemId = parseInt(e.target.closest(".cart-item").dataset.itemId);
        this.updateQuantity(itemId, action);
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const itemId = parseInt(e.target.closest(".cart-item").dataset.itemId);
        const newQuantity = parseInt(e.target.value);
        this.updateQuantityDirect(itemId, newQuantity);
      }
    });

    // Remove item
    document.addEventListener("click", (e) => {
      if (e.target.closest(".cart-item__action--remove")) {
        e.preventDefault();
        const itemId = parseInt(e.target.closest(".cart-item").dataset.itemId);
        this.removeItem(itemId);
      }
    });

    // Move to wishlist
    document.addEventListener("click", (e) => {
      if (e.target.closest(".cart-item__action--wishlist")) {
        e.preventDefault();
        const itemId = parseInt(e.target.closest(".cart-item").dataset.itemId);
        this.moveToWishlist(itemId);
      }
    });

    // Clear cart
    const clearCartBtn = document.getElementById("clear-cart");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        this.clearCart();
      });
    }

    // Update cart
    const updateCartBtn = document.getElementById("update-cart");
    if (updateCartBtn) {
      updateCartBtn.addEventListener("click", () => {
        this.updateCart();
      });
    }

    // Proceed to checkout
    const proceedCheckoutBtn = document.getElementById("proceed-checkout");
    if (proceedCheckoutBtn) {
      proceedCheckoutBtn.addEventListener("click", () => {
        this.proceedToCheckout();
      });
    }

    // Promo code form
    const promoForm = document.getElementById("promo-form");
    if (promoForm) {
      promoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.applyPromoCode();
      });
    }

    // Shipping calculator
    const shippingForm = document.getElementById("shipping-form");
    if (shippingForm) {
      shippingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.calculateShipping();
      });
    }
  }

  renderCartItems() {
    const container = document.getElementById("cart-items");
    const emptyState = document.getElementById("cart-empty");
    const cartActions = document.getElementById("cart-actions");
    const itemCount = document.getElementById("cart-item-count");

    if (!container) return;

    if (this.cartItems.length === 0) {
      container.style.display = "none";
      cartActions.style.display = "none";
      emptyState.style.display = "flex";
      if (itemCount) itemCount.textContent = "0 items";
      return;
    }

    container.style.display = "flex";
    cartActions.style.display = "flex";
    emptyState.style.display = "none";
    if (itemCount) itemCount.textContent = `${this.getTotalItems()} items`;

    container.innerHTML = this.cartItems
      .map((item) => this.createCartItemHTML(item))
      .join("");
  }

  createCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;
    const optionsHTML = Object.entries(item.options || {})
      .map(
        ([key, value]) => `
        <div class="cart-item__option">
          <span class="cart-item__option-label">${key}:</span>
          <span class="cart-item__option-value">${value}</span>
        </div>
      `
      )
      .join("");

    const priceHTML = item.originalPrice
      ? `
      ${formatPrice(item.price)}
      <span class="cart-item__price--original">${formatPrice(
        item.originalPrice
      )}</span>
    `
      : formatPrice(item.price);

    return `
      <div class="cart-item" data-item-id="${item.id}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item__details">
          <h3 class="cart-item__title">
            <a href="../pages/product.html">${item.title}</a>
          </h3>
          <div class="cart-item__options">
            ${optionsHTML}
          </div>
          <div class="cart-item__price">${priceHTML}</div>
          <div class="cart-item__quantity">
            <span class="quantity-label">Qty:</span>
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease" ${
                item.quantity <= 1 ? "disabled" : ""
              }>−</button>
              <input type="number" class="quantity-input" value="${
                item.quantity
              }" min="1" max="10">
              <button class="quantity-btn" data-action="increase" ${
                item.quantity >= 10 ? "disabled" : ""
              }>+</button>
            </div>
          </div>
          <div class="cart-item__actions">
            <button class="cart-item__action cart-item__action--wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Save for later
            </button>
            <button class="cart-item__action cart-item__action--remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>
                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
              Remove
            </button>
          </div>
        </div>
        <div class="cart-item__controls">
          <div class="cart-item__total">${formatPrice(itemTotal)}</div>
        </div>
      </div>
    `;
  }

  updateQuantity(itemId, action) {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const cartItemElement = document.querySelector(
      `[data-item-id="${itemId}"]`
    );
    cartItemElement.classList.add("updating");

    setTimeout(() => {
      if (action === "increase" && item.quantity < 10) {
        item.quantity++;
      } else if (action === "decrease" && item.quantity > 1) {
        item.quantity--;
      }

      this.saveCartToStorage();
      this.renderCartItems();
      this.updateCartSummary();
      this.showNotification(`Cart updated`);
    }, 200);
  }

  updateQuantityDirect(itemId, newQuantity) {
    if (newQuantity < 1 || newQuantity > 10 || isNaN(newQuantity)) return;

    const item = this.cartItems.find((item) => item.id === itemId);
    if (!item) return;

    item.quantity = newQuantity;
    this.saveCartToStorage();
    this.updateCartSummary();
  }

  removeItem(itemId) {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (confirm(`Remove "${item.title}" from your cart?`)) {
      const cartItemElement = document.querySelector(
        `[data-item-id="${itemId}"]`
      );
      cartItemElement.classList.add("removing");

      setTimeout(() => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.saveCartToStorage();
        this.renderCartItems();
        this.updateCartSummary();
        this.showNotification(`${item.title} removed from cart`);
      }, 300);
    }
  }

  moveToWishlist(itemId) {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (!item) return;

    // In a real app, you'd save to wishlist
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.saveCartToStorage();
    this.renderCartItems();
    this.updateCartSummary();
    this.showNotification(`${item.title} moved to wishlist`);
  }

  clearCart() {
    if (this.cartItems.length === 0) return;

    if (confirm("Are you sure you want to clear your cart?")) {
      this.cartItems = [];
      this.saveCartToStorage();
      this.renderCartItems();
      this.updateCartSummary();
      this.showNotification("Cart cleared");
    }
  }

  updateCart() {
    this.showNotification("Cart updated successfully");
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getShippingCost() {
    const subtotal = this.getSubtotal();
    return subtotal >= this.freeShippingThreshold ? 0 : this.shippingRate;
  }

  getTax() {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal() {
    return this.getSubtotal() + this.getShippingCost() + this.getTax();
  }

  updateCartSummary() {
    const subtotalElement = document.getElementById("cart-subtotal");
    const shippingElement = document.getElementById("cart-shipping");
    const taxElement = document.getElementById("cart-tax");
    const totalElement = document.getElementById("cart-total");

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(this.getSubtotal());
    }

    if (shippingElement) {
      const shipping = this.getShippingCost();
      shippingElement.textContent =
        shipping === 0 ? "FREE" : formatPrice(shipping);
    }

    if (taxElement) {
      taxElement.textContent = formatPrice(this.getTax());
    }

    if (totalElement) {
      totalElement.textContent = formatPrice(this.getTotal());
    }
  }

  applyPromoCode() {
    const promoInput = document.getElementById("promo-input");
    const promoCode = promoInput.value.trim().toUpperCase();

    // Demo promo codes
    const validCodes = {
      SAVE10: { type: "percentage", value: 0.1, description: "10% off" },
      WELCOME: { type: "fixed", value: 15, description: "$15 off" },
      FREESHIP: { type: "shipping", value: 0, description: "Free shipping" },
    };

    if (validCodes[promoCode]) {
      this.showNotification(
        `Promo code "${promoCode}" applied! ${validCodes[promoCode].description}`
      );
      promoInput.value = "";
      // In a real app, you'd apply the discount to the cart
    } else {
      this.showNotification("Invalid promo code", "error");
    }
  }

  calculateShipping() {
    const country = document.getElementById("shipping-country").value;
    const zipCode = document.getElementById("shipping-zip").value;

    if (!country || !zipCode) {
      this.showNotification("Please fill in all shipping fields", "error");
      return;
    }

    // Demo shipping calculation
    const shippingRates = {
      US: 8.99,
      CA: 12.99,
      UK: 15.99,
    };

    const rate = shippingRates[country] || 19.99;
    this.shippingRate = rate;
    this.updateCartSummary();
    this.showNotification(`Shipping calculated: ${formatPrice(rate)}`);
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.showNotification("Your cart is empty", "error");
      return;
    }

    // In a real app, you'd navigate to the checkout page
    this.showNotification("Proceeding to checkout...");
    setTimeout(() => {
      console.log("Navigate to checkout page");
      // window.location.href = './checkout.html';
    }, 1000);
  }

  renderRecommendedProducts() {
    const container = document.getElementById("recommended-products");
    if (!container) return;

    // Get random products for recommendations
    const availableProducts = products.filter(
      (p) => !this.cartItems.some((item) => item.productId === p.id)
    );

    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 6);

    container.innerHTML = recommended
      .map((product) => this.createRecommendedProductHTML(product))
      .join("");

    // Add event listeners
    container.querySelectorAll(".product-card__add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(btn.dataset.productId);
        this.addRecommendedToCart(productId);
      });
    });

    // Wishlist buttons
    container.querySelectorAll(".product-card__wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(
          btn
            .closest(".product-card")
            .querySelector(".product-card__add-to-cart").dataset.productId
        );
        this.showNotification("Added to wishlist!");
        btn.classList.toggle("active");
      });
    });

    // Quick view buttons
    container.querySelectorAll(".product-card__quick-view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = btn.dataset.productId;
        if (window.showQuickView) {
          window.showQuickView(productId);
        }
      });
    });
  }

  createRecommendedProductHTML(product) {
    const priceHTML = product.originalPrice
      ? `${formatPrice(
          product.price
        )} <span class="product-card__price--original">${formatPrice(
          product.originalPrice
        )}</span>`
      : formatPrice(product.price);

    return `
      <div class="product-card">
        <div class="product-card__image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <button class="product-card__wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="product-card__content">
          <div class="product-card__category">${
            product.category || "Product"
          }</div>
          <h3 class="product-card__title">${product.title}</h3>
          <div class="product-card__rating">
            <div class="product-card__stars">
              ${generateStarRating(product.rating)}
            </div>
            <span class="product-card__rating-text">(${product.reviews})</span>
          </div>
          <div class="product-card__price">${priceHTML}</div>
          <div class="product-card__actions">
            <button class="product-card__add-to-cart" data-product-id="${
              product.id
            }">
              Add to Cart
            </button>
            <button class="product-card__quick-view" data-product-id="${
              product.id
            }" title="Quick View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  addRecommendedToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Create new cart item
    const newItem = {
      id: Date.now(), // Simple ID generation
      productId: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      options: {},
    };

    this.cartItems.push(newItem);
    this.saveCartToStorage();
    this.renderCartItems();
    this.updateCartSummary();
    this.renderRecommendedProducts(); // Re-render to remove added product
    this.showNotification(`${product.title} added to cart!`);
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    const bgColor =
      type === "error"
        ? "var(--color-accent-orange)"
        : "var(--color-accent-emerald)";

    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-size: 14px;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CartPage();
});
