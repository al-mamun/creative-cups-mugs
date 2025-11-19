// Main JavaScript file
class ECommerceApp {
  constructor() {
    this.currentSlide = 0;
    this.slideCount = 7;
    this.wishlist = new Set();
    this.cart = new Map();
    this.wishlistItems = [];

    this.init();
  }

  init() {
    this.initializeEventListeners();
    this.initializeHeroSlider();
    this.initOptionalSections();
    this.initializeScrollAnimations();
    this.initializeSearch();
    this.loadCartFromStorage();
    this.loadWishlistFromStorage();
    this.loadWishlistItemsFromStorage();
  }

  initOptionalSections() {
    // Only try to render if containers exist
    const trendingContainer = document.querySelector(".trending-products");
    if (trendingContainer) {
      this.renderTrendingProducts();
    }

    const bestsellersContainer = document.querySelector(".bestseller-products");
    if (bestsellersContainer) {
      this.renderBestsellerProducts();
    }
  }

  initializeEventListeners() {
    // Header scroll effect
    window.addEventListener("scroll", this.handleHeaderScroll.bind(this));

    // Mobile navigation
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("nav-open");
      });
    }

    // Mobile dropdown navigation
    const dropdownItems = document.querySelectorAll(".nav__item--has-dropdown");
    dropdownItems.forEach((item) => {
      const link = item.querySelector(".nav__link");
      if (link && window.innerWidth <= 768) {
        link.addEventListener("click", (e) => {
          // Only prevent default on mobile and if item has dropdown
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle("active");
          }
        });
      }
    });

    // Re-attach on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        dropdownItems.forEach((item) => item.classList.remove("active"));
      }
    });

    // Search toggle
    const searchToggle = document.getElementById("search-toggle");
    const searchDropdown = document.getElementById("search-dropdown");
    const mobileSearch = document.getElementById("mobile-search");

    if (searchToggle) {
      searchToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.innerWidth > 768) {
          searchDropdown?.classList.toggle("active");
        } else {
          mobileSearch?.classList.toggle("active");
          searchToggle.classList.toggle("active");
        }
      });
    }

    // Cart toggle
    const cartToggle = document.getElementById("cart-toggle");
    const miniCart = document.getElementById("mini-cart");
    const miniCartClose = document.getElementById("mini-cart-close");

    if (cartToggle && miniCart) {
      cartToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        miniCart.classList.toggle("active");
      });
    }

    if (miniCartClose) {
      miniCartClose.addEventListener("click", () => {
        miniCart.classList.remove("active");
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        searchDropdown?.classList.remove("active");
      }
      if (!e.target.closest(".cart-container")) {
        miniCart?.classList.remove("active");
      }
    });

    // Newsletter form
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener(
        "submit",
        this.handleNewsletterSubmit.bind(this)
      );
    }

    // Hero slider navigation
    const heroPrev = document.getElementById("hero-prev");
    const heroNext = document.getElementById("hero-next");

    if (heroPrev) {
      heroPrev.addEventListener("click", () => this.previousSlide());
    }
    if (heroNext) {
      heroNext.addEventListener("click", () => this.nextSlide());
    }

    // Hero indicators
    const indicators = document.querySelectorAll(".hero__indicator");
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Trending products navigation
    const trendingPrev = document.getElementById("trending-prev");
    const trendingNext = document.getElementById("trending-next");
    const trendingSlider = document.getElementById("trending-slider");

    if (trendingPrev) {
      trendingPrev.addEventListener("click", () =>
        this.scrollTrendingSlider("prev")
      );
    }
    if (trendingNext) {
      trendingNext.addEventListener("click", () =>
        this.scrollTrendingSlider("next")
      );
    }
    if (trendingSlider) {
      trendingSlider.addEventListener("scroll", () =>
        this.updateTrendingNavButtons()
      );
    }
  }

  handleHeaderScroll() {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  initializeHeroSlider() {
    // Get actual slide count from DOM
    const slides = document.querySelectorAll(".hero__slide");
    const actualSlideCount = slides.length;

    // Only enable autoplay if there's more than one slide
    if (actualSlideCount > 1) {
      const heroSlider = document.getElementById("hero-slider");
      const autoplay = heroSlider ? heroSlider.dataset.autoplay === 'true' : true;
      const speed = heroSlider ? parseInt(heroSlider.dataset.speed) || 5000 : 5000;

      if (autoplay) {
        setInterval(() => {
          this.nextSlide();
        }, speed);
      }
    }
    // If only one slide, do nothing - it will stay static like a banner
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.updateSlider();
  }

  previousSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  updateSlider() {
    const slides = document.querySelectorAll(".hero__slide");
    const indicators = document.querySelectorAll(".hero__indicator");

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });
  }

  renderTrendingProducts() {
    const container = document.getElementById("trending-slider");
    if (!container) {
      console.error("Trending slider container not found");
      return;
    }

    // Get 8 trending products for a single row slider
    const trendingProducts = getTrendingProducts(8);
    console.log("Trending products:", trendingProducts);

    if (!trendingProducts || trendingProducts.length === 0) {
      console.error("No trending products found");
      return;
    }

    container.innerHTML = trendingProducts
      .map((product) => this.createProductCard(product))
      .join("");

    // Add event listeners for product cards
    this.addProductCardEventListeners(container);

    // Update navigation button states
    this.updateTrendingNavButtons();
  }

  renderBestsellerProducts() {
    const container = document.getElementById("bestsellers-grid");
    if (!container) {
      console.error("Bestsellers grid container not found");
      return;
    }

    const bestsellerProducts = getBestsellerProducts(12);
    console.log("Bestseller products:", bestsellerProducts);

    if (!bestsellerProducts || bestsellerProducts.length === 0) {
      console.error("No bestseller products found");
      return;
    }

    container.innerHTML = bestsellerProducts
      .map((product) => this.createProductCard(product))
      .join("");

    // Add event listeners for product cards
    this.addProductCardEventListeners(container);
  }

  createProductCard(product) {
    const isInWishlist = this.wishlist.has(product.id);
    const priceHTML = product.originalPrice
      ? `${formatPrice(
          product.price
        )} <span class="product-card__price--original">${formatPrice(
          product.originalPrice
        )}</span>`
      : formatPrice(product.price);

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card__image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <button class="product-card__wishlist ${
            isInWishlist ? "active" : ""
          }" data-product-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="product-card__content">
          <h3 class="product-card__title">${product.title}</h3>
          <div class="product-card__price">${priceHTML}</div>
          <div class="product-card__rating">
            <div class="product-card__stars">
              ${generateStarRating(product.rating)}
            </div>
            <span class="product-card__rating-text">(${product.reviews})</span>
          </div>
          <div class="product-card__actions">
            <button class="product-card__add-to-cart" data-product-id="${
              product.id
            }">
              Add to Cart
            </button>
            <button class="product-card__quick-view" data-product-id="${
              product.id
            }">
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

  addProductCardEventListeners(container) {
    // Wishlist buttons
    container.querySelectorAll(".product-card__wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.toggleWishlist(productId);
        btn.classList.toggle("active");
      });
    });

    // Add to cart buttons
    container.querySelectorAll(".product-card__add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.addToCart(productId);
      });
    });

    // Quick view buttons
    container.querySelectorAll(".product-card__quick-view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.showQuickView(productId);
      });
    });

    // Product card clicks
    container.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", () => {
        const productId = parseInt(card.dataset.productId);
        this.navigateToProduct(productId);
      });
    });
  }

  toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    if (this.wishlist.has(productId)) {
      // Remove from wishlist
      this.wishlist.delete(productId);
      this.wishlistItems = this.wishlistItems.filter(
        (item) => item.id !== productId
      );
      this.showNotification("Removed from wishlist");
    } else {
      // Add to wishlist
      this.wishlist.add(productId);
      this.wishlistItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: true,
      });
      this.showNotification("Added to wishlist");
    }

    this.updateWishlistCounter();
    this.saveWishlistToStorage();
    this.saveWishlistItemsToStorage();
    this.updateWishlistButtons();
  }

  addToCart(productId, quantity = 1) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId) + quantity);
    } else {
      this.cart.set(productId, quantity);
    }

    this.updateCartCounter();
    this.saveCartToStorage();
    this.renderMiniCart();
    this.showNotification(`${product.title} added to cart`);
  }

  removeFromCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (this.cart.has(productId)) {
      this.cart.delete(productId);
      this.updateCartCounter();
      this.saveCartToStorage();
      this.renderMiniCart();
      this.showNotification(`${product.title} removed from cart`);
    }
  }

  updateWishlistCounter() {
    const counter = document.getElementById("wishlist-count");
    if (counter) {
      counter.textContent = this.wishlistItems.length;
    }
  }

  updateCartCounter() {
    const counter = document.getElementById("cart-count");
    if (counter) {
      // Try to get cart from localStorage first (for compatibility with custom.js)
      const savedCart = localStorage.getItem("cart");
      let totalItems = 0;

      if (savedCart) {
        try {
          const cartArray = JSON.parse(savedCart);
          if (Array.isArray(cartArray)) {
            totalItems = cartArray.reduce(
              (sum, item) => sum + (item.quantity || 0),
              0
            );
          }
        } catch (e) {
          // If parsing fails, use the Map-based cart
          totalItems = Array.from(this.cart.values()).reduce(
            (sum, qty) => sum + qty,
            0
          );
        }
      } else {
        // Use the Map-based cart
        totalItems = Array.from(this.cart.values()).reduce(
          (sum, qty) => sum + qty,
          0
        );
      }

      counter.textContent = totalItems;
    }
  }

  renderMiniCart() {
    const miniCartItems = document.getElementById("mini-cart-items");
    if (!miniCartItems) return;

    if (this.cart.size === 0) {
      miniCartItems.innerHTML = `
        <div class="mini-cart__empty">
          <p>Your cart is empty</p>
          <a href="pages/shop.html" class="btn btn-primary btn-small">Continue Shopping</a>
        </div>
      `;
      return;
    }

    const cartItemsHTML = Array.from(this.cart.entries())
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return "";

        const itemTotal = product.price * quantity;
        return `
          <div class="mini-cart__item">
            <div class="mini-cart__item-image">
              <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="mini-cart__item-details">
              <h4 class="mini-cart__item-title">${product.title}</h4>
              <div class="mini-cart__item-price">${formatPrice(
                product.price
              )} × ${quantity}</div>
              <div class="mini-cart__item-total">${formatPrice(itemTotal)}</div>
            </div>
            <button class="mini-cart__item-remove" data-product-id="${productId}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `;
      })
      .join("");

    const subtotal = Array.from(this.cart.entries()).reduce(
      (total, [productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        return total + (product ? product.price * quantity : 0);
      },
      0
    );

    miniCartItems.innerHTML = `
      <div class="mini-cart__items">
        ${cartItemsHTML}
      </div>
      <div class="mini-cart__summary">
        <div class="mini-cart__subtotal">
          <span>Subtotal:</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="mini-cart__actions">
          <a href="pages/cart.html" class="btn btn-primary btn-small btn-block">View Cart</a>
          <a href="pages/checkout.html" class="btn btn-accent btn-small btn-block">Checkout</a>
        </div>
      </div>
    `;

    // Add remove item event listeners
    miniCartItems.querySelectorAll(".mini-cart__item-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.removeFromCart(productId);
      });
    });
  }

  saveWishlistToStorage() {
    localStorage.setItem("wishlist", JSON.stringify(Array.from(this.wishlist)));
  }

  async getProductById(id) {
    try {
      const response = await fetch(`/products.json?handle=${id}`);
      if (!response.ok) return null;
      const data = await response.json();
      return data.products?.[0] || null;
    } catch (e) {
      console.error("Error fetching product:", e);
      return null;
    }
  }

  loadWishlistFromStorage() {
    const wishlist = localStorage.getItem("wishlist");
    if (!wishlist) return [];

    try {
      const handles = JSON.parse(wishlist);
      return Promise.all(handles.map((handle) => this.getProductById(handle)));
    } catch (e) {
      console.error("Error loading wishlist:", e);
      return [];
    }
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if it's an array of cart items (from custom.js) or Map entries
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (
            parsed[0].hasOwnProperty("id") &&
            parsed[0].hasOwnProperty("quantity")
          ) {
            // Format from custom.js - array of cart item objects
            // Don't convert to Map, just update counter
            this.cart = new Map(); // Keep Map empty, counter will read from localStorage
          } else {
            // Format from main.js - array of [id, quantity] entries
            this.cart = new Map(parsed);
          }
        } else {
          this.cart = new Map();
        }
      } catch (e) {
        this.cart = new Map();
      }
    } else {
      this.cart = new Map();
    }
    this.updateCartCounter();
    this.renderMiniCart();
  }

  loadWishlistItemsFromStorage() {
    const saved = localStorage.getItem("wishlistItems");
    if (saved) {
      this.wishlistItems = JSON.parse(saved);
    }
  }

  saveWishlistItemsToStorage() {
    localStorage.setItem("wishlistItems", JSON.stringify(this.wishlistItems));
  }

  updateWishlistButtons() {
    document.querySelectorAll(".product-card__wishlist").forEach((btn) => {
      const productId = parseInt(btn.getAttribute("data-product-id"));
      const isInWishlist = this.wishlist.has(productId);

      btn.classList.toggle("active", isInWishlist);
      btn.setAttribute(
        "aria-label",
        isInWishlist ? "Remove from wishlist" : "Add to wishlist"
      );
    });
  }

  scrollTrendingSlider(direction) {
    const slider = document.getElementById("trending-slider");
    if (!slider) return;

    // Get actual card width from the first product card
    const firstCard = slider.querySelector(".product-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(slider).gap) || 24;

    // Calculate how many cards to scroll based on viewport
    const containerWidth = slider.offsetWidth;
    const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    const scrollAmount = Math.max(1, visibleCards) * (cardWidth + gap);

    const currentScroll = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === "next") {
      const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
      slider.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    } else {
      const newScroll = Math.max(currentScroll - scrollAmount, 0);
      slider.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }

    // Update button states after scroll
    setTimeout(() => {
      this.updateTrendingNavButtons();
    }, 300);
  }

  updateTrendingNavButtons() {
    const slider = document.getElementById("trending-slider");
    const prevBtn = document.getElementById("trending-prev");
    const nextBtn = document.getElementById("trending-next");

    if (!slider || !prevBtn || !nextBtn) return;

    const currentScroll = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    // Disable prev button at start
    if (currentScroll <= 0) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = "0.5";
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = "1";
    }

    // Disable next button at end
    if (currentScroll >= maxScroll - 1) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = "0.5";
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
    }
  }

  showQuickView(productId) {
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    // Populate modal with product data
    const modal = document.getElementById("quick-view-modal");
    const image = document.getElementById("quick-view-image");
    const title = document.getElementById("quick-view-title");
    const rating = document.getElementById("quick-view-rating");
    const price = document.getElementById("quick-view-price");
    const description = document.getElementById("quick-view-description");
    const quantity = document.getElementById("quick-view-quantity");
    const addToCartBtn = document.getElementById("quick-view-add-to-cart");
    const addToWishlistBtn = document.getElementById(
      "quick-view-add-to-wishlist"
    );
    const closeBtn = document.getElementById("quick-view-close");

    if (image) image.src = product.image;
    if (image) image.alt = product.title;
    if (title) title.textContent = product.title;
    if (rating) rating.innerHTML = generateStarRating(product.rating);
    if (price) price.textContent = formatPrice(product.price);
    if (description)
      description.textContent = `This beautifully crafted ${product.category} combines functionality with elegant design. Perfect for everyday use or as a thoughtful gift.`;
    if (quantity) quantity.value = 1;

    // Show modal
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    // Close modal function
    const closeModal = () => {
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    // Close button
    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    // Overlay click to close
    const overlay = modal?.querySelector(".quick-view-modal__overlay");
    if (overlay) {
      overlay.onclick = closeModal;
    }

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);

    // Add to cart
    if (addToCartBtn) {
      addToCartBtn.onclick = () => {
        const qty = parseInt(quantity?.value || 1);
        this.addToCart(parseInt(productId), qty);
        closeModal();
      };
    }

    // Add to wishlist
    if (addToWishlistBtn) {
      addToWishlistBtn.onclick = () => {
        this.toggleWishlist(parseInt(productId));
        closeModal();
      };
    }

    // Quantity controls
    const decreaseBtn = modal?.querySelector("#quick-view-decrease");
    const increaseBtn = modal?.querySelector("#quick-view-increase");

    if (decreaseBtn) {
      decreaseBtn.onclick = () => {
        const currentValue = parseInt(quantity?.value || 1);
        if (currentValue > 1) {
          quantity.value = currentValue - 1;
        }
      };
    }

    if (increaseBtn) {
      increaseBtn.onclick = () => {
        const currentValue = parseInt(quantity?.value || 1);
        const maxValue = parseInt(quantity?.max || 10);
        if (currentValue < maxValue) {
          quantity.value = currentValue + 1;
        }
      };
    }
  }

  navigateToProduct(productId) {
    console.log("Navigate to product:", productId);
    // Implement navigation to product page
  }

  initializeScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe elements for animation
    document
      .querySelectorAll(".collection-card, .product-card, .section-header")
      .forEach((el) => {
        el.classList.add("animate-on-scroll");
        observer.observe(el);
      });
  }

  initializeSearch() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.performSearch(e.target.value);
        }, 300);
      });
    }
  }

  performSearch(query) {
    if (!query.trim()) return;

    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Search results:", results);
    // Implement search suggestions display
  }

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;

    // Simulate newsletter signup
    setTimeout(() => {
      this.showNotification("Thank you for subscribing to our newsletter!");
      e.target.reset();
    }, 1000);
  }

  showNotification(message) {
    // Create and show toast notification
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-accent-emerald);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.ecommerceApp = new ECommerceApp();
});

// Global function for quick view (accessible from other scripts)
window.showQuickView = function (productId) {
  if (window.ecommerceApp) {
    window.ecommerceApp.showQuickView(productId);
  }
};
