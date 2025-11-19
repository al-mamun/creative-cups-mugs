// Shop Page JavaScript
class ShopPage {
  constructor() {
    this.filteredProducts = [...products];
    this.currentPage = 1;
    this.productsPerPage = 12;
    this.currentView = "grid";
    this.currentSort = "featured";
    this.filters = {
      categories: ["all"],
      priceMin: 0,
      priceMax: 200,
      colors: [],
      rating: null,
      search: "",
    };
    this.wishlist = new Set();
    this.cart = new Map();

    this.init();
  }

  init() {
    this.loadCartFromStorage();
    this.loadWishlistFromStorage();
    this.initializeEventListeners();
    this.renderProducts();
    this.updateProductCount();
    this.renderPagination();
    this.initializePriceRange();
  }

  initializeEventListeners() {
    // Header functionality
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("nav-open");
      });
    }

    // Search functionality
    const searchToggle = document.getElementById("search-toggle");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");

    if (searchToggle) {
      searchToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        searchDropdown?.classList.toggle("active");
      });
    }

    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.filters.search = e.target.value.toLowerCase();
          this.applyFilters();
        }, 300);
      });
    }

    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        searchDropdown?.classList.remove("active");
      });
    }

    // Cart functionality
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

    // Mobile filters toggle
    const mobileFiltersToggle = document.getElementById(
      "mobile-filters-toggle"
    );
    const sidebar = document.getElementById("shop-sidebar");
    const filtersOverlay = document.getElementById("filters-overlay");
    const sidebarClose = document.getElementById("sidebar-close");

    if (mobileFiltersToggle) {
      mobileFiltersToggle.addEventListener("click", () => {
        sidebar?.classList.add("active");
        filtersOverlay?.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }

    const closeSidebar = () => {
      sidebar?.classList.remove("active");
      filtersOverlay?.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (sidebarClose) {
      sidebarClose.addEventListener("click", closeSidebar);
    }

    if (filtersOverlay) {
      filtersOverlay.addEventListener("click", closeSidebar);
    }

    // View toggle
    const viewToggleBtns = document.querySelectorAll(".view-toggle__btn");
    viewToggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.setView(view);
      });
    });

    // Sort dropdown
    const sortSelect = document.getElementById("sort-filter");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.currentSort = e.target.value;
        this.applySort();
      });
    }

    // Category filter
    const categorySelect = document.getElementById("category-filter");
    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        this.updateCategoryFilter();
      });
    }

    // Color filters
    const colorFilters = document.querySelectorAll(".color-filter");
    colorFilters.forEach((filter) => {
      filter.addEventListener("click", () => {
        filter.classList.toggle("active");
        this.updateColorFilters();
      });
    });

    // Rating filters
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
    ratingCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.updateRatingFilter();
      });
    });

    // Clear filters
    const clearFiltersBtn = document.getElementById("clear-filters");
    const resetFiltersBtn = document.getElementById("reset-filters");

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        this.clearAllFilters();
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        this.clearAllFilters();
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

    // Header scroll effect
    window.addEventListener("scroll", this.handleHeaderScroll.bind(this));
  }

  handleHeaderScroll() {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  initializePriceRange() {
    const priceMinSlider = document.getElementById("price-min");
    const priceMaxSlider = document.getElementById("price-max");
    const priceMinValue = document.getElementById("price-min-value");
    const priceMaxValue = document.getElementById("price-max-value");

    if (priceMinSlider && priceMaxSlider) {
      const updatePriceRange = () => {
        let min = parseInt(priceMinSlider.value);
        let max = parseInt(priceMaxSlider.value);

        if (min > max) {
          min = max;
          priceMinSlider.value = min;
        }

        this.filters.priceMin = min;
        this.filters.priceMax = max;

        if (priceMinValue) priceMinValue.textContent = `$${min}`;
        if (priceMaxValue) priceMaxValue.textContent = `$${max}`;

        this.applyFilters();
      };

      priceMinSlider.addEventListener("input", updatePriceRange);
      priceMaxSlider.addEventListener("input", updatePriceRange);
    }
  }

  setView(view) {
    this.currentView = view;
    const grid = document.getElementById("products-grid");
    const viewBtns = document.querySelectorAll(".view-toggle__btn");

    viewBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === view);
    });

    if (grid) {
      grid.classList.toggle("list-view", view === "list");
    }
  }

  updateCategoryFilter() {
    const categorySelect = document.getElementById("category-filter");
    if (categorySelect) {
      const selectedCategory = categorySelect.value;
      this.filters.categories =
        selectedCategory === "all" ? ["all"] : [selectedCategory];
      this.applyFilters();
    }
  }

  updateColorFilters() {
    const activeColorFilters = document.querySelectorAll(
      ".color-filter.active"
    );
    this.filters.colors = Array.from(activeColorFilters).map(
      (filter) => filter.dataset.color
    );
    this.applyFilters();
  }

  updateRatingFilter() {
    const ratingCheckboxes = document.querySelectorAll(
      'input[name="rating"]:checked'
    );
    if (ratingCheckboxes.length > 0) {
      this.filters.rating = Math.min(
        ...Array.from(ratingCheckboxes).map((cb) => parseInt(cb.value))
      );
    } else {
      this.filters.rating = null;
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = products.filter((product) => {
      // Category filter
      if (
        !this.filters.categories.includes("all") &&
        !this.filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price filter
      if (
        product.price < this.filters.priceMin ||
        product.price > this.filters.priceMax
      ) {
        return false;
      }

      // Rating filter
      if (this.filters.rating && product.rating < this.filters.rating) {
        return false;
      }

      // Search filter
      if (
        this.filters.search &&
        !product.title.toLowerCase().includes(this.filters.search) &&
        !product.category.toLowerCase().includes(this.filters.search)
      ) {
        return false;
      }

      // Color filter (simplified - in a real app, products would have color data)
      if (this.filters.colors.length > 0) {
        // For demo purposes, assume all products are available in all colors
      }

      return true;
    });

    this.currentPage = 1;
    this.applySort();
    this.renderProducts();
    this.updateProductCount();
    this.renderPagination();
    this.updateActiveFilters();
  }

  applySort() {
    switch (this.currentSort) {
      case "price-asc":
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        this.filteredProducts.sort((a, b) => {
          // Prioritize bestsellers and trending products
          const aScore =
            (a.tags.includes("bestseller") ? 2 : 0) +
            (a.tags.includes("trending") ? 1 : 0);
          const bScore =
            (b.tags.includes("bestseller") ? 2 : 0) +
            (b.tags.includes("trending") ? 1 : 0);
          return bScore - aScore;
        });
    }
  }

  renderProducts() {
    const grid = document.getElementById("products-grid");
    const loadingState = document.getElementById("loading-state");
    const emptyState = document.getElementById("empty-state");

    if (!grid) return;

    // Show loading state
    grid.style.display = "none";
    if (loadingState) loadingState.style.display = "flex";
    if (emptyState) emptyState.style.display = "none";

    setTimeout(() => {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

      if (productsToShow.length === 0) {
        grid.style.display = "none";
        if (loadingState) loadingState.style.display = "none";
        if (emptyState) emptyState.style.display = "flex";
        return;
      }

      grid.innerHTML = productsToShow
        .map((product) => this.createProductCard(product))
        .join("");
      this.addProductCardEventListeners(grid);

      // Hide loading state and show grid
      if (loadingState) loadingState.style.display = "none";
      if (emptyState) emptyState.style.display = "none";
      grid.style.display = "grid";
    }, 300); // Simulate loading time
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
    // Add to cart buttons
    container.querySelectorAll(".product-card__add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.addToCart(productId);
      });
    });

    // Wishlist buttons
    container.querySelectorAll(".product-card__wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId);
        this.toggleWishlist(productId);
        btn.classList.toggle("active");
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

  updateProductCount() {
    const countElement = document.getElementById("product-count");
    if (countElement) {
      const total = this.filteredProducts.length;
      const startIndex = (this.currentPage - 1) * this.productsPerPage + 1;
      const endIndex = Math.min(this.currentPage * this.productsPerPage, total);

      if (total === 0) {
        countElement.textContent = "No products found";
      } else {
        countElement.textContent = `Showing ${startIndex}-${endIndex} of ${total} products`;
      }
    }
  }

  renderPagination() {
    const paginationNumbers = document.getElementById("pagination-numbers");
    const prevBtn = document.getElementById("pagination-prev");
    const nextBtn = document.getElementById("pagination-next");

    if (!paginationNumbers) return;

    const totalPages = Math.ceil(
      this.filteredProducts.length / this.productsPerPage
    );

    if (totalPages <= 1) {
      document
        .getElementById("pagination")
        ?.style.setProperty("display", "none");
      return;
    } else {
      document
        .getElementById("pagination")
        ?.style.setProperty("display", "flex");
    }

    // Update prev/next buttons
    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
      prevBtn.onclick = () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.renderProducts();
          this.updateProductCount();
          this.renderPagination();
          this.scrollToTop();
        }
      };
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentPage === totalPages;
      nextBtn.onclick = () => {
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.renderProducts();
          this.updateProductCount();
          this.renderPagination();
          this.scrollToTop();
        }
      };
    }

    // Generate page numbers
    let paginationHTML = "";
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, this.currentPage + 2);

    // Adjust range if we're near the beginning or end
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      paginationHTML += `<button class="pagination__number" data-page="1">1</button>`;
      if (startPage > 2) {
        paginationHTML += '<span class="pagination__ellipsis">...</span>';
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage ? "active" : "";
      paginationHTML += `<button class="pagination__number ${isActive}" data-page="${i}">${i}</button>`;
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += '<span class="pagination__ellipsis">...</span>';
      }
      paginationHTML += `<button class="pagination__number" data-page="${totalPages}">${totalPages}</button>`;
    }

    paginationNumbers.innerHTML = paginationHTML;

    // Add click listeners to page numbers
    paginationNumbers.querySelectorAll(".pagination__number").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = parseInt(btn.dataset.page);
        this.currentPage = page;
        this.renderProducts();
        this.updateProductCount();
        this.renderPagination();
        this.scrollToTop();
      });
    });
  }

  updateActiveFilters() {
    const activeFiltersContainer = document.getElementById("active-filters");
    if (!activeFiltersContainer) return;

    const activeFilters = [];

    // Category filters (except 'all')
    if (
      !this.filters.categories.includes("all") &&
      this.filters.categories.length > 0
    ) {
      this.filters.categories.forEach((category) => {
        activeFilters.push({
          type: "category",
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        });
      });
    }

    // Price filter
    if (this.filters.priceMin > 0 || this.filters.priceMax < 200) {
      activeFilters.push({
        type: "price",
        value: "price",
        label: `$${this.filters.priceMin} - $${this.filters.priceMax}`,
      });
    }

    // Color filters
    this.filters.colors.forEach((color) => {
      activeFilters.push({
        type: "color",
        value: color,
        label: color.charAt(0).toUpperCase() + color.slice(1),
      });
    });

    // Rating filter
    if (this.filters.rating) {
      activeFilters.push({
        type: "rating",
        value: this.filters.rating,
        label: `${this.filters.rating}+ Stars`,
      });
    }

    // Search filter
    if (this.filters.search) {
      activeFilters.push({
        type: "search",
        value: this.filters.search,
        label: `"${this.filters.search}"`,
      });
    }

    activeFiltersContainer.innerHTML = activeFilters
      .map(
        (filter) => `
      <span class="active-filter">
        ${filter.label}
        <button class="active-filter__remove" data-type="${filter.type}" data-value="${filter.value}">
          <svg width="12" height="12" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </span>
    `
      )
      .join("");

    // Add event listeners to remove buttons
    activeFiltersContainer
      .querySelectorAll(".active-filter__remove")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const type = btn.dataset.type;
          const value = btn.dataset.value;
          this.removeFilter(type, value);
        });
      });
  }

  removeFilter(type, value) {
    switch (type) {
      case "category":
        this.filters.categories = ["all"];
        const categorySelect = document.getElementById("category-filter");
        if (categorySelect) categorySelect.value = "all";
        break;
      case "price":
        this.filters.priceMin = 0;
        this.filters.priceMax = 200;
        break;
      case "color":
        this.filters.colors = this.filters.colors.filter(
          (color) => color !== value
        );
        break;
      case "rating":
        this.filters.rating = null;
        break;
      case "search":
        this.filters.search = "";
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.value = "";
        break;
    }
    this.applyFilters();
  }

  clearAllFilters() {
    this.filters = {
      categories: ["all"],
      priceMin: 0,
      priceMax: 200,
      colors: [],
      rating: null,
      search: "",
    };

    // Update UI elements
    const categorySelect = document.getElementById("category-filter");
    if (categorySelect) categorySelect.value = "all";

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";

    this.applyFilters();
  }

  scrollToTop() {
    const shopContent = document.querySelector(".shop-content");
    if (shopContent) {
      shopContent.scrollIntoView({ behavior: "smooth" });
    }
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
    this.showNotification(`${product.title} added to cart`);
  }

  toggleWishlist(productId) {
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
    } else {
      this.wishlist.add(productId);
    }

    this.updateWishlistCounter();
    this.saveWishlistToStorage();
    this.showNotification(
      `Product ${
        this.wishlist.has(productId) ? "added to" : "removed from"
      } wishlist`
    );
  }

  showQuickView(productId) {
    if (window.showQuickView) {
      window.showQuickView(productId);
    }
  }

  navigateToProduct(productId) {
    console.log("Navigate to product:", productId);
    // In a real app, you'd navigate to the product page
    window.location.href = `./product.html?id=${productId}`;
  }

  updateWishlistCounter() {
    const counter = document.getElementById("wishlist-count");
    if (counter) {
      counter.textContent = this.wishlist.size;
    }
  }

  updateCartCounter() {
    const counter = document.getElementById("cart-count");
    if (counter) {
      const totalItems = Array.from(this.cart.values()).reduce(
        (sum, qty) => sum + qty,
        0
      );
      counter.textContent = totalItems;
    }
  }

  saveWishlistToStorage() {
    localStorage.setItem("wishlist", JSON.stringify(Array.from(this.wishlist)));
  }

  loadWishlistFromStorage() {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      this.wishlist = new Set(JSON.parse(saved));
      this.updateWishlistCounter();
    }
  }

  saveCartToStorage() {
    const cartArray = Array.from(this.cart.entries());
    localStorage.setItem("cart", JSON.stringify(cartArray));
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      this.cart = new Map(JSON.parse(saved));
      this.updateCartCounter();
    }
  }

  showNotification(message) {
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
  new ShopPage();
});
