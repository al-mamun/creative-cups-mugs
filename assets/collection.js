// Collection Page JavaScript - Shopify Version
// Handles product card interactions for Liquid-rendered products

document.addEventListener('DOMContentLoaded', function() {
  // Initialize wishlist from localStorage
  function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }

  function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
  }

  function updateWishlistCount() {
    const wishlist = getWishlist();
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
      countElement.textContent = wishlist.length;
    }
  }

  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
          countElement.textContent = cart.item_count;
        }
      });
  }

  // Show notification
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'success' ? '#12908E' : '#ef4444'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      font-size: 14px;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Handle wishlist button clicks
  document.addEventListener('click', function(e) {
    const wishlistBtn = e.target.closest('.product-card__wishlist');
    if (wishlistBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productCard = wishlistBtn.closest('.product-card');
      const productLink = productCard.querySelector('.product-card__title a, .product-card__image a');

      if (!productLink) return;

      const productHandle = productLink.href.split('/products/')[1];
      if (!productHandle) return;

      let wishlist = getWishlist();
      const index = wishlist.indexOf(productHandle);

      if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        wishlistBtn.classList.remove('active');
        showNotification('Removed from wishlist');
      } else {
        // Add to wishlist
        wishlist.push(productHandle);
        wishlistBtn.classList.add('active');
        showNotification('Added to wishlist');
      }

      saveWishlist(wishlist);
    }
  });

  // Handle add to cart button clicks
  document.addEventListener('click', function(e) {
    const addToCartBtn = e.target.closest('.product-card__add-to-cart');
    if (addToCartBtn && !addToCartBtn.disabled) {
      e.preventDefault();
      e.stopPropagation();

      const variantId = addToCartBtn.dataset.variantId;
      const productCard = addToCartBtn.closest('.product-card');

      if (!variantId) {
        showNotification('Product variant not found', 'error');
        return;
      }

      // Disable button and show loading state
      const originalText = addToCartBtn.textContent;
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = 'Adding...';

      // Add to cart via Shopify API
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.json();
      })
      .then(item => {
        showNotification('Added to cart!');
        updateCartCount();

        // Trigger cart update event for mini cart
        document.dispatchEvent(new CustomEvent('cart:updated'));

        // Re-enable button
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = originalText;
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        showNotification('Error adding to cart', 'error');

        // Re-enable button
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = originalText;
      });
    }
  });

  // Handle quick view button clicks
  document.addEventListener('click', function(e) {
    const quickViewBtn = e.target.closest('.product-card__quick-view');
    if (quickViewBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productCard = quickViewBtn.closest('.product-card');
      const productId = productCard.dataset.productId;
      const productLink = productCard.querySelector('.product-card__title a, .product-card__image a');

      if (productLink) {
        const productHandle = productLink.href.split('/products/')[1];
        showQuickView(productHandle);
      } else {
        showNotification('Product not found', 'error');
      }
    }
  });

  // Quick View Modal Functions
  function showQuickView(productHandle) {
    // Fetch product data
    fetch(`/products/${productHandle}.js`)
      .then(response => response.json())
      .then(product => {
        populateQuickView(product);
        openQuickViewModal();
      })
      .catch(error => {
        console.error('Error loading product:', error);
        showNotification('Error loading product details', 'error');
      });
  }

  function populateQuickView(product) {
    // Product image
    document.getElementById('quick-view-image').src = product.featured_image || '';
    document.getElementById('quick-view-image').alt = product.title;

    // Product title
    document.getElementById('quick-view-title').textContent = product.title;

    // Product type/category
    const categoryEl = document.getElementById('quick-view-category');
    if (product.type) {
      categoryEl.textContent = product.type;
      categoryEl.style.display = 'block';
    } else {
      categoryEl.style.display = 'none';
    }

    // Price
    const priceEl = document.getElementById('quick-view-price');
    const originalPriceEl = document.getElementById('quick-view-original-price');

    if (product.compare_at_price && product.compare_at_price > product.price) {
      priceEl.textContent = formatMoney(product.price);
      priceEl.classList.add('sale');
      originalPriceEl.textContent = formatMoney(product.compare_at_price);
      originalPriceEl.style.display = 'block';
    } else {
      priceEl.textContent = formatMoney(product.price);
      priceEl.classList.remove('sale');
      originalPriceEl.style.display = 'none';
    }

    // Availability
    const availabilityEl = document.getElementById('quick-view-availability');
    if (product.available) {
      availabilityEl.textContent = 'In Stock';
      availabilityEl.className = 'quick-view-modal__availability in-stock';
    } else {
      availabilityEl.textContent = 'Out of Stock';
      availabilityEl.className = 'quick-view-modal__availability out-of-stock';
    }

    // Description
    const descriptionEl = document.getElementById('quick-view-description');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = product.description;
    descriptionEl.textContent = tempDiv.textContent.substring(0, 200) + '...';

    // Full details link
    document.getElementById('quick-view-full-details').href = `/products/${product.handle}`;

    // Store product data for add to cart
    document.getElementById('quick-view-add-to-cart').dataset.variantId = product.variants[0].id;
    document.getElementById('quick-view-add-to-cart').dataset.available = product.available;

    // Reset quantity
    document.getElementById('quick-view-quantity').value = 1;
  }

  function openQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  // Quick view modal close button
  const quickViewClose = document.getElementById('quick-view-close');
  if (quickViewClose) {
    quickViewClose.addEventListener('click', closeQuickViewModal);
  }

  // Close modal on overlay click
  const quickViewOverlay = document.querySelector('.quick-view-modal__overlay');
  if (quickViewOverlay) {
    quickViewOverlay.addEventListener('click', closeQuickViewModal);
  }

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeQuickViewModal();
    }
  });

  // Quantity controls
  const decreaseBtn = document.getElementById('quick-view-decrease');
  const increaseBtn = document.getElementById('quick-view-increase');
  const quantityInput = document.getElementById('quick-view-quantity');

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }

  // Add to cart from quick view
  const quickViewAddToCart = document.getElementById('quick-view-add-to-cart');
  if (quickViewAddToCart) {
    quickViewAddToCart.addEventListener('click', function() {
      const variantId = this.dataset.variantId;
      const available = this.dataset.available === 'true';
      const quantity = parseInt(document.getElementById('quick-view-quantity').value);

      if (!available) {
        showNotification('This product is out of stock', 'error');
        return;
      }

      if (!variantId) {
        showNotification('Product variant not found', 'error');
        return;
      }

      // Disable button
      const originalText = this.innerHTML;
      this.disabled = true;
      this.innerHTML = 'Adding...';

      // Add to cart
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.json();
      })
      .then(item => {
        showNotification('Added to cart!');
        updateCartCount();
        document.dispatchEvent(new CustomEvent('cart:updated'));
        closeQuickViewModal();

        // Re-enable button
        quickViewAddToCart.disabled = false;
        quickViewAddToCart.innerHTML = originalText;
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        showNotification('Error adding to cart', 'error');

        // Re-enable button
        quickViewAddToCart.disabled = false;
        quickViewAddToCart.innerHTML = originalText;
      });
    });
  }

  // Initialize wishlist state on page load
  function initializeWishlist() {
    const wishlist = getWishlist();
    document.querySelectorAll('.product-card').forEach(card => {
      const productLink = card.querySelector('.product-card__title a, .product-card__image a');
      const wishlistBtn = card.querySelector('.product-card__wishlist');

      if (productLink && wishlistBtn) {
        const productHandle = productLink.href.split('/products/')[1];
        if (productHandle && wishlist.includes(productHandle)) {
          wishlistBtn.classList.add('active');
        }
      }
    });

    updateWishlistCount();
  }

  // Initialize
  initializeWishlist();
  updateCartCount();
});
