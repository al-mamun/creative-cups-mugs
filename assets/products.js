// Product Data for Demo
const products = [
  {
    id: 1,
    title: "Ceramic Coffee Mug Set",
    price: 48.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.8,
    reviews: 124,
    tags: ["bestseller", "trending"],
  },
  {
    id: 2,
    title: "Insulated Water Bottle",
    price: 32.0,
    originalPrice: 40.0,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.9,
    reviews: 89,
    tags: ["trending", "eco-friendly"],
  },
  {
    id: 3,
    title: "Luxury Soy Candle",
    price: 28.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop&q=80",
    category: "candles",
    rating: 4.7,
    reviews: 156,
    tags: ["bestseller"],
  },
  {
    id: 4,
    title: "Modern Ceramic Vase",
    price: 65.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.6,
    reviews: 78,
    tags: ["new", "trending"],
  },
  {
    id: 5,
    title: "Handcrafted Tea Cup",
    price: 24.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop&q=80",
    category: "mugs",
    rating: 4.8,
    reviews: 92,
    tags: ["handmade"],
  },
  {
    id: 6,
    title: "Essential Oil Diffuser",
    price: 85.0,
    originalPrice: 95.0,
    image:
      "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&h=400&fit=crop",
    category: "candles",
    rating: 4.5,
    reviews: 203,
    tags: ["bestseller", "wellness"],
  },
  {
    id: 7,
    title: "Bamboo Travel Mug",
    price: 22.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.4,
    reviews: 67,
    tags: ["eco-friendly", "travel"],
  },
  {
    id: 8,
    title: "Glass Water Bottle",
    price: 18.0,
    originalPrice: 25.0,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.6,
    reviews: 145,
    tags: ["trending", "glass"],
  },
  {
    id: 9,
    title: "Minimalist Vase Collection",
    price: 120.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.9,
    reviews: 34,
    tags: ["premium", "set"],
  },
  {
    id: 10,
    title: "Aromatherapy Candle Set",
    price: 45.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop",
    category: "candles",
    rating: 4.7,
    reviews: 178,
    tags: ["set", "aromatherapy"],
  },
  {
    id: 11,
    title: "Stainless Steel Tumbler",
    price: 35.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.8,
    reviews: 112,
    tags: ["insulated", "durable"],
  },
  {
    id: 12,
    title: "Elegant Glass Vase",
    price: 38.0,
    originalPrice: 45.0,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.5,
    reviews: 85,
    tags: ["elegant", "glass"],
  },
  {
    id: 13,
    title: "Premium Travel Mug",
    price: 42.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.9,
    reviews: 203,
    tags: ["trending", "travel", "premium"],
  },
  {
    id: 14,
    title: "Artisan Ceramic Bowl Set",
    price: 56.0,
    originalPrice: 68.0,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
    category: "kitchen",
    rating: 4.7,
    reviews: 142,
    tags: ["trending", "handmade", "set"],
  },
  {
    id: 15,
    title: "Smart Temperature Bottle",
    price: 89.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.8,
    reviews: 167,
    tags: ["trending", "smart", "tech"],
  },
  {
    id: 16,
    title: "Vintage Style Tea Set",
    price: 78.0,
    originalPrice: 95.0,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.6,
    reviews: 89,
    tags: ["trending", "vintage", "set"],
  },
  {
    id: 17,
    title: "Modern Plant Pot Collection",
    price: 65.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.8,
    reviews: 134,
    tags: ["trending", "plants", "modern"],
  },
  {
    id: 18,
    title: "Luxury Scented Candle Trio",
    price: 72.0,
    originalPrice: 85.0,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop",
    category: "candles",
    rating: 4.9,
    reviews: 198,
    tags: ["trending", "luxury", "set"],
  },
  {
    id: 19,
    title: "Copper Moscow Mule Mugs",
    price: 59.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.7,
    reviews: 156,
    tags: ["trending", "copper", "cocktail"],
  },
  {
    id: 20,
    title: "Bamboo Fiber Tumbler Set",
    price: 34.0,
    originalPrice: 42.0,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.6,
    reviews: 123,
    tags: ["trending", "eco-friendly", "bamboo"],
  },
  {
    id: 21,
    title: "Classic Coffee Mug",
    price: 22.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.9,
    reviews: 345,
    tags: ["bestseller", "classic"],
  },
  {
    id: 22,
    title: "Premium Water Bottle",
    price: 45.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.8,
    reviews: 278,
    tags: ["bestseller", "premium"],
  },
  {
    id: 23,
    title: "Essential Candle Collection",
    price: 38.0,
    originalPrice: 45.0,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80",
    category: "candles",
    rating: 4.7,
    reviews: 234,
    tags: ["bestseller", "collection"],
  },
  {
    id: 24,
    title: "Designer Ceramic Vase",
    price: 68.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.8,
    reviews: 187,
    tags: ["bestseller", "designer"],
  },
  {
    id: 25,
    title: "Travel Coffee Set",
    price: 52.0,
    originalPrice: 62.0,
    image:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.9,
    reviews: 312,
    tags: ["bestseller", "travel", "set"],
  },
  {
    id: 26,
    title: "Kitchen Essential Set",
    price: 85.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
    category: "kitchen",
    rating: 4.8,
    reviews: 198,
    tags: ["bestseller", "kitchen", "set"],
  },
  {
    id: 27,
    title: "Artisan Coffee Mug",
    price: 36.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "mugs",
    rating: 4.9,
    reviews: 267,
    tags: ["bestseller", "artisan", "handmade"],
  },
  {
    id: 28,
    title: "Stainless Steel Water Bottle",
    price: 39.0,
    originalPrice: 48.0,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "bottles",
    rating: 4.8,
    reviews: 321,
    tags: ["bestseller", "insulated", "durable"],
  },
  {
    id: 29,
    title: "Decorative Candle Holder Set",
    price: 54.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop&q=80",
    category: "candles",
    rating: 4.7,
    reviews: 189,
    tags: ["bestseller", "decorative", "set"],
  },
  {
    id: 30,
    title: "Contemporary Glass Vase",
    price: 72.0,
    originalPrice: 85.0,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop",
    category: "vases",
    rating: 4.9,
    reviews: 214,
    tags: ["bestseller", "contemporary", "glass"],
  },
];

// Get products by category
function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

// Get products by tag
function getProductsByTag(tag) {
  return products.filter((product) => product.tags.includes(tag));
}

// Get trending products
function getTrendingProducts(limit = 12) {
  return products
    .filter((product) => product.tags.includes("trending"))
    .slice(0, limit);
}

// Get bestsellers
function getBestsellerProducts(limit = 12) {
  return products
    .filter((product) => product.tags.includes("bestseller"))
    .slice(0, limit);
}

// Get product by ID
function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

// Get random products
function getRandomProducts(limit = 8) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let html = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    html += `
      <svg class="product-card__star" width="12" height="12" fill="currentColor">
        <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L1 5l3.5-.5L6 1z"/>
      </svg>
    `;
  }

  // Half star
  if (hasHalfStar) {
    html += `
      <svg class="product-card__star" width="12" height="12" fill="currentColor">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="var(--color-neutral-300)"/>
          </linearGradient>
        </defs>
        <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L1 5l3.5-.5L6 1z" fill="url(#half-fill)"/>
      </svg>
    `;
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += `
      <svg class="product-card__star product-card__star--empty" width="12" height="12" fill="currentColor">
        <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L1 5l3.5-.5L6 1z"/>
      </svg>
    `;
  }

  return html;
}

// Category page filter and sort functionality
if (document.getElementById("products-grid")) {
  // Sample product data for category page
  const categoryProducts = [
    {
      id: 1,
      name: "Ceramic Coffee Mug Set",
      category: "Ceramic",
      price: 48,
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      badge: "New",
    },
    {
      id: 2,
      name: "Modern Ceramic Mug",
      category: "Ceramic",
      price: 42,
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 3,
      name: "Stainless Steel Travel Mug",
      category: "Stainless Steel",
      price: 35,
      originalPrice: 45,
      rating: 5.0,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
      badge: "Sale",
    },
    {
      id: 4,
      name: "Glass Tea Cup Set",
      category: "Glass",
      price: 28,
      rating: 4.7,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 5,
      name: "Minimalist Coffee Mug",
      category: "Ceramic",
      price: 38,
      rating: 4.8,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      badge: "New",
    },
    {
      id: 6,
      name: "Handcrafted Ceramic Mug",
      category: "Ceramic",
      price: 52,
      rating: 4.9,
      reviews: 142,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 7,
      name: "Vintage Style Mug",
      category: "Ceramic",
      price: 32,
      rating: 4.6,
      reviews: 98,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 8,
      name: "Eco-Friendly Bamboo Mug",
      category: "Travel Mugs",
      price: 29,
      originalPrice: 38,
      rating: 4.8,
      reviews: 176,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      badge: "Sale",
    },
    {
      id: 9,
      name: "Double Wall Glass Mug",
      category: "Glass",
      price: 45,
      rating: 4.9,
      reviews: 221,
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 10,
      name: "Insulated Coffee Tumbler",
      category: "Travel Mugs",
      price: 55,
      rating: 5.0,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 11,
      name: "Designer Coffee Mug",
      category: "Ceramic",
      price: 46,
      rating: 4.7,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 12,
      name: "Artisan Pottery Mug",
      category: "Ceramic",
      price: 58,
      rating: 4.9,
      reviews: 87,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
      badge: "New",
    },
    {
      id: 13,
      name: "Travel Coffee Mug",
      category: "Travel Mugs",
      price: 36,
      rating: 4.5,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 14,
      name: "Stainless Steel Tumbler",
      category: "Stainless Steel",
      price: 44,
      rating: 4.8,
      reviews: 198,
      image:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
      badge: null,
    },
    {
      id: 15,
      name: "Porcelain Tea Mug",
      category: "Ceramic",
      price: 34,
      rating: 4.6,
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
      badge: null,
    },
  ];

  let currentFilter = "All";
  let currentSort = "featured";

  function renderProducts(productsToRender) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    productsToRender.forEach((product) => {
      const productCard = `
        <div class="product-card">
          ${
            product.badge
              ? `<span class="product-card__badge">${product.badge}</span>`
              : ""
          }
          <div class="product-card__image">
            <img src="${product.image}" alt="${product.name}" />
            <button class="product-card__wishlist">
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <div class="product-card__content">
            <div class="product-card__category">${product.category}</div>
            <h3 class="product-card__title">${product.name}</h3>
            <div class="product-card__rating">
              <div class="product-card__stars">
                ${generateStars(product.rating)}
              </div>
              <span class="product-card__rating-text">${product.rating} (${
        product.reviews
      })</span>
            </div>
            <div class="product-card__price">
              $${product.price.toFixed(2)}
              ${
                product.originalPrice
                  ? `<span class="product-card__price--original">$${product.originalPrice.toFixed(
                      2
                    )}</span>`
                  : ""
              }
            </div>
            <div class="product-card__actions">
              <button class="product-card__add-to-cart" data-product-id="${
                product.id
              }">Add to Cart</button>
              <button class="product-card__quick-view" data-product-id="${
                product.id
              }" title="Quick View">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      grid.innerHTML += productCard;
    });
  }

  function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += `
        <svg class="product-card__star" fill="currentColor">
          <path d="M8 1l2 4 4.5.7-3.3 3.2.8 4.6L8 11l-4 2.5.8-4.6L1.5 5.7 6 5l2-4z" />
        </svg>
      `;
    }
    return stars;
  }

  function filterProducts() {
    let filtered = categoryProducts;

    if (currentFilter !== "All") {
      filtered = categoryProducts.filter((p) => p.category === currentFilter);
    }

    return sortProducts(filtered);
  }

  function sortProducts(products) {
    let sorted = [...products];

    switch (currentSort) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - keep original order
        break;
    }

    return sorted;
  }

  // Filter button handlers
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.textContent.trim();
      renderProducts(filterProducts());
    });
  });

  // Sort handler
  const sortSelect = document.getElementById("sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      currentSort = this.value;
      renderProducts(filterProducts());
    });
  }

  // Add to cart and quick view event handlers
  function attachProductHandlers() {
    // Add to cart buttons
    document.querySelectorAll(".product-card__add-to-cart").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const productId = this.getAttribute("data-product-id");
        console.log("Add to cart:", productId);
        // Add to cart functionality here
      });
    });

    // Quick view buttons
    document.querySelectorAll(".product-card__quick-view").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const productId = this.getAttribute("data-product-id");
        showQuickView(productId);
      });
    });
  }

  // Update render function to attach handlers
  const originalRenderProducts = renderProducts;
  renderProducts = function (productsToRender) {
    originalRenderProducts(productsToRender);
    attachProductHandlers();
  };

  // Initial render
  renderProducts(filterProducts());
}

// Quick view modal functionality
function showQuickView(productId) {
  const product = getProductById(parseInt(productId));
  if (!product) return;

  // Populate modal with product data
  const modal = document.getElementById("quick-view-modal");
  const image = document.getElementById("quick-view-image");
  const title = document.getElementById("quick-view-title");
  const category = document.getElementById("quick-view-category");
  const rating = document.getElementById("quick-view-rating");
  const reviews = document.getElementById("quick-view-reviews");
  const price = document.getElementById("quick-view-price");
  const originalPrice = document.getElementById("quick-view-original-price");
  const description = document.getElementById("quick-view-description");
  const features = document.getElementById("quick-view-features");
  const availability = document.getElementById("quick-view-availability");
  const quantity = document.getElementById("quick-view-quantity");
  const addToCartBtn = document.getElementById("quick-view-add-to-cart");
  const addToWishlistBtn = document.getElementById(
    "quick-view-add-to-wishlist"
  );
  const viewDetailsBtn = document.getElementById("quick-view-view-details");

  if (image) {
    image.src = product.image;
    image.alt = product.title;
  }
  if (title) title.textContent = product.title;
  if (category)
    category.textContent =
      product.category.charAt(0).toUpperCase() + product.category.slice(1);
  if (rating) rating.innerHTML = generateStarRating(product.rating);
  if (reviews) reviews.textContent = `(${product.reviews} reviews)`;
  if (price) price.textContent = formatPrice(product.price);
  if (originalPrice) {
    if (product.originalPrice) {
      originalPrice.textContent = formatPrice(product.originalPrice);
      originalPrice.style.display = "inline";
    } else {
      originalPrice.style.display = "none";
    }
  }

  // Enhanced description based on product category
  const descriptions = {
    mugs: "This premium ceramic mug features a comfortable handle and smooth glazed finish. Perfect for your morning coffee or afternoon tea, it maintains heat beautifully and adds elegance to your daily routine.",
    bottles:
      "Designed for active lifestyles, this insulated bottle keeps your beverages at the perfect temperature for hours. Made with durable, eco-friendly materials that are perfect for travel and outdoor activities.",
    candles:
      "Hand-poured with premium soy wax and essential oils, this candle creates a warm, inviting atmosphere. Each scent is carefully crafted to provide a luxurious sensory experience.",
    vases:
      "This elegant vase combines timeless design with premium craftsmanship. Perfect for fresh flowers or as a standalone decorative piece that enhances any room's aesthetic.",
    kitchen:
      "Essential kitchenware designed for both functionality and style. Made from high-quality materials that are durable, easy to clean, and perfect for everyday use.",
  };

  if (description) {
    description.textContent =
      descriptions[product.category] ||
      "This beautifully crafted product combines functionality with elegant design. Perfect for everyday use or as a thoughtful gift.";
  }

  // Product features based on tags
  if (features) {
    let featuresHTML = "";
    if (product.tags.includes("bestseller")) {
      featuresHTML +=
        '<div class="feature-item"><span class="feature-icon">🏆</span><span>Customer Favorite</span></div>';
    }
    if (product.tags.includes("eco-friendly")) {
      featuresHTML +=
        '<div class="feature-item"><span class="feature-icon">🌱</span><span>Eco-Friendly</span></div>';
    }
    if (product.tags.includes("handmade")) {
      featuresHTML +=
        '<div class="feature-item"><span class="feature-icon">✨</span><span>Handcrafted</span></div>';
    }
    if (product.tags.includes("insulated")) {
      featuresHTML +=
        '<div class="feature-item"><span class="feature-icon">🧊</span><span>Temperature Control</span></div>';
    }
    if (product.tags.includes("travel")) {
      featuresHTML +=
        '<div class="feature-item"><span class="feature-icon">✈️</span><span>Travel Ready</span></div>';
    }
    features.innerHTML =
      featuresHTML ||
      '<div class="feature-item"><span class="feature-icon">✓</span><span>Premium Quality</span></div>';
  }

  if (availability) availability.textContent = "In Stock";

  if (quantity) quantity.value = 1;

  // Show modal
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal functionality
  const closeBtn = document.getElementById("quick-view-close");
  const overlay = document.querySelector(".quick-view-modal__overlay");

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Add to cart from modal
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const qty = parseInt(quantity.value) || 1;
      console.log(`Adding ${qty} of product ${productId} to cart`);
      showNotification(`${product.title} added to cart!`);
      closeModal();
    });
  }

  // Add to wishlist from modal
  if (addToWishlistBtn) {
    addToWishlistBtn.addEventListener("click", () => {
      console.log(`Adding product ${productId} to wishlist`);
      showNotification(`${product.title} added to wishlist!`);
    });
  }

  // View full details
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener("click", () => {
      closeModal();
      // Navigate to product page
      window.location.href = `pages/product.html?id=${productId}`;
    });
  }

  // Quantity controls
  const decreaseBtn = document.getElementById("quick-view-decrease");
  const increaseBtn = document.getElementById("quick-view-increase");

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      const currentValue = parseInt(quantity.value);
      if (currentValue > 1) {
        quantity.value = currentValue - 1;
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      const currentValue = parseInt(quantity.value);
      if (currentValue < 10) {
        quantity.value = currentValue + 1;
      }
    });
  }
}

// Notification function
function showNotification(message) {
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

// Make functions and data globally available for other scripts
window.products = products;
window.getProductsByCategory = getProductsByCategory;
window.getProductsByTag = getProductsByTag;
window.getTrendingProducts = getTrendingProducts;
window.getBestsellerProducts = getBestsellerProducts;
window.getProductById = getProductById;
window.getRandomProducts = getRandomProducts;
window.formatPrice = formatPrice;
window.generateStarRating = generateStarRating;
window.showQuickView = showQuickView;
