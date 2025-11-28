// Custom Product Designer JavaScript - Shopify Version
// Works with HTML structure from custom-designer.liquid section

// ====================================
// Collection Fetching Functions (Unlimited Products!)
// ====================================

/**
 * Fetch all products from a Shopify collection
 * @param {string} collectionHandle - The collection handle
 * @returns {Promise<Array>} Array of product objects
 */
async function fetchProductsFromCollection(collectionHandle) {
  if (!collectionHandle || collectionHandle === '') {
    console.warn('No collection handle provided');
    return [];
  }

  try {
    const response = await fetch(`/collections/${collectionHandle}/products.json?limit=250`);

    if (!response.ok) {
      console.error(`Failed to fetch collection: ${collectionHandle}`);
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
}

/**
 * Extract category from product tags
 * Tags should be in format: "category:quotes" or "category:glitter"
 * @param {Array} tags - Product tags array
 * @returns {string} Category name or 'other'
 */
function getCategoryFromTags(tags) {
  if (!tags || !Array.isArray(tags)) return 'other';

  // Reserved tags to ignore (system/admin tags)
  const ignoreTags = ['new', 'featured', 'sale', 'bestseller', 'hot', 'popular'];

  // First, check if there's a category: prefix tag (backward compatibility)
  const categoryTag = tags.find(tag => tag.toLowerCase().startsWith('category:'));
  if (categoryTag) {
    return categoryTag.split(':')[1].trim().toLowerCase();
  }

  // Otherwise, use the first non-reserved tag as the category
  const firstValidTag = tags.find(tag => !ignoreTags.includes(tag.toLowerCase()));

  if (firstValidTag) {
    return firstValidTag.trim().toLowerCase();
  }

  return 'other';
}

// Generate dynamic category tabs from products with tags
function generateDynamicCategoryTabs(products) {
  const categoryContainer = document.getElementById('wrap-categories');
  if (!categoryContainer) return;

  // Extract unique categories from products
  const categories = new Set();
  products.forEach(product => {
    if (product.wrapCategory && product.wrapCategory !== 'other') {
      categories.add(product.wrapCategory);
    }
  });

  console.log('🏷️ Found categories:', Array.from(categories));

  // Only regenerate if we have categories from tags
  if (categories.size > 0) {
    // Build category tabs HTML
    let tabsHTML = `
      <button class="category-tab active" data-category="all">
        <span class="category-icon">🎨</span>
        <span class="category-name">All Wraps</span>
      </button>
    `;

    // Add category-specific tabs
    categories.forEach(category => {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      const icon = getCategoryIcon(category);
      tabsHTML += `
        <button class="category-tab" data-category="${category}">
          <span class="category-icon">${icon}</span>
          <span class="category-name">${categoryName}</span>
        </button>
      `;
    });

    categoryContainer.innerHTML = tabsHTML;
    console.log('✅ Dynamic category tabs created');
  }
}

// Get emoji icon for category - UNLIMITED CATEGORIES SUPPORTED
function getCategoryIcon(category) {
  const icons = {
    // Animals & Creatures
    'animals': '🐾',
    'cats': '🐱',
    'dogs': '🐶',
    'birds': '🦜',
    'wildlife': '🦁',
    'ocean': '🐋',
    'butterflies': '🦋',
    'dinosaurs': '🦖',
    'farm': '🐄',
    'pets': '🐕',

    // Quotes & Text
    'quotes': '💬',
    'quotes-adult': '🔞',
    'inspirational': '💭',
    'funny': '😂',
    'love': '💕',
    'motivational': '💪',
    'sarcastic': '😏',

    // Holidays & Seasons
    'holidays': '🎄',
    'christmas': '🎅',
    'halloween': '🎃',
    'easter': '🐰',
    'valentines': '💝',
    'thanksgiving': '🦃',
    'new-year': '🎆',
    'birthday': '🎂',
    'summer': '☀️',
    'winter': '❄️',
    'spring': '🌱',
    'fall': '🍂',
    'autumn': '🍁',

    // Patterns & Designs
    'patterns': '🎨',
    'floral': '🌸',
    'geometric': '🔷',
    'stripes': '📏',
    'dots': '⚫',
    'abstract': '✨',
    'mandala': '🔯',
    'paisley': '🌀',
    'chevron': '📐',
    'damask': '🎭',

    // Sports & Activities
    'sports': '⚽',
    'football': '🏈',
    'basketball': '🏀',
    'baseball': '⚾',
    'soccer': '⚽',
    'tennis': '🎾',
    'golf': '⛳',
    'fitness': '💪',
    'yoga': '🧘',
    'dancing': '💃',
    'gaming': '🎮',

    // Music & Entertainment
    'music': '🎵',
    'rock': '🎸',
    'classical': '🎻',
    'jazz': '🎺',
    'movies': '🎬',
    'theater': '🎭',
    'reading': '📚',

    // Food & Drinks
    'food': '🍕',
    'coffee': '☕',
    'tea': '🍵',
    'wine': '🍷',
    'desserts': '🍰',
    'fruits': '🍎',
    'vegetables': '🥕',
    'pizza': '🍕',
    'burgers': '🍔',
    'tacos': '🌮',
    'donuts': '🍩',
    'ice-cream': '🍦',
    'candy': '🍬',
    'lollies': '🍭',
    'sweets': '🍬',

    // Nature & Outdoors
    'nature': '🌿',
    'flowers': '🌺',
    'trees': '🌳',
    'garden': '🌻',
    'mountains': '⛰️',
    'beach': '🏖️',
    'sunset': '🌅',
    'stars': '⭐',
    'moon': '🌙',
    'sun': '☀️',

    // Textures & Materials
    'glitter': '✨',
    'marble': '🪨',
    'wood': '🪵',
    'metallic': '⚡',
    'pastel': '🎀',
    'neon': '💡',
    'gold': '🏆',
    'silver': '🥈',
    'rose-gold': '🌹',
    'lava': '🌋',
    'honey': '🍯',
    'holographic': '🌈',
    'shimmer': '✨',
    'matte': '⚫',
    'glossy': '💎',

    // Colors
    'rainbow': '🌈',
    'pink': '💗',
    'blue': '💙',
    'purple': '💜',
    'green': '💚',
    'yellow': '💛',
    'orange': '🧡',
    'red': '❤️',
    'black': '🖤',
    'white': '🤍',
    'multi-color': '🎨',

    // Professions & Hobbies
    'nurse': '👩‍⚕️',
    'doctor': '👨‍⚕️',
    'teacher': '👩‍🏫',
    'artist': '👨‍🎨',
    'chef': '👨‍🍳',
    'crafts': '✂️',
    'sewing': '🧵',
    'knitting': '🧶',
    'gardening': '👩‍🌾',

    // Family & Relationships
    'mum': '👩',
    'mom': '👩',
    'dad': '👨',
    'baby': '👶',
    'kids': '👧',
    'family': '👨‍👩‍👧‍👦',
    'grandma': '👵',
    'grandpa': '👴',
    'sister': '👭',
    'brother': '👬',

    // Themes & Styles
    'vintage': '📻',
    'retro': '📼',
    'modern': '🔲',
    'rustic': '🪵',
    'boho': '🌾',
    'minimalist': '⬜',
    'elegant': '👑',
    'cute': '🥰',
    'kawaii': '😊',
    'gothic': '🦇',
    'skulls': '💀',
    'tribal': '🗿',

    // Symbols & Icons
    'hearts': '❤️',
    'stars': '⭐',
    'crowns': '👑',
    'diamonds': '💎',
    'flags': '🚩',
    'zodiac': '♈',
    'astrology': '🔮',
    'spiritual': '🕉️',
    'religious': '✝️',

    // Travel & Places
    'travel': '✈️',
    'beach': '🏖️',
    'city': '🏙️',
    'camping': '⛺',
    'adventure': '🧭',
    'world': '🌍',
    'usa': '🇺🇸',
    'paris': '🗼',

    // Misc Categories
    'custom': '🎨',
    'other': '🎨',
    'new': '🆕',
    'popular': '🔥',
    'trending': '📈',
    'bestseller': '🏆',
    'limited': '⚡',
    'exclusive': '💎'
  };

  // Return matching icon or default 🎨
  // This supports UNLIMITED categories - any tag will work even without a custom icon
  return icons[category.toLowerCase()] || '🎨';
}

// Generate dynamic style category tabs
function generateDynamicStyleCategoryTabs(products, container) {
  if (!container) return;

  // Extract unique categories
  const categories = new Set();
  products.forEach(product => {
    if (product.styleCategory && product.styleCategory !== 'other') {
      categories.add(product.styleCategory);
    }
  });

  console.log('🏷️ Style categories found:', Array.from(categories));

  if (categories.size > 0) {
    let tabsHTML = '';
    let isFirst = true;

    categories.forEach(category => {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      const icon = getCategoryIcon(category);

      tabsHTML += `
        <label class="style-tab">
          <input type="radio" name="style-type" value="${category}" ${isFirst ? 'checked' : ''} />
          <span class="style-tab__btn">${icon} ${categoryName}</span>
        </label>
      `;
      isFirst = false;
    });

    container.innerHTML = tabsHTML;
    console.log('✅ Dynamic style category tabs created');
  }
}

// Render style products
function renderStyleProducts(products, container) {
  let productsHTML = '';

  products.forEach(product => {
    // Handle price
    let price;
    const variantPrice = product.variants[0].price;
    if (typeof variantPrice === 'string') {
      price = parseFloat(variantPrice).toFixed(2);
    } else {
      price = (variantPrice / 100).toFixed(2);
    }

    // Handle image URL
    let imageUrl = '';
    if (product.images && product.images.length > 0) {
      imageUrl = typeof product.images[0] === 'object' ? product.images[0].src : product.images[0];
    } else if (product.featured_image) {
      imageUrl = typeof product.featured_image === 'object' ? product.featured_image.src : product.featured_image;
    }

    const category = product.styleCategory || 'other';

    productsHTML += `
      <div class="style-item" data-category="${category}" data-price="${price}" data-id="${product.id}">
        <div class="style-item__image">
          ${imageUrl ?
            `<img src="${imageUrl}" alt="${product.title}" loading="lazy" />` :
            `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="item-placeholder-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>`
          }
        </div>
        <div class="style-item__info">
          <h4 class="style-item__title">${product.title}</h4>
          <p class="style-item__price">$${price}</p>
        </div>
        <button class="style-item__select"
                data-style-id="${product.id}"
                data-style-title="${product.title}"
                data-style-price="${price}"
                data-style-image="${imageUrl}"
                data-variant-id="${product.variants[0].id}"
                data-product-handle="${product.handle}">
          <span class="select-text">Select</span>
          <span class="selected-text">Selected</span>
        </button>
      </div>
    `;
  });

  container.innerHTML = productsHTML;
}

// Initialize style category filtering
function initializeStyleCategoryFiltering() {
  const styleRadios = document.querySelectorAll('input[name="style-type"]');
  const styleGallery = document.getElementById('style-gallery');

  if (!styleGallery) return;

  styleRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedCategory = radio.value;
      const styleItems = styleGallery.querySelectorAll('.style-item');

      styleItems.forEach(item => {
        if (item.dataset.category === selectedCategory) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Trigger initial filter
  const checkedRadio = document.querySelector('input[name="style-type"]:checked');
  if (checkedRadio) {
    const event = new Event('change');
    checkedRadio.dispatchEvent(event);
  }
}

// Initialize style selection
function initializeStyleSelection() {
  const styleGallery = document.getElementById('style-gallery');
  if (!styleGallery) return;

  styleGallery.addEventListener('click', (e) => {
    const selectBtn = e.target.closest('.style-item__select');
    if (!selectBtn) return;

    const styleItem = selectBtn.closest('.style-item');
    const styleId = selectBtn.dataset.styleId;
    const styleTitle = selectBtn.dataset.styleTitle;
    const stylePrice = parseFloat(selectBtn.dataset.stylePrice);
    const styleImage = selectBtn.dataset.styleImage || '';

    // Toggle selection
    const index = customization.selectedStyles.findIndex(s => s.id === styleId);

    if (index > -1) {
      // Remove
      customization.selectedStyles.splice(index, 1);
      styleItem.classList.remove('selected');
    } else {
      // Add
      customization.selectedStyles.push({
        id: styleId,
        title: styleTitle,
        price: stylePrice,
        image: styleImage
      });
      styleItem.classList.add('selected');
    }

    updateSelectedStylesDisplay();
    updatePreviewSummary();
    updatePrice();
    updatePreview();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentStep = 1;
  let customization = {
    cup: null,
    cupPrice: 0,
    selectedWraps: [],
    selectedStyles: [],
    tiktokLive: 'no'
  };

  // Elements
  const progressSteps = document.querySelectorAll('.progress-step');
  const stepPanels = document.querySelectorAll('.step-panel');
  const totalPriceEl = document.getElementById('total-price');
  const rotateLeftBtn = document.getElementById('rotate-left');
  const rotateRightBtn = document.getElementById('rotate-right');
  const cupImageWrapper = document.querySelector('.cup-image-wrapper');

  // Navigation
  const nextBtns = document.querySelectorAll('.btn-next');
  const backBtns = document.querySelectorAll('.btn-back');
  const checkoutBtn = document.getElementById('add-custom-to-cart');

  let currentRotation = 0;

  // Initialize
  initializeCupOptions();
  initializeWrapGallery();
  initializeStyleGallery();
  initializeTikTokOptions();
  updatePrice();

  // ====================================
  // Navigation Functions
  // ====================================

  function goToStep(step) {
    if (step < 1 || step > 4) return;

    currentStep = step;

    // Update progress indicators
    progressSteps.forEach((progressStep, index) => {
      const stepNum = index + 1;
      progressStep.classList.remove('active', 'completed');

      if (stepNum < currentStep) {
        progressStep.classList.add('completed');
      } else if (stepNum === currentStep) {
        progressStep.classList.add('active');
      }
    });

    // Update step panels
    stepPanels.forEach((panel) => {
      panel.classList.remove('active');
      if (parseInt(panel.dataset.step) === currentStep) {
        panel.classList.add('active');
      }
    });

    // Scroll to top of designer section
    const designer = document.querySelector('.custom-designer');
    if (designer) {
      designer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Next button handlers
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Validate current step
      if (currentStep === 1 && !customization.cup) {
        showNotification('Please select a cup first');
        return;
      }

      const nextStep = currentStep + 1;
      goToStep(nextStep);
    });
  });

  // Back button handlers
  backBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const backStep = currentStep - 1;
      goToStep(backStep);
    });
  });

  // ====================================
  // Step 1: Cup Selection
  // ====================================

  async function initializeCupOptions() {
    const cupGrid = document.getElementById('cup-grid');

    if (!cupGrid) return;

    // Show loading state
    cupGrid.innerHTML = '<div class="loading-spinner">Loading cups...</div>';

    try {
      let products = [];

      // Check if using collection mode
      if (window.customDesignerData?.useCollections && window.customDesignerData?.cupCollection) {
        // COLLECTION MODE - Unlimited products!
        console.log('🚀 COLLECTION MODE ENABLED');
        console.log('Collection Handle:', window.customDesignerData.cupCollection);
        products = await fetchProductsFromCollection(window.customDesignerData.cupCollection);
        console.log('Products fetched from collection:', products.length);
        console.log('Products data:', products);
      } else {
        // BLOCK MODE - Legacy support (max 50 blocks)
        const productHandles = window.customDesignerData?.cupProducts || [];

        if (productHandles.length === 0) {
          cupGrid.innerHTML = '<p class="error-message">No cup products added. Please add "Cup Product" blocks or enable Collection Mode in theme customizer.</p>';
          return;
        }

        // Fetch all products from handles
        const fetchedProducts = await Promise.all(
          productHandles.map(handle =>
            fetch(`/products/${handle.trim()}.js`)
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          )
        );
        products = fetchedProducts.filter(p => p !== null);
      }

      // Filter out failed fetches and out of stock products
      const validProducts = products.filter(p => {
        if (p === null) {
          console.log('❌ Null product filtered out');
          return false;
        }

        // Must have at least one variant
        if (!p.variants || p.variants.length === 0) {
          console.log('❌ No variants:', p.title);
          return false;
        }

        // Check if product has stock
        const defaultVariant = p.variants[0];

        // If inventory management is enabled, check stock levels
        if (defaultVariant.inventory_management) {
          const qty = defaultVariant.inventory_quantity;
          const allowsBackorder = defaultVariant.inventory_policy === 'continue';

          // Has stock if quantity > 0 OR allows backorders
          const hasStock = qty > 0 || allowsBackorder;

          if (!hasStock) {
            console.log('❌ Out of stock:', p.title, 'Qty:', qty, 'Policy:', defaultVariant.inventory_policy);
            return false;
          }
        }

        // If inventory tracking is disabled, check the 'available' flag
        if (!defaultVariant.inventory_management && !defaultVariant.available) {
          console.log('❌ Not available:', p.title);
          return false;
        }

        console.log('✅ Valid product:', p.title, 'Stock:', defaultVariant.inventory_quantity, 'Available:', defaultVariant.available);
        return true;
      });

      console.log('Valid products after filtering:', validProducts.length);

      if (validProducts.length === 0) {
        cupGrid.innerHTML = '<p class="error-message">No cup products available in stock. Please check back later.<br><small>Check browser console (F12) for debug info.</small></p>';
        return;
      }

      // Build cup grid HTML
      let cupHTML = '';
      validProducts.forEach((product, index) => {
        // Collection API returns price as string in dollars (e.g., "37.00")
        // Product API returns price as integer in cents (e.g., 3700)
        let price;
        const variantPrice = product.variants[0].price;
        if (typeof variantPrice === 'string') {
          // Collection API format - already in dollars
          price = parseFloat(variantPrice).toFixed(2);
        } else {
          // Product API format - convert cents to dollars
          price = (variantPrice / 100).toFixed(2);
        }

        // Handle image URL - Collection API returns objects with 'src' property
        let imageUrl = '';
        if (product.images && product.images.length > 0) {
          // If it's an object with src property
          imageUrl = typeof product.images[0] === 'object' ? product.images[0].src : product.images[0];
        } else if (product.featured_image) {
          imageUrl = typeof product.featured_image === 'object' ? product.featured_image.src : product.featured_image;
        }

        console.log('🖼️ Image URL for', product.title, ':', imageUrl);

        cupHTML += `
          <label class="cup-option">
            <input
              type="radio"
              name="cup-type"
              value="${product.handle}"
              data-price="${price}"
              data-image="${imageUrl}"
              data-title="${product.title}"
              data-product-id="${product.id}"
              data-variant-id="${product.variants[0].id}"
              ${index === 0 ? 'checked' : ''}
            />
            <div class="cup-card">
              <div class="cup-card__image">
                ${imageUrl ?
                  `<img src="${imageUrl}" alt="${product.title}" />` :
                  `<svg class="cup-placeholder-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    <line x1="6" y1="1" x2="6" y2="4"/>
                    <line x1="10" y1="1" x2="10" y2="4"/>
                    <line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>`
                }
              </div>
              <h4 class="cup-card__name">${product.title}</h4>
              <p class="cup-card__price">$${price}</p>
            </div>
          </label>
        `;
      });

      cupGrid.innerHTML = cupHTML;

      // Add event listeners
      const cupRadios = cupGrid.querySelectorAll('input[name="cup-type"]');
      cupRadios.forEach((radio) => {
        if (radio.checked) {
          selectCupFromRadio(radio);
        }

        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            selectCupFromRadio(e.target);
          }
        });
      });

    } catch (error) {
      console.error('Error loading cup products:', error);
      cupGrid.innerHTML = '<p class="error-message">Error loading cups. Please refresh the page.</p>';
    }
  }

  function selectCupFromRadio(radio) {
    customization.cup = {
      handle: radio.value,
      title: radio.dataset.title,
      price: parseFloat(radio.dataset.price),
      image: radio.dataset.image,
      productId: radio.dataset.productId,
      variantId: radio.dataset.variantId
    };
    customization.cupPrice = parseFloat(radio.dataset.price);

    updatePreviewSummary();
    updatePrice();
    updatePreview();
  }

  // ====================================
  // Step 2: Wrap Selection (Product-based)
  // ====================================

  async function initializeWrapGallery() {
    const wrapGallery = document.getElementById('wrap-gallery');
    const categoryTabs = document.querySelectorAll('.wrap-categories .category-tab');
    const clearWrapsBtn = document.getElementById('clear-wraps');

    if (!wrapGallery) return;

    // Show loading state
    wrapGallery.innerHTML = '<div class="loading-spinner">Loading wrap products...</div>';

    try {
      let productsWithCategories = [];

      // Check if using collection mode
      if (window.customDesignerData?.useCollections && window.customDesignerData?.wrapCollection) {
        // COLLECTION MODE - Unlimited products!
        console.log('🚀 WRAP COLLECTION MODE ENABLED');
        console.log('Wrap Collection Handle:', window.customDesignerData.wrapCollection);

        const collectionProducts = await fetchProductsFromCollection(window.customDesignerData.wrapCollection);
        console.log('Wrap products fetched:', collectionProducts.length);

        // Add category from tags
        productsWithCategories = collectionProducts.map(product => {
          const category = getCategoryFromTags(product.tags);
          console.log('📦 Product:', product.title, 'Tags:', product.tags, 'Category:', category);
          product.wrapCategory = category;
          return product;
        });

        // Generate dynamic category tabs from product tags
        generateDynamicCategoryTabs(productsWithCategories);

      } else {
        // BLOCK MODE - Legacy support (max 50 blocks)
        const wrapProductsData = window.customDesignerData?.wrapProducts || [];

        if (wrapProductsData.length === 0) {
          wrapGallery.innerHTML = '<p class="error-message">No wrap products added. Please add "Wrap Product" blocks or enable Collection Mode in theme customizer.</p>';
          return;
        }

        // Fetch all wrap products with their category information
        const fetchedProducts = await Promise.all(
          wrapProductsData.map(async (productData) => {
            try {
              const response = await fetch(`/products/${productData.handle.trim()}.js`);
              if (!response.ok) return null;

              const product = await response.json();

              // Add category information to product
              product.wrapCategory = productData.category;

              return product;
            } catch (error) {
              console.error(`Error fetching wrap product ${productData.handle}:`, error);
              return null;
            }
          })
        );
        productsWithCategories = fetchedProducts;
      }

      // Filter out failed fetches and out of stock products
      const validWrapProducts = productsWithCategories.filter(p => {
        if (p === null) return false;

        // Must have at least one variant
        if (!p.variants || p.variants.length === 0) return false;

        // Check if product has stock
        const defaultVariant = p.variants[0];

        // If inventory management is enabled, check stock levels
        if (defaultVariant.inventory_management) {
          const qty = defaultVariant.inventory_quantity;
          const allowsBackorder = defaultVariant.inventory_policy === 'continue';

          // Has stock if quantity > 0 OR allows backorders
          const hasStock = qty > 0 || allowsBackorder;

          if (!hasStock) {
            console.log('❌ Wrap out of stock:', p.title, 'Qty:', qty);
            return false;
          }
        }

        // If inventory tracking is disabled, check the 'available' flag
        if (!defaultVariant.inventory_management && !defaultVariant.available) {
          console.log('❌ Wrap not available:', p.title);
          return false;
        }

        return true;
      });

      if (validWrapProducts.length === 0) {
        wrapGallery.innerHTML = '<p class="error-message">No wrap products available in stock. Please check back later.</p>';
        return;
      }

      // Build wrap product grid HTML
      renderWrapProducts(validWrapProducts);

      // Initialize category tabs after products are loaded
      // Re-query category tabs in case they were dynamically generated
      const updatedCategoryTabs = document.querySelectorAll('.wrap-categories .category-tab');
      initializeWrapCategoryTabs(updatedCategoryTabs);

      // Clear all wraps button
      if (clearWrapsBtn) {
        clearWrapsBtn.addEventListener('click', () => {
          customization.selectedWraps = [];
          const wrapItems = wrapGallery.querySelectorAll('.wrap-item');
          wrapItems.forEach(item => item.classList.remove('selected'));
          updateSelectedWrapsDisplay();
          updatePreviewSummary();
          updatePrice();
          updatePreview();
        });
      }

    } catch (error) {
      console.error('Error loading wrap products:', error);
      wrapGallery.innerHTML = '<p class="error-message">Error loading wrap products. Please refresh the page.</p>';
    }
  }

  function renderWrapProducts(products) {
    const wrapGallery = document.getElementById('wrap-gallery');
    let productHTML = '';

    // Render all products
    products.forEach((product) => {
      // Collection API returns price as string in dollars (e.g., "37.00")
      // Product API returns price as integer in cents (e.g., 3700)
      let price;
      const variantPrice = product.variants[0].price;
      if (typeof variantPrice === 'string') {
        // Collection API format - already in dollars
        price = parseFloat(variantPrice).toFixed(2);
      } else {
        // Product API format - convert cents to dollars
        price = (variantPrice / 100).toFixed(2);
      }

      // Handle image URL - Collection API returns objects with 'src' property
      let imageUrl = '';
      if (product.images && product.images.length > 0) {
        imageUrl = typeof product.images[0] === 'object' ? product.images[0].src : product.images[0];
      } else if (product.featured_image) {
        imageUrl = typeof product.featured_image === 'object' ? product.featured_image.src : product.featured_image;
      }

      const category = product.wrapCategory || 'other';
      const variant = product.variants[0];

      // Determine stock display text - always show as available
      let stockText = 'Available';
      if (variant.inventory_management && variant.inventory_quantity !== null && variant.inventory_quantity !== undefined) {
        const qty = variant.inventory_quantity;
        if (qty > 0) {
          stockText = `${qty} in stock`;
        } else if (variant.inventory_policy === 'continue') {
          stockText = 'Available (backorder)';
        } else {
          stockText = 'Limited stock';
        }
      }

      productHTML += `
        <div class="wrap-item" data-category="${category}" data-product-handle="${product.handle}">
          <div class="wrap-item__image">
            ${imageUrl ?
              `<img src="${imageUrl}" alt="${product.title}" loading="lazy" />` :
              `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="item-placeholder-icon">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>`
            }
          </div>
          <div class="wrap-item__info">
            <h4 class="wrap-item__title">${product.title}</h4>
            <p class="wrap-item__price">$${price}</p>
            <p class="wrap-item__stock">${stockText}</p>
          </div>
          <button
            class="wrap-item__select"
            data-wrap-id="${product.id}"
            data-variant-id="${variant.id}"
            data-wrap-title="${product.title}"
            data-wrap-price="${price}"
            data-wrap-image="${imageUrl}"
            data-product-handle="${product.handle}"
            data-inventory-qty="${variant.inventory_quantity || 0}"
            data-inventory-management="${variant.inventory_management || 'null'}"
            data-inventory-policy="${variant.inventory_policy || 'continue'}"
          >
            <span class="select-text">Select</span>
            <span class="selected-text">Selected</span>
          </button>
        </div>
      `;
    });

    wrapGallery.innerHTML = productHTML;

    // Add event listeners to all select buttons (all products shown are in stock)
    const selectButtons = wrapGallery.querySelectorAll('.wrap-item__select');
    selectButtons.forEach(btn => {
      btn.addEventListener('click', toggleWrapProductSelection);
    });
  }

  function initializeWrapCategoryTabs(categoryTabs) {
    const wrapGallery = document.getElementById('wrap-gallery');

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter wraps
        const wrapItems = wrapGallery.querySelectorAll('.wrap-item');
        wrapItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  function toggleWrapProductSelection(e) {
    const btn = e.currentTarget;
    const wrapItem = btn.closest('.wrap-item');

    const wrapData = {
      id: btn.dataset.wrapId,
      variantId: btn.dataset.variantId,
      title: btn.dataset.wrapTitle,
      price: parseFloat(btn.dataset.wrapPrice),
      image: btn.dataset.wrapImage,
      handle: btn.dataset.productHandle,
      inventoryQty: parseInt(btn.dataset.inventoryQty) || 0,
      inventoryManagement: btn.dataset.inventoryManagement,
      inventoryPolicy: btn.dataset.inventoryPolicy
    };

    // Check if already selected
    const index = customization.selectedWraps.findIndex(w => w.id === wrapData.id);

    if (index > -1) {
      // Remove from selection
      customization.selectedWraps.splice(index, 1);
      wrapItem.classList.remove('selected');
    } else {
      // Check inventory before adding
      if (wrapData.inventoryManagement !== 'null' &&
          wrapData.inventoryPolicy === 'deny' &&
          wrapData.inventoryQty <= 0) {
        showNotification('This wrap design is currently out of stock');
        return;
      }

      // Add to selection
      customization.selectedWraps.push(wrapData);
      wrapItem.classList.add('selected');
    }

    updateSelectedWrapsDisplay();
    updatePreviewSummary();
    updatePrice();
    updatePreview();
  }

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

  function updateSelectedWrapsDisplay() {
    const selectedList = document.getElementById('selected-wraps-list');
    const selectedCount = document.getElementById('selected-count');

    if (!selectedList) return;

    if (selectedCount) {
      selectedCount.textContent = customization.selectedWraps.length;
    }

    if (customization.selectedWraps.length === 0) {
      selectedList.innerHTML = '<p class="selected-wraps__empty">No wraps selected yet</p>';
      return;
    }

    selectedList.innerHTML = '';

    customization.selectedWraps.forEach(wrap => {
      const item = document.createElement('div');
      item.className = 'selected-wrap-item';
      item.innerHTML = `
        ${wrap.image ? `<img src="${wrap.image}" alt="${wrap.title}" class="selected-wrap-item__image" />` : ''}
        <span class="selected-wrap-item__name">${wrap.title}</span>
        <span class="selected-wrap-item__price">+$${wrap.price.toFixed(2)}</span>
        <button class="selected-wrap-item__remove" data-wrap-id="${wrap.id}" aria-label="Remove wrap">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/>
          </svg>
        </button>
      `;

      const removeBtn = item.querySelector('.selected-wrap-item__remove');
      removeBtn.addEventListener('click', () => {
        const wrapId = removeBtn.dataset.wrapId;
        const index = customization.selectedWraps.findIndex(w => w.id === wrapId);

        if (index > -1) {
          customization.selectedWraps.splice(index, 1);

          // Update UI
          const wrapItem = document.querySelector(`.wrap-item .wrap-item__select[data-wrap-id="${wrapId}"]`)?.closest('.wrap-item');
          if (wrapItem) {
            wrapItem.classList.remove('selected');
          }

          updateSelectedWrapsDisplay();
          updatePreviewSummary();
          updatePrice();
          updatePreview();
        }
      });

      selectedList.appendChild(item);
    });
  }

  // ====================================
  // Step 3: Style Selection
  // ====================================

  async function initializeStyleGallery() {
    const styleGallery = document.getElementById('style-gallery');
    const styleCategoryContainer = document.querySelector('.style-selector');
    const clearStylesBtn = document.getElementById('clear-styles');

    if (!styleGallery) return;

    // Check if using collection mode
    if (window.customDesignerData?.useCollections && window.customDesignerData?.styleCollection) {
      // COLLECTION MODE - Load styles from collection
      console.log('🚀 STYLE COLLECTION MODE ENABLED');
      console.log('Style Collection Handle:', window.customDesignerData.styleCollection);

      try {
        // Show loading
        styleGallery.innerHTML = '<div class="loading-spinner">Loading styles...</div>';

        const collectionProducts = await fetchProductsFromCollection(window.customDesignerData.styleCollection);
        console.log('Style products fetched:', collectionProducts.length);

        // Add category from tags
        const productsWithCategories = collectionProducts.map(product => {
          const category = getCategoryFromTags(product.tags);
          console.log('🎨 Style:', product.title, 'Tags:', product.tags, 'Category:', category);
          product.styleCategory = category;
          return product;
        });

        // Filter out out-of-stock products
        const validProducts = productsWithCategories.filter(p => {
          if (!p || !p.variants || p.variants.length === 0) return false;

          const defaultVariant = p.variants[0];

          if (defaultVariant.inventory_management) {
            const qty = defaultVariant.inventory_quantity;
            const allowsBackorder = defaultVariant.inventory_policy === 'continue';
            const hasStock = qty > 0 || allowsBackorder;

            if (!hasStock) {
              console.log('❌ Style out of stock:', p.title);
              return false;
            }
          }

          if (!defaultVariant.inventory_management && !defaultVariant.available) {
            console.log('❌ Style not available:', p.title);
            return false;
          }

          return true;
        });

        if (validProducts.length === 0) {
          styleGallery.innerHTML = '<p class="error-message">No style products available. Please check back later.</p>';
          return;
        }

        // Generate dynamic category tabs
        generateDynamicStyleCategoryTabs(validProducts, styleCategoryContainer);

        // Render style products
        renderStyleProducts(validProducts, styleGallery);

        // Initialize category filtering
        initializeStyleCategoryFiltering();

        // Initialize selection handlers
        initializeStyleSelection();

        // Clear styles button
        if (clearStylesBtn) {
          clearStylesBtn.addEventListener('click', () => {
            customization.selectedStyles = [];
            const styleItems = styleGallery.querySelectorAll('.style-item');
            styleItems.forEach(item => item.classList.remove('selected'));
            updateSelectedStylesDisplay();
            updatePreviewSummary();
            updatePrice();
            updatePreview();
          });
        }

      } catch (error) {
        console.error('Error loading style products:', error);
        styleGallery.innerHTML = '<p class="error-message">Error loading styles. Please refresh the page.</p>';
      }

      return; // Exit - collection mode handled
    }

    // BLOCK MODE - Legacy support
    const styleRadios = document.querySelectorAll('input[name="style-type"]');
    const styleItems = document.querySelectorAll('.style-item');
    let currentCategory = styleRadios[0]?.value || null;

    // Category selection
    styleRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        // Clear selections when switching categories
        customization.selectedStyles = [];
        styleItems.forEach(item => item.classList.remove('selected'));
        updateSelectedStylesDisplay();
        updatePreviewSummary();

        currentCategory = radio.value;

        // Filter styles
        styleItems.forEach(item => {
          if (item.dataset.category === currentCategory) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        updatePreview();
      });
    });

    // Initialize - show first category
    if (currentCategory) {
      styleItems.forEach(item => {
        if (item.dataset.category === currentCategory) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Style selection
    styleItems.forEach(item => {
      const selectBtn = item.querySelector('.style-item__select');

      selectBtn.addEventListener('click', () => {
        const styleId = selectBtn.dataset.styleId;
        const styleTitle = selectBtn.dataset.styleTitle;
        const stylePrice = parseFloat(selectBtn.dataset.stylePrice);
        const styleImage = item.querySelector('.style-item__image img')?.src || '';

        // Toggle selection
        const index = customization.selectedStyles.findIndex(s => s.id === styleId);

        if (index > -1) {
          // Remove
          customization.selectedStyles.splice(index, 1);
          item.classList.remove('selected');
        } else {
          // Add
          customization.selectedStyles.push({
            id: styleId,
            title: styleTitle,
            price: stylePrice,
            image: styleImage
          });
          item.classList.add('selected');
        }

        updateSelectedStylesDisplay();
        updatePreviewSummary();
        updatePrice();
        updatePreview();
      });
    });

    // Clear all styles
    if (clearStylesBtn) {
      clearStylesBtn.addEventListener('click', () => {
        customization.selectedStyles = [];
        styleItems.forEach(item => item.classList.remove('selected'));
        updateSelectedStylesDisplay();
        updatePreviewSummary();
        updatePrice();
        updatePreview();
      });
    }
  }

  function updateSelectedStylesDisplay() {
    const selectedList = document.getElementById('selected-styles-list');
    const selectedCount = document.getElementById('selected-styles-count');

    if (!selectedList) return;

    if (selectedCount) {
      selectedCount.textContent = customization.selectedStyles.length;
    }

    if (customization.selectedStyles.length === 0) {
      selectedList.innerHTML = '<p class="selected-styles__empty">No styles selected yet</p>';
      return;
    }

    selectedList.innerHTML = '';

    customization.selectedStyles.forEach(style => {
      const item = document.createElement('div');
      item.className = 'selected-style-item';
      item.innerHTML = `
        ${style.image ? `<img src="${style.image}" alt="${style.title}" class="selected-style-item__image" />` : ''}
        <span class="selected-style-item__name">${style.title}</span>
        <span class="selected-style-item__price">+$${style.price.toFixed(2)}</span>
        <button class="selected-style-item__remove" data-style-id="${style.id}" aria-label="Remove style">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/>
          </svg>
        </button>
      `;

      const removeBtn = item.querySelector('.selected-style-item__remove');
      removeBtn.addEventListener('click', () => {
        const styleId = removeBtn.dataset.styleId;
        const index = customization.selectedStyles.findIndex(s => s.id === styleId);

        if (index > -1) {
          customization.selectedStyles.splice(index, 1);

          // Update UI
          const styleItem = document.querySelector(`.style-item .style-item__select[data-style-id="${styleId}"]`)?.closest('.style-item');
          if (styleItem) {
            styleItem.classList.remove('selected');
          }

          updateSelectedStylesDisplay();
          updatePreviewSummary();
          updatePrice();
          updatePreview();
        }
      });

      selectedList.appendChild(item);
    });
  }

  // ====================================
  // Preview Summary Section
  // ====================================

  function updatePreviewSummary() {
    const summaryEmpty = document.getElementById('summary-empty');
    const cupSection = document.getElementById('summary-cup-section');
    const wrapsSection = document.getElementById('summary-wraps-section');
    const stylesSection = document.getElementById('summary-styles-section');
    const tiktokSection = document.getElementById('summary-tiktok-section');

    // Check if we have any selections
    const hasSelections = customization.cup ||
                          customization.selectedWraps.length > 0 ||
                          customization.selectedStyles.length > 0 ||
                          customization.tiktokLive === 'yes';

    // Show/hide empty state
    if (summaryEmpty) {
      summaryEmpty.style.display = hasSelections ? 'none' : 'block';
    }

    // Update Cup section
    if (cupSection) {
      if (customization.cup) {
        cupSection.style.display = 'block';
        const cupName = document.getElementById('summary-cup-name');
        if (cupName) {
          cupName.textContent = customization.cup.title;
        }
      } else {
        cupSection.style.display = 'none';
      }
    }

    // Update Wraps section
    if (wrapsSection) {
      if (customization.selectedWraps.length > 0) {
        wrapsSection.style.display = 'block';
        const wrapsCount = document.getElementById('summary-wraps-count');
        const wrapsList = document.getElementById('summary-wraps-list');

        if (wrapsCount) {
          wrapsCount.textContent = customization.selectedWraps.length;
        }

        if (wrapsList) {
          wrapsList.innerHTML = customization.selectedWraps.map(wrap =>
            `<div class="preview-summary__item">
              <img src="${wrap.image}" alt="${wrap.title}" class="preview-summary__item-image" />
              <span class="preview-summary__item-text">${wrap.title}</span>
            </div>`
          ).join('');
        }
      } else {
        wrapsSection.style.display = 'none';
      }
    }

    // Update Styles section
    if (stylesSection) {
      if (customization.selectedStyles.length > 0) {
        stylesSection.style.display = 'block';
        const stylesCount = document.getElementById('summary-styles-count');
        const stylesList = document.getElementById('summary-styles-list');

        if (stylesCount) {
          stylesCount.textContent = customization.selectedStyles.length;
        }

        if (stylesList) {
          stylesList.innerHTML = customization.selectedStyles.map(style =>
            `<div class="preview-summary__item">
              <img src="${style.image}" alt="${style.title}" class="preview-summary__item-image" />
              <span class="preview-summary__item-text">${style.title}</span>
            </div>`
          ).join('');
        }
      } else {
        stylesSection.style.display = 'none';
      }
    }

    // Update TikTok section
    if (tiktokSection) {
      if (customization.tiktokLive === 'yes') {
        tiktokSection.style.display = 'block';
        const tiktokValue = document.getElementById('summary-tiktok-value');
        if (tiktokValue) {
          tiktokValue.textContent = 'Yes, I want to watch live!';
        }
      } else {
        tiktokSection.style.display = 'none';
      }
    }
  }

  // ====================================
  // Step 4: TikTok Live Selection
  // ====================================

  function initializeTikTokOptions() {
    const tiktokRadios = document.querySelectorAll('input[name="tiktok-live"]');
    tiktokRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        customization.tiktokLive = e.target.value;
        updatePreviewSummary();
      });
    });
  }

  // ====================================
  // Preview Updates
  // ====================================

  function updatePreview() {
    const previewImage = document.getElementById('selected-cup-image');
    const previewPlaceholder = document.getElementById('selected-cup-placeholder');
    const previewLayers = document.querySelector('.preview-layers');
    const wrapOverlay = document.getElementById('preview-wrap-overlay');
    const styleOverlay = document.getElementById('preview-style-overlay');

    // Update cup/bottle image
    if (previewImage && customization.cup && customization.cup.image) {
      // Hide placeholder, show layers
      if (previewPlaceholder) {
        previewPlaceholder.style.display = 'none';
      }
      if (previewLayers) {
        previewLayers.style.display = 'flex';
      }

      // Update cup image
      previewImage.src = customization.cup.image;
      previewImage.alt = customization.cup.title;
    }

    // DISABLED: Overlay effects on preview image
    // Items are now shown clearly in the summary list below with images
    // Keeping the preview clean with just the base cup image

    // Keep overlays hidden
    if (wrapOverlay) {
      wrapOverlay.style.backgroundImage = '';
      wrapOverlay.classList.remove('active');
    }

    if (styleOverlay) {
      styleOverlay.classList.remove('glitter-effect', 'lava-effect', 'marble-effect', 'active');
      styleOverlay.style.backgroundImage = '';
    }
  }

  // Rotation Controls
  if (rotateLeftBtn && cupImageWrapper) {
    rotateLeftBtn.addEventListener('click', () => {
      currentRotation -= 45;
      cupImageWrapper.style.transform = `rotateY(${currentRotation}deg)`;
    });
  }

  if (rotateRightBtn && cupImageWrapper) {
    rotateRightBtn.addEventListener('click', () => {
      currentRotation += 45;
      cupImageWrapper.style.transform = `rotateY(${currentRotation}deg)`;
    });
  }

  // ====================================
  // Price Calculation
  // ====================================

  function updatePrice() {
    let totalPrice = customization.cupPrice;

    // Add wrap prices
    customization.selectedWraps.forEach(wrap => {
      totalPrice += wrap.price;
    });

    // Add style prices
    customization.selectedStyles.forEach(style => {
      totalPrice += style.price;
    });

    if (totalPriceEl) {
      totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }

  // ====================================
  // Add to Cart (Shopify Integration)
  // ====================================

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Validate selections - only cup is required
      if (!customization.cup) {
        showNotification('Please select a cup first');
        return;
      }

      // Calculate total price
      let totalPrice = customization.cupPrice;
      let wrapTotal = 0;
      let styleTotal = 0;

      customization.selectedWraps.forEach(wrap => {
        wrapTotal += wrap.price;
      });

      customization.selectedStyles.forEach(style => {
        styleTotal += style.price;
      });

      totalPrice += wrapTotal + styleTotal;

      // Build detailed line item properties for Shopify
      const properties = {
        '_Cup Type': customization.cup.title,
        '_Watch on TikTok Live': customization.tiktokLive === 'yes' ? 'Yes' : 'No',
        '_Customization Details': `Cup: $${customization.cupPrice.toFixed(2)} | Wraps: $${wrapTotal.toFixed(2)} | Styles: $${styleTotal.toFixed(2)} | Total: $${totalPrice.toFixed(2)}`
      };

      // Add wrap designs if selected
      if (customization.selectedWraps.length > 0) {
        properties['_Wrap Designs'] = customization.selectedWraps.map(w => w.title).join(', ');
      }

      // Add styles if selected
      if (customization.selectedStyles.length > 0) {
        properties['_Style & Colors'] = customization.selectedStyles.map(s => s.title).join(', ');
      }

      // Use the cup's product handle to add to cart
      const productHandle = customization.cup.handle;

      if (!productHandle) {
        showNotification('Product configuration error. Please contact support.');
        console.error('Missing product handle for cup:', customization.cup);
        return;
      }

      // Show loading state
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = 'Adding to Cart...';

      // Calculate customization cost
      const customizationCost = wrapTotal + styleTotal;

      // Safety check: Prevent orders over $100 (variant limit)
      if (totalPrice > 100) {
        showNotification('⚠️ Your customization exceeds $100. Please contact us for a custom quote!', 'error');
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Add to Cart';
        return;
      }

      // Fetch the universal "Custom Design Product"
      fetch('/products/custom-design-product.js')
        .then(response => {
          if (!response.ok) {
            throw new Error('Custom Design Product not found. Please create it using the CSV import or follow QUICK_SETUP_5_MINUTES.md instructions.');
          }
          return response.json();
        })
        .then(product => {
          // Find variant matching exact total price (in cents)
          const targetPriceCents = Math.round(totalPrice * 100);

          // Try to find exact match first
          let selectedVariant = product.variants.find(v => v.price === targetPriceCents);

          // If no exact match, find closest variant
          if (!selectedVariant && product.variants.length > 0) {
            selectedVariant = product.variants.reduce((closest, variant) => {
              const currentDiff = Math.abs(variant.price - targetPriceCents);
              const closestDiff = Math.abs(closest.price - targetPriceCents);
              return currentDiff < closestDiff ? variant : closest;
            });
          }

          if (!selectedVariant) {
            throw new Error('No suitable price variant found. Please ensure Custom Design Product has 100 price variants.');
          }

          // Build comprehensive line item properties
          const customProperties = {
            '_title': `${customization.cup.title} (Custom Design)`,  // Display name in cart
            'Product': customization.cup.title,
            'Product Type': 'Custom Cup',
            'Base Price': `$${customization.cupPrice.toFixed(2)}`,
            'Wrap Designs': customization.selectedWraps.map(w => w.title).join(', '),
            'Wrap Cost': `$${wrapTotal.toFixed(2)}`,
            'Style & Colors': customization.selectedStyles.map(s => s.title).join(', '),
            'Style Cost': `$${styleTotal.toFixed(2)}`,
            'Watch on TikTok Live': customization.tiktokLive === 'yes' ? 'Yes' : 'No',
            'Exact Total': `$${totalPrice.toFixed(2)}`,
            'Charged Amount': `$${(selectedVariant.price / 100).toFixed(2)}`,
            '_product_image': customization.cup.image || '',
            '_product_handle': customization.cup.handle || ''
          };

          // Add to cart with exact price variant
          return fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: selectedVariant.id,
              quantity: 1,
              properties: customProperties
            })
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add to cart');
          }
          return response.json();
        })
        .then(cartData => {
          return cartData;
        })
        .then(data => {
          showNotification('✓ Custom cup added to cart!');

          // Update cart count
          updateCartCount();

          // Trigger cart updated event
          document.dispatchEvent(new CustomEvent('cart:updated'));

          // Reset button
          checkoutBtn.disabled = false;
          checkoutBtn.textContent = 'Add to Cart';

          // Redirect to cart after delay
          setTimeout(() => {
            window.location.href = '/cart';
          }, 1500);
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          showNotification('Error: ' + error.message + '. Please try again.');

          // Reset button
          checkoutBtn.disabled = false;
          checkoutBtn.textContent = 'Add to Cart';
        });
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

  function showNotification(message) {
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
