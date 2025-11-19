/**
 * Wrap Product Data
 * Contains wrap categories only - products are loaded from Shopify
 * Each wrap category will have its own products added via Theme Editor
 */

const wrapProductCategories = [
  { id: 'all', name: 'All Wraps', icon: '🎨' },
  { id: 'quotes-adult', name: 'Quotes m/Adult', icon: '💬' },
  { id: 'mum', name: 'Mum', icon: '💝' },
  { id: 'skulls', name: 'Skulls', icon: '💀' },
  { id: 'lollies-sweets', name: 'Lollies/Sweets', icon: '🍬' },
  { id: 'evil-eye', name: 'Evil Eye', icon: '🧿' },
  { id: 'tattoo-girls', name: 'Tattoo Girls', icon: '👩' },
  { id: 'bows', name: 'Bows', icon: '🎀' },
  { id: 'butterfly-flowers', name: 'Butterfly/Flowers', icon: '🦋' },
  { id: 'drink', name: 'Drink', icon: '☕' },
  { id: 'horror-halloween', name: 'Horror/Halloween', icon: '🎃' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'winnie-pooh', name: 'Winnie the Pooh', icon: '🍯' },
  { id: 'animals-insects', name: 'Animals/Insects', icon: '🦁' },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { id: 'occasions', name: 'Occasions', icon: '🎉' },
  { id: 'sea', name: 'Sea', icon: '🌊' },
  { id: 'fruit-veg', name: 'Fruit/Veg', icon: '🍎' },
  { id: 'autism', name: 'Autism', icon: '🧩' },
  { id: 'other', name: 'Other', icon: '✨' }
];

// Helper function to get category by ID
function getWrapCategoryById(categoryId) {
  return wrapProductCategories.find(cat => cat.id === categoryId);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { wrapProductCategories, getWrapCategoryById };
}
