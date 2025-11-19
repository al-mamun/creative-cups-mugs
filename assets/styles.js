/**
 * Style Images Data
 * Contains all available style/color options as images
 * Each style option has: id, name, category, image path
 */

const styleCategories = [
  { id: 'glitter', name: 'Glitter', icon: '✨', maxSelect: 5 },
  { id: 'lava', name: 'LAVA', icon: '🌋', maxSelect: 2 },
  { id: 'drink', name: 'Drink / Milk', icon: '☕', maxSelect: 1 },
  { id: 'honey', name: 'Honey Drip', icon: '🍯', maxSelect: 1 }
];

// Style images data structure
// NOTE: Replace placeholder image paths with your actual style texture images
const stylesData = [
  // ==================
  // GLITTER STYLES (Max 5)
  // ==================
  {
    id: 'glitter-001',
    name: 'Gold Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/gold-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/gold-glitter-thumb.jpg',
    description: 'Sparkling gold glitter effect'
  },
  {
    id: 'glitter-002',
    name: 'Silver Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/silver-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/silver-glitter-thumb.jpg',
    description: 'Shimmering silver glitter'
  },
  {
    id: 'glitter-003',
    name: 'Pink Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/pink-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/pink-glitter-thumb.jpg',
    description: 'Hot pink sparkle glitter'
  },
  {
    id: 'glitter-004',
    name: 'Purple Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/purple-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/purple-glitter-thumb.jpg',
    description: 'Royal purple glitter shine'
  },
  {
    id: 'glitter-005',
    name: 'Blue Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/blue-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/blue-glitter-thumb.jpg',
    description: 'Ocean blue glitter sparkle'
  },
  {
    id: 'glitter-006',
    name: 'Turquoise Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/turquoise-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/turquoise-glitter-thumb.jpg',
    description: 'Tropical turquoise glitter'
  },
  {
    id: 'glitter-007',
    name: 'Green Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/green-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/green-glitter-thumb.jpg',
    description: 'Emerald green sparkle'
  },
  {
    id: 'glitter-008',
    name: 'Orange Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/orange-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/orange-glitter-thumb.jpg',
    description: 'Vibrant orange glitter'
  },
  {
    id: 'glitter-009',
    name: 'Rose Gold Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/rose-gold-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/rose-gold-glitter-thumb.jpg',
    description: 'Elegant rose gold sparkle'
  },
  {
    id: 'glitter-010',
    name: 'Rainbow Glitter',
    category: 'glitter',
    image: '../images/styles/glitter/rainbow-glitter.jpg',
    thumbnail: '../images/styles/glitter/thumbs/rainbow-glitter-thumb.jpg',
    description: 'Multicolor rainbow glitter'
  },

  // ==================
  // LAVA STYLES (Max 2)
  // ==================
  {
    id: 'lava-001',
    name: 'Red Lava',
    category: 'lava',
    image: '../images/styles/lava/red-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/red-lava-thumb.jpg',
    description: 'Flowing red lava effect'
  },
  {
    id: 'lava-002',
    name: 'Orange Lava',
    category: 'lava',
    image: '../images/styles/lava/orange-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/orange-lava-thumb.jpg',
    description: 'Bright orange molten lava'
  },
  {
    id: 'lava-003',
    name: 'Gold Lava',
    category: 'lava',
    image: '../images/styles/lava/gold-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/gold-lava-thumb.jpg',
    description: 'Golden lava flow'
  },
  {
    id: 'lava-004',
    name: 'Purple Lava',
    category: 'lava',
    image: '../images/styles/lava/purple-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/purple-lava-thumb.jpg',
    description: 'Mystical purple lava'
  },
  {
    id: 'lava-005',
    name: 'Blue Lava',
    category: 'lava',
    image: '../images/styles/lava/blue-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/blue-lava-thumb.jpg',
    description: 'Cool blue lava flame'
  },
  {
    id: 'lava-006',
    name: 'Green Lava',
    category: 'lava',
    image: '../images/styles/lava/green-lava.jpg',
    thumbnail: '../images/styles/lava/thumbs/green-lava-thumb.jpg',
    description: 'Toxic green lava glow'
  },

  // ==================
  // DRINK / MILK STYLES (Max 1)
  // ==================
  {
    id: 'drink-001',
    name: 'Coffee',
    category: 'drink',
    image: '../images/styles/drink/coffee.jpg',
    thumbnail: '../images/styles/drink/thumbs/coffee-thumb.jpg',
    description: 'Rich dark coffee liquid'
  },
  {
    id: 'drink-002',
    name: 'Latte',
    category: 'drink',
    image: '../images/styles/drink/latte.jpg',
    thumbnail: '../images/styles/drink/thumbs/latte-thumb.jpg',
    description: 'Creamy latte milk coffee'
  },
  {
    id: 'drink-003',
    name: 'Milk',
    category: 'drink',
    image: '../images/styles/drink/milk.jpg',
    thumbnail: '../images/styles/drink/thumbs/milk-thumb.jpg',
    description: 'Pure white milk'
  },
  {
    id: 'drink-004',
    name: 'Strawberry Milk',
    category: 'drink',
    image: '../images/styles/drink/strawberry-milk.jpg',
    thumbnail: '../images/styles/drink/thumbs/strawberry-milk-thumb.jpg',
    description: 'Sweet pink strawberry milk'
  },
  {
    id: 'drink-005',
    name: 'Caramel',
    category: 'drink',
    image: '../images/styles/drink/caramel.jpg',
    thumbnail: '../images/styles/drink/thumbs/caramel-thumb.jpg',
    description: 'Smooth caramel liquid'
  },
  {
    id: 'drink-006',
    name: 'Chocolate Milk',
    category: 'drink',
    image: '../images/styles/drink/chocolate-milk.jpg',
    thumbnail: '../images/styles/drink/thumbs/chocolate-milk-thumb.jpg',
    description: 'Rich chocolate milk'
  },
  {
    id: 'drink-007',
    name: 'Matcha Latte',
    category: 'drink',
    image: '../images/styles/drink/matcha-latte.jpg',
    thumbnail: '../images/styles/drink/thumbs/matcha-latte-thumb.jpg',
    description: 'Green matcha tea latte'
  },
  {
    id: 'drink-008',
    name: 'Iced Tea',
    category: 'drink',
    image: '../images/styles/drink/iced-tea.jpg',
    thumbnail: '../images/styles/drink/thumbs/iced-tea-thumb.jpg',
    description: 'Refreshing iced tea'
  },

  // ==================
  // HONEY DRIP STYLES (Max 1)
  // ==================
  {
    id: 'honey-001',
    name: 'Golden Honey',
    category: 'honey',
    image: '../images/styles/honey/golden-honey.jpg',
    thumbnail: '../images/styles/honey/thumbs/golden-honey-thumb.jpg',
    description: 'Classic golden honey drip'
  },
  {
    id: 'honey-002',
    name: 'Amber Honey',
    category: 'honey',
    image: '../images/styles/honey/amber-honey.jpg',
    thumbnail: '../images/styles/honey/thumbs/amber-honey-thumb.jpg',
    description: 'Deep amber honey flow'
  },
  {
    id: 'honey-003',
    name: 'Dark Honey',
    category: 'honey',
    image: '../images/styles/honey/dark-honey.jpg',
    thumbnail: '../images/styles/honey/thumbs/dark-honey-thumb.jpg',
    description: 'Rich dark honey drizzle'
  },
  {
    id: 'honey-004',
    name: 'Chocolate Drip',
    category: 'honey',
    image: '../images/styles/honey/chocolate-drip.jpg',
    thumbnail: '../images/styles/honey/thumbs/chocolate-drip-thumb.jpg',
    description: 'Decadent chocolate sauce drip'
  },
  {
    id: 'honey-005',
    name: 'Berry Drip',
    category: 'honey',
    image: '../images/styles/honey/berry-drip.jpg',
    thumbnail: '../images/styles/honey/thumbs/berry-drip-thumb.jpg',
    description: 'Sweet berry sauce drizzle'
  },
  {
    id: 'honey-006',
    name: 'Caramel Drip',
    category: 'honey',
    image: '../images/styles/honey/caramel-drip.jpg',
    thumbnail: '../images/styles/honey/thumbs/caramel-drip-thumb.jpg',
    description: 'Smooth caramel drip'
  },
  {
    id: 'honey-007',
    name: 'White Chocolate Drip',
    category: 'honey',
    image: '../images/styles/honey/white-chocolate-drip.jpg',
    thumbnail: '../images/styles/honey/thumbs/white-chocolate-drip-thumb.jpg',
    description: 'Creamy white chocolate drizzle'
  },
  {
    id: 'honey-008',
    name: 'Strawberry Drip',
    category: 'honey',
    image: '../images/styles/honey/strawberry-drip.jpg',
    thumbnail: '../images/styles/honey/thumbs/strawberry-drip-thumb.jpg',
    description: 'Pink strawberry sauce drip'
  }
];

// Helper functions
function getStylesByCategory(categoryId) {
  return stylesData.filter(style => style.category === categoryId);
}

function getStyleById(styleId) {
  return stylesData.find(style => style.id === styleId);
}

function getCategoryById(categoryId) {
  return styleCategories.find(cat => cat.id === categoryId);
}

function getMaxSelectForCategory(categoryId) {
  const category = getCategoryById(categoryId);
  return category ? category.maxSelect : 1;
}
