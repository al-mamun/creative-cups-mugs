// Wrap Designer JavaScript - Shopify Version
// Works with HTML structure from wrap-designer.liquid section
// Handles wrap product selection, inventory management, and cart integration

document.addEventListener('DOMContentLoaded', () => {
  // State
  let wrapCustomization = {
    selectedWrapProducts: [],
    totalPrice: 0
  };

  // Elements
  const wrapProductGrid = document.getElementById('wrap-product-grid');
  const wrapTotalPriceEl = document.getElementById('wrap-total-price');
  const addWrapToCartBtn = document.getElementById('add-wrap-to-cart');
  const categoryTabs = document.querySelectorAll('.wrap-category-tab');
  const clearWrapProductsBtn = document.getElementById('clear-wrap-products');
  const selectedWrapProductsList = document.getElementById('selected-wrap-products-list');
  const selectedWrapCount = document.getElementById('selected-wrap-count');

  // Initialize
  initializeWrapProducts();
  initializeWrapCategories();
  updateWrapPrice();

  // ====================================
  // Wrap Product Loading
  // ====================================

  async function initializeWrapProducts() {
    if (!wrapProductGrid) return;

    // Get product handles from section blocks
    const wrapProductsData = window.wrapDesignerData?.wrapProducts || [];

    if (wrapProductsData.length === 0) {
      wrapProductGrid.innerHTML = '<p class="error-message">No wrap products added. Please add "Wrap Product" blocks in the theme customizer.</p>';
      return;
    }

    // Show loading state
    wrapProductGrid.innerHTML = '<div class="loading-spinner">Loading wrap products...</div>';

    try {
      // Fetch all wrap products with their category information
      const productsWithCategories = await Promise.all(
        wrapProductsData.map(async (productData) => {
          try {
            const response = await fetch(`/products/${productData.handle.trim()}.js`);
            if (!response.ok) return null;

            const product = await response.json();

            // Add category information to product
            product.wrapCategory = productData.category === 'custom' && productData.category_custom
              ? productData.category_custom
              : productData.category;

            return product;
          } catch (error) {
            console.error(`Error fetching product ${productData.handle}:`, error);
            return null;
          }
        })
      );

      // Filter out failed fetches and check inventory availability
      const validWrapProducts = productsWithCategories.filter(p => {
        if (p === null) return false;

        // Check if product is available
        if (!p.available) return false;

        // Check if the default variant is available
        const defaultVariant = p.variants[0];
        if (!defaultVariant || !defaultVariant.available) return false;

        // Check inventory quantity if inventory tracking is enabled
        if (defaultVariant.inventory_management &&
            defaultVariant.inventory_policy === 'deny' &&
            defaultVariant.inventory_quantity <= 0) {
          return false;
        }

        return true;
      });

      if (validWrapProducts.length === 0) {
        wrapProductGrid.innerHTML = '<p class="error-message">No wrap products available in stock. Please check back later.</p>';
        return;
      }

      // Build wrap product grid HTML
      renderWrapProducts(validWrapProducts);

    } catch (error) {
      console.error('Error loading wrap products:', error);
      wrapProductGrid.innerHTML = '<p class="error-message">Error loading wrap products. Please refresh the page.</p>';
    }
  }

  function renderWrapProducts(products) {
    let productHTML = '';

    products.forEach((product) => {
      const price = (product.variants[0].price / 100).toFixed(2);
      const image = product.images[0] || '';
      const imageUrl = image || '';
      const category = product.wrapCategory || 'other';

      // Check current inventory status
      const variant = product.variants[0];
      const inStock = checkInventoryStatus(variant);
      const stockClass = inStock ? '' : 'out-of-stock';
      const stockBadge = !inStock ? '<span class="stock-badge">Out of Stock</span>' : '';

      productHTML += `
        <div class="wrap-product-item" data-category="${category}" data-product-handle="${product.handle}">
          <div class="wrap-product-card ${stockClass}">
            ${stockBadge}
            <div class="wrap-product-card__image">
              ${imageUrl ?
                `<img src="${imageUrl}" alt="${product.title}" loading="lazy" />` :
                `<svg class="wrap-placeholder-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>`
              }
            </div>
            <div class="wrap-product-card__info">
              <h4 class="wrap-product-card__name">${product.title}</h4>
              <p class="wrap-product-card__price">$${price}</p>
              ${variant.inventory_management ?
                `<p class="wrap-product-card__stock">${variant.inventory_quantity > 0 ? `${variant.inventory_quantity} in stock` : 'Out of stock'}</p>`
                : '<p class="wrap-product-card__stock">In stock</p>'
              }
            </div>
            <button
              class="wrap-product-card__select"
              data-product-id="${product.id}"
              data-variant-id="${variant.id}"
              data-handle="${product.handle}"
              data-title="${product.title}"
              data-price="${price}"
              data-image="${imageUrl}"
              data-category="${category}"
              data-inventory-qty="${variant.inventory_quantity || 0}"
              data-inventory-management="${variant.inventory_management || 'null'}"
              data-inventory-policy="${variant.inventory_policy || 'continue'}"
              ${!inStock ? 'disabled' : ''}
            >
              <span class="select-text">Select</span>
              <span class="selected-text">Selected</span>
            </button>
          </div>
        </div>
      `;
    });

    wrapProductGrid.innerHTML = productHTML;

    // Add event listeners to select buttons
    const selectButtons = wrapProductGrid.querySelectorAll('.wrap-product-card__select');
    selectButtons.forEach(btn => {
      btn.addEventListener('click', toggleWrapProductSelection);
    });
  }

  // ====================================
  // Inventory Management
  // ====================================

  function checkInventoryStatus(variant) {
    // If inventory management is disabled, product is always available
    if (!variant.inventory_management) {
      return variant.available;
    }

    // If inventory management is enabled
    if (variant.inventory_policy === 'deny') {
      // Cannot sell if out of stock
      return variant.available && variant.inventory_quantity > 0;
    } else {
      // Can sell even if out of stock (continue policy)
      return variant.available;
    }
  }

  async function refreshProductInventory(productHandle) {
    try {
      const response = await fetch(`/products/${productHandle}.js`);
      if (!response.ok) return null;

      const product = await response.json();
      return product.variants[0];
    } catch (error) {
      console.error('Error refreshing inventory:', error);
      return null;
    }
  }

  // ====================================
  // Wrap Product Selection
  // ====================================

  function toggleWrapProductSelection(e) {
    const btn = e.currentTarget;
    const productCard = btn.closest('.wrap-product-item');

    const productData = {
      productId: btn.dataset.productId,
      variantId: btn.dataset.variantId,
      handle: btn.dataset.handle,
      title: btn.dataset.title,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.image,
      category: btn.dataset.category,
      inventoryQty: parseInt(btn.dataset.inventoryQty) || 0,
      inventoryManagement: btn.dataset.inventoryManagement,
      inventoryPolicy: btn.dataset.inventoryPolicy
    };

    // Check if already selected
    const index = wrapCustomization.selectedWrapProducts.findIndex(
      p => p.productId === productData.productId
    );

    if (index > -1) {
      // Remove from selection
      wrapCustomization.selectedWrapProducts.splice(index, 1);
      productCard.classList.remove('selected');
    } else {
      // Check inventory before adding
      if (productData.inventoryManagement !== 'null' &&
          productData.inventoryPolicy === 'deny' &&
          productData.inventoryQty <= 0) {
        showWrapNotification('This wrap design is currently out of stock');
        return;
      }

      // Add to selection
      wrapCustomization.selectedWrapProducts.push(productData);
      productCard.classList.add('selected');
    }

    updateSelectedWrapProductsDisplay();
    updateWrapPrice();
    updateWrapPreview();
  }

  function updateSelectedWrapProductsDisplay() {
    if (!selectedWrapProductsList) return;

    if (selectedWrapCount) {
      selectedWrapCount.textContent = wrapCustomization.selectedWrapProducts.length;
    }

    if (wrapCustomization.selectedWrapProducts.length === 0) {
      selectedWrapProductsList.innerHTML = '<p class="selected-wrap-products__empty">No wrap products selected yet</p>';
      return;
    }

    selectedWrapProductsList.innerHTML = '';

    wrapCustomization.selectedWrapProducts.forEach(product => {
      const item = document.createElement('div');
      item.className = 'selected-wrap-product-item';
      item.innerHTML = `
        <span class="selected-wrap-product-item__name">${product.title}</span>
        <span class="selected-wrap-product-item__price">$${product.price.toFixed(2)}</span>
        <button class="selected-wrap-product-item__remove" data-product-id="${product.productId}" aria-label="Remove wrap">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/>
          </svg>
        </button>
      `;

      const removeBtn = item.querySelector('.selected-wrap-product-item__remove');
      removeBtn.addEventListener('click', () => {
        const productId = removeBtn.dataset.productId;
        const index = wrapCustomization.selectedWrapProducts.findIndex(p => p.productId === productId);

        if (index > -1) {
          wrapCustomization.selectedWrapProducts.splice(index, 1);

          // Update UI
          const productItem = wrapProductGrid.querySelector(`.wrap-product-card__select[data-product-id="${productId}"]`)?.closest('.wrap-product-item');
          if (productItem) {
            productItem.classList.remove('selected');
          }

          updateSelectedWrapProductsDisplay();
          updateWrapPrice();
          updateWrapPreview();
        }
      });

      selectedWrapProductsList.appendChild(item);
    });
  }

  // ====================================
  // Category Filtering
  // ====================================

  function initializeWrapCategories() {
    if (!categoryTabs) return;

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter products
        const productItems = wrapProductGrid.querySelectorAll('.wrap-product-item');
        productItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ====================================
  // Clear All Products
  // ====================================

  if (clearWrapProductsBtn) {
    clearWrapProductsBtn.addEventListener('click', () => {
      wrapCustomization.selectedWrapProducts = [];

      const productItems = wrapProductGrid.querySelectorAll('.wrap-product-item');
      productItems.forEach(item => item.classList.remove('selected'));

      updateSelectedWrapProductsDisplay();
      updateWrapPrice();
      updateWrapPreview();
    });
  }

  // ====================================
  // Preview Updates
  // ====================================

  function updateWrapPreview() {
    const previewImage = document.getElementById('selected-wrap-image');
    const previewPlaceholder = document.getElementById('selected-wrap-placeholder');
    const previewLayers = document.querySelector('.wrap-preview-layers');
    const wrapOverlay = document.getElementById('wrap-overlay');

    if (wrapCustomization.selectedWrapProducts.length > 0) {
      // Show first selected wrap
      const firstWrap = wrapCustomization.selectedWrapProducts[0];

      if (previewPlaceholder) {
        previewPlaceholder.style.display = 'none';
      }
      if (previewLayers) {
        previewLayers.style.display = 'flex';
      }

      if (previewImage && firstWrap.image) {
        previewImage.src = firstWrap.image;
        previewImage.alt = firstWrap.title;
      }

      // Update overlay if multiple wraps selected
      if (wrapOverlay && wrapCustomization.selectedWrapProducts.length > 1) {
        const secondWrap = wrapCustomization.selectedWrapProducts[1];
        if (secondWrap.image) {
          wrapOverlay.style.backgroundImage = `url(${secondWrap.image})`;
          wrapOverlay.classList.add('active');
        }
      } else if (wrapOverlay) {
        wrapOverlay.style.backgroundImage = '';
        wrapOverlay.classList.remove('active');
      }
    } else {
      // Show placeholder
      if (previewPlaceholder) {
        previewPlaceholder.style.display = 'flex';
      }
      if (previewLayers) {
        previewLayers.style.display = 'none';
      }
    }
  }

  // ====================================
  // Price Calculation
  // ====================================

  function updateWrapPrice() {
    let totalPrice = 0;

    wrapCustomization.selectedWrapProducts.forEach(product => {
      totalPrice += product.price;
    });

    wrapCustomization.totalPrice = totalPrice;

    if (wrapTotalPriceEl) {
      wrapTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }

  // ====================================
  // Add to Cart (Shopify Integration)
  // ====================================

  if (addWrapToCartBtn) {
    addWrapToCartBtn.addEventListener('click', async () => {
      // Validate selections
      if (wrapCustomization.selectedWrapProducts.length === 0) {
        showWrapNotification('Please select at least one wrap product');
        return;
      }

      // Show loading state
      addWrapToCartBtn.disabled = true;
      addWrapToCartBtn.textContent = 'Adding to Cart...';

      try {
        // Refresh inventory for all selected products
        const inventoryChecks = await Promise.all(
          wrapCustomization.selectedWrapProducts.map(product =>
            refreshProductInventory(product.handle)
          )
        );

        // Check if any products are now out of stock
        for (let i = 0; i < inventoryChecks.length; i++) {
          const variant = inventoryChecks[i];
          const product = wrapCustomization.selectedWrapProducts[i];

          if (!variant || !checkInventoryStatus(variant)) {
            showWrapNotification(`Sorry, "${product.title}" is now out of stock. Please remove it and try again.`);
            addWrapToCartBtn.disabled = false;
            addWrapToCartBtn.textContent = 'Add Wrap Design to Cart';
            return;
          }
        }

        // Add all selected wrap products to cart
        const cartItems = wrapCustomization.selectedWrapProducts.map(product => ({
          id: product.variantId,
          quantity: 1,
          properties: {
            '_Wrap Design': product.title,
            '_Category': product.category,
            '_Product Type': 'Custom Wrap Design'
          }
        }));

        // Add items to cart using Shopify Cart API
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cartItems
          })
        });

        if (!response.ok) {
          throw new Error('Failed to add wrap products to cart');
        }

        const cartData = await response.json();

        showWrapNotification('✓ Wrap designs added to cart!');

        // Update cart count
        updateCartCount();

        // Trigger cart updated event
        document.dispatchEvent(new CustomEvent('cart:updated'));

        // Reset button
        addWrapToCartBtn.disabled = false;
        addWrapToCartBtn.textContent = 'Add Wrap Design to Cart';

        // Redirect to cart after delay
        setTimeout(() => {
          window.location.href = '/cart';
        }, 1500);

      } catch (error) {
        console.error('Error adding wrap designs to cart:', error);
        showWrapNotification('Error: ' + error.message + '. Please try again.');

        // Reset button
        addWrapToCartBtn.disabled = false;
        addWrapToCartBtn.textContent = 'Add Wrap Design to Cart';
      }
    });
  }

  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
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

  // ====================================
  // Utility Functions
  // ====================================

  function showWrapNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wrap-notification';
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

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
});
