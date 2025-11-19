// Product Page JavaScript - Shopify Integration

class ProductPage {
  constructor() {
    this.productForm = document.querySelector('form[action*="/cart/add"]');
    this.variantSelect = null;
    this.currentVariant = null;
    this.init();
  }

  init() {
    this.initializeEventListeners();
    this.initializeTabs();
    this.initializeImageGallery();
    this.initializeVariantSelection();
    this.initializeQuantityControls();
  }

  initializeEventListeners() {
    // Add to cart form submission
    if (this.productForm) {
      this.productForm.addEventListener('submit', (e) => this.handleAddToCart(e));
    }

    // Wishlist button
    const wishlistBtn = document.getElementById('add-to-wishlist');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => this.toggleWishlist());
    }

    // Image zoom
    const zoomBtn = document.getElementById('zoom-btn');
    const zoomModal = document.getElementById('zoom-modal');
    const zoomClose = document.getElementById('zoom-close');
    const zoomBackdrop = document.querySelector('.zoom-modal__backdrop');

    if (zoomBtn) {
      zoomBtn.addEventListener('click', () => this.openImageZoom());
    }

    if (zoomClose) {
      zoomClose.addEventListener('click', () => this.closeImageZoom());
    }

    if (zoomBackdrop) {
      zoomBackdrop.addEventListener('click', () => this.closeImageZoom());
    }
  }

  initializeQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.max);
        if (currentValue < maxValue) {
          quantityInput.value = currentValue + 1;
        }
      });
    }

    if (quantityInput) {
      quantityInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        const maxValue = parseInt(e.target.max);
        if (value > maxValue) value = maxValue;
        e.target.value = value;
      });
    }
  }

  initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.product__thumbnail');
    const mainImage = document.getElementById('main-product-image');

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove('active'));

        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');

        // Update main image
        const newImageSrc = thumbnail.dataset.image;
        if (mainImage && newImageSrc) {
          mainImage.src = newImageSrc;
        }
      });
    });
  }

  initializeVariantSelection() {
    // Handle color options
    const colorOptions = document.querySelectorAll('.product__color-option');
    colorOptions.forEach((option) => {
      option.addEventListener('click', () => {
        colorOptions.forEach((o) => o.classList.remove('active'));
        option.classList.add('active');
        this.updateSelectedVariant();
      });
    });

    // Handle size options
    const sizeOptions = document.querySelectorAll('.product__size-option');
    sizeOptions.forEach((option) => {
      option.addEventListener('click', () => {
        sizeOptions.forEach((o) => o.classList.remove('active'));
        option.classList.add('active');
        this.updateSelectedVariant();
      });
    });
  }

  updateSelectedVariant() {
    const selectedOptions = [];

    // Get all selected option values
    document.querySelectorAll('.product__color-option.active, .product__size-option.active').forEach((option) => {
      selectedOptions.push(option.dataset.value);
    });

    // Update hidden variant ID input if needed
    // This would require product.variants data from Shopify
    console.log('Selected options:', selectedOptions);
  }

  initializeTabs() {
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanels = document.querySelectorAll('.tabs__panel');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all buttons and panels
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  handleAddToCart(e) {
    e.preventDefault();

    const formData = new FormData(this.productForm);
    const variantId = formData.get('id');
    const quantity = formData.get('quantity') || 1;

    if (!variantId) {
      this.showNotification('Please select a product variant');
      return;
    }

    // Add to cart using Shopify Cart API
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: parseInt(quantity)
      })
    })
    .then(response => response.json())
    .then(data => {
      this.showNotification('Product added to cart!');
      // Trigger cart update event
      document.dispatchEvent(new CustomEvent('cart:updated'));
      // Update cart count in header
      this.updateCartCount();
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      this.showNotification('Error adding to cart. Please try again.');
    });
  }

  updateCartCount() {
    // Fetch cart and update cart count in header
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
          // Add a pulse animation
          cartCount.classList.add('pulse');
          setTimeout(() => {
            cartCount.classList.remove('pulse');
          }, 300);
        }
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }

  toggleWishlist() {
    const button = document.getElementById('add-to-wishlist');
    if (!button) return;

    // Get product handle from URL
    const pathParts = window.location.pathname.split('/');
    const productHandle = pathParts[pathParts.length - 1];

    if (!productHandle) return;

    // Get current wishlist
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch (e) {
      console.error('Error reading wishlist:', e);
    }

    const index = wishlist.indexOf(productHandle);

    if (index > -1) {
      // Remove from wishlist
      wishlist.splice(index, 1);
      button.classList.remove('active');
      this.showNotification('Removed from wishlist');
    } else {
      // Add to wishlist
      wishlist.push(productHandle);
      button.classList.add('active');
      this.showNotification('Added to wishlist!');
    }

    // Save wishlist
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      // Update wishlist count in header
      this.updateWishlistCount(wishlist.length);
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }

  updateWishlistCount(count) {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
      wishlistCount.textContent = count;
      // Add a pulse animation
      wishlistCount.classList.add('pulse');
      setTimeout(() => {
        wishlistCount.classList.remove('pulse');
      }, 300);
    }
  }

  openImageZoom() {
    const modal = document.getElementById('zoom-modal');
    const zoomImage = document.getElementById('zoom-image');
    const mainImage = document.getElementById('main-product-image');

    if (modal && zoomImage && mainImage) {
      zoomImage.src = mainImage.src;
      zoomImage.alt = mainImage.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeImageZoom() {
    const modal = document.getElementById('zoom-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  showNotification(message) {
    // Create and show toast notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #12908E;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      font-size: 14px;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductPage();

  // Check if product is in wishlist on page load
  try {
    const pathParts = window.location.pathname.split('/');
    const productHandle = pathParts[pathParts.length - 1];
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const button = document.getElementById('add-to-wishlist');

    if (button && wishlist.includes(productHandle)) {
      button.classList.add('active');
    }
  } catch (e) {
    console.error('Error checking wishlist:', e);
  }
});
