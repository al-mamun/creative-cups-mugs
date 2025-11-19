// Product Card Interactions
// Handles Add to Cart, Wishlist, and Quick View for product cards

document.addEventListener('DOMContentLoaded', function() {

  // Initialize product card interactions
  initProductCardButtons();

  // Re-initialize when content changes (for dynamic sections)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        initProductCardButtons();
      }
    });
  });

  // Observe body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function initProductCardButtons() {
    // Add to Cart buttons
    document.querySelectorAll('.product-card__add-to-cart:not([data-initialized])').forEach(button => {
      button.setAttribute('data-initialized', 'true');
      button.addEventListener('click', handleAddToCart);
    });

    // Wishlist buttons
    document.querySelectorAll('.product-card__wishlist:not([data-initialized])').forEach(button => {
      button.setAttribute('data-initialized', 'true');
      button.addEventListener('click', handleWishlist);
    });

    // Quick view buttons
    document.querySelectorAll('.product-card__quick-view:not([data-initialized])').forEach(button => {
      button.setAttribute('data-initialized', 'true');
      button.addEventListener('click', handleQuickView);
    });
  }

  // Handle Add to Cart
  async function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    const button = e.currentTarget;
    const variantId = button.dataset.variantId;

    if (!variantId) {
      console.error('No variant ID found');
      return;
    }

    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Adding...';
    button.disabled = true;

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();

      // Update cart count
      updateCartCount();

      // Show notification
      showNotification('✓ Product added to cart!');

      // Reset button
      button.textContent = originalText;
      button.disabled = false;

    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Error adding to cart. Please try again.', 'error');
      button.textContent = originalText;
      button.disabled = false;
    }
  }

  // Handle Wishlist
  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();

    const button = e.currentTarget;
    const productId = button.dataset.productId;

    if (!productId) {
      console.error('No product ID found');
      return;
    }

    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.includes(parseInt(productId));

    if (isInWishlist) {
      // Remove from wishlist
      wishlist = wishlist.filter(id => id !== parseInt(productId));
      button.classList.remove('active');
      showNotification('Removed from wishlist');
    } else {
      // Add to wishlist
      wishlist.push(parseInt(productId));
      button.classList.add('active');
      showNotification('Added to wishlist');
    }

    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update wishlist count
    updateWishlistCount();
  }

  // Handle Quick View
  async function handleQuickView(e) {
    e.preventDefault();
    e.stopPropagation();

    const button = e.currentTarget;
    const productId = button.dataset.productId;

    if (!productId) {
      console.error('No product ID found');
      return;
    }

    // Get product handle from the product card
    const productCard = button.closest('.product-card');
    const productLink = productCard.querySelector('a[href*="/products/"]');

    if (!productLink) {
      console.error('No product link found');
      return;
    }

    const productHandle = productLink.href.split('/products/')[1].split('?')[0];

    try {
      // Fetch product data from Shopify
      const response = await fetch(`/products/${productHandle}.js`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const product = await response.json();
      showQuickViewModal(product);

    } catch (error) {
      console.error('Error loading product:', error);
      // Fallback: redirect to product page
      window.location.href = productLink.href;
    }
  }

  // Show Quick View Modal with product data
  function showQuickViewModal(product) {
    const modal = document.getElementById('quick-view-modal');
    const image = document.getElementById('quick-view-image');
    const title = document.getElementById('quick-view-title');
    const category = document.getElementById('quick-view-category');
    const price = document.getElementById('quick-view-price');
    const originalPrice = document.getElementById('quick-view-original-price');
    const description = document.getElementById('quick-view-description');
    const availability = document.getElementById('quick-view-availability');
    const quantity = document.getElementById('quick-view-quantity');
    const addToCartBtn = document.getElementById('quick-view-add-to-cart');
    const fullDetailsBtn = document.getElementById('quick-view-full-details');
    const closeBtn = document.getElementById('quick-view-close');

    if (!modal) {
      console.error('Quick view modal not found');
      return;
    }

    // Populate modal with product data
    if (image) {
      image.src = product.featured_image || '';
      image.alt = product.title;
    }

    if (title) title.textContent = product.title;

    if (category && product.type) {
      category.textContent = product.type;
      category.style.display = 'block';
    } else if (category) {
      category.style.display = 'none';
    }

    if (price) {
      const priceValue = product.price / 100;
      price.textContent = `$${priceValue.toFixed(2)}`;
    }

    if (originalPrice && product.compare_at_price && product.compare_at_price > product.price) {
      const comparePrice = product.compare_at_price / 100;
      originalPrice.textContent = `$${comparePrice.toFixed(2)}`;
      originalPrice.style.display = 'block';
    } else if (originalPrice) {
      originalPrice.style.display = 'none';
    }

    if (description) {
      const desc = product.description || `This ${product.title} is a premium quality product perfect for your needs.`;
      description.textContent = desc.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    }

    if (availability) {
      if (product.available) {
        availability.textContent = '✓ In Stock';
        availability.className = 'quick-view-modal__availability in-stock';
      } else {
        availability.textContent = '✗ Out of Stock';
        availability.className = 'quick-view-modal__availability out-of-stock';
      }
    }

    if (quantity) quantity.value = 1;

    if (fullDetailsBtn) {
      fullDetailsBtn.href = `/products/${product.handle}`;
    }

    if (addToCartBtn) {
      addToCartBtn.dataset.variantId = product.variants[0].id;
      addToCartBtn.disabled = !product.available;

      // Remove old event listeners by cloning
      const newBtn = addToCartBtn.cloneNode(true);
      addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);

      newBtn.addEventListener('click', async function() {
        const qty = parseInt(quantity?.value || 1);
        const variantId = this.dataset.variantId;

        this.textContent = 'Adding...';
        this.disabled = true;

        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: variantId,
              quantity: qty
            })
          });

          if (!response.ok) throw new Error('Failed to add to cart');

          updateCartCount();
          showNotification('✓ Product added to cart!');
          closeQuickViewModal();

        } catch (error) {
          console.error('Error adding to cart:', error);
          showNotification('Error adding to cart', 'error');
        } finally {
          this.textContent = 'Add to Cart';
          this.disabled = false;
        }
      });
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close modal function
    const closeModal = () => closeQuickViewModal();

    // Close button
    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    // Overlay click to close
    const overlay = modal.querySelector('.quick-view-modal__overlay');
    if (overlay) {
      overlay.onclick = closeModal;
    }

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    // Remove old escape listener
    document.removeEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleEscape);

    // Quantity controls
    const decreaseBtn = modal.querySelector('#quick-view-decrease');
    const increaseBtn = modal.querySelector('#quick-view-increase');

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
        if (currentValue < 10) {
          quantity.value = currentValue + 1;
        }
      };
    }
  }

  // Close Quick View Modal
  function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Update cart count
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
        }
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }

  // Update wishlist count
  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistCount = document.getElementById('wishlist-count');
    if (wishlistCount) {
      wishlistCount.textContent = wishlist.length;
    }
  }

  // Show notification
  function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.product-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `product-notification product-notification--${type}`;
    notification.textContent = message;

    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'error' ? '#e74c3c' : 'var(--color-accent-emerald, #009688)'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(400px);
      transition: transform 0.3s ease;
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
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Initialize on load
  updateCartCount();
  updateWishlistCount();
});
