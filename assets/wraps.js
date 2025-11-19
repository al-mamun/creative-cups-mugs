/**
 * Wrap Design Data
 * Contains all available wrap designs organized by categories
 * Each wrap has: id, name, category, image path, and price modifier
 */

const wrapCategories = [
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

// Wrap designs data structure
// NOTE: Replace placeholder image paths with your actual wrap design images
const wrapsData = [
  // Quotes m/Adult
  {
    id: 'wrap-001',
    name: 'Motivational Quote',
    category: 'quotes-adult',
    image: '../images/wraps/quotes-adult/motivational-01.jpg',
    price: 5.00,
    description: 'Inspirational motivational text design'
  },
  {
    id: 'wrap-002',
    name: 'Funny Adult Humor',
    category: 'quotes-adult',
    image: '../images/wraps/quotes-adult/funny-01.jpg',
    price: 5.00,
    description: 'Witty and funny quote for adults'
  },
  {
    id: 'wrap-003',
    name: 'Coffee Lover Quote',
    category: 'quotes-adult',
    image: '../images/wraps/quotes-adult/coffee-quote-01.jpg',
    price: 5.00,
    description: 'For coffee enthusiasts'
  },

  // Mum
  {
    id: 'wrap-101',
    name: 'Best Mum Ever',
    category: 'mum',
    image: '../images/wraps/mum/best-mum-01.jpg',
    price: 5.00,
    description: 'Celebrating amazing mums'
  },
  {
    id: 'wrap-102',
    name: 'Mum Life',
    category: 'mum',
    image: '../images/wraps/mum/mum-life-01.jpg',
    price: 5.00,
    description: 'Mother life themed design'
  },
  {
    id: 'wrap-103',
    name: 'Floral Mum',
    category: 'mum',
    image: '../images/wraps/mum/floral-mum-01.jpg',
    price: 5.00,
    description: 'Floral design for mothers'
  },

  // Skulls
  {
    id: 'wrap-201',
    name: 'Sugar Skull',
    category: 'skulls',
    image: '../images/wraps/skulls/sugar-skull-01.jpg',
    price: 5.00,
    description: 'Colorful Day of the Dead skull'
  },
  {
    id: 'wrap-202',
    name: 'Gothic Skull',
    category: 'skulls',
    image: '../images/wraps/skulls/gothic-skull-01.jpg',
    price: 5.00,
    description: 'Dark gothic skull design'
  },
  {
    id: 'wrap-203',
    name: 'Floral Skull',
    category: 'skulls',
    image: '../images/wraps/skulls/floral-skull-01.jpg',
    price: 5.00,
    description: 'Skull with flower patterns'
  },

  // Lollies/Sweets
  {
    id: 'wrap-301',
    name: 'Candy Mix',
    category: 'lollies-sweets',
    image: '../images/wraps/lollies-sweets/candy-mix-01.jpg',
    price: 5.00,
    description: 'Colorful candy assortment'
  },
  {
    id: 'wrap-302',
    name: 'Lollipops',
    category: 'lollies-sweets',
    image: '../images/wraps/lollies-sweets/lollipops-01.jpg',
    price: 5.00,
    description: 'Sweet lollipop designs'
  },
  {
    id: 'wrap-303',
    name: 'Gummy Bears',
    category: 'lollies-sweets',
    image: '../images/wraps/lollies-sweets/gummy-bears-01.jpg',
    price: 5.00,
    description: 'Cute gummy bear pattern'
  },

  // Evil Eye
  {
    id: 'wrap-401',
    name: 'Classic Evil Eye',
    category: 'evil-eye',
    image: '../images/wraps/evil-eye/classic-01.jpg',
    price: 5.00,
    description: 'Traditional evil eye protection'
  },
  {
    id: 'wrap-402',
    name: 'Blue Evil Eye Pattern',
    category: 'evil-eye',
    image: '../images/wraps/evil-eye/blue-pattern-01.jpg',
    price: 5.00,
    description: 'Multiple blue evil eyes'
  },
  {
    id: 'wrap-403',
    name: 'Modern Evil Eye',
    category: 'evil-eye',
    image: '../images/wraps/evil-eye/modern-01.jpg',
    price: 5.00,
    description: 'Contemporary evil eye design'
  },

  // Tattoo Girls
  {
    id: 'wrap-501',
    name: 'Vintage Pin-Up',
    category: 'tattoo-girls',
    image: '../images/wraps/tattoo-girls/pinup-01.jpg',
    price: 5.00,
    description: 'Classic pin-up girl tattoo style'
  },
  {
    id: 'wrap-502',
    name: 'Rockabilly Girl',
    category: 'tattoo-girls',
    image: '../images/wraps/tattoo-girls/rockabilly-01.jpg',
    price: 5.00,
    description: 'Retro rockabilly design'
  },
  {
    id: 'wrap-503',
    name: 'Gypsy Woman',
    category: 'tattoo-girls',
    image: '../images/wraps/tattoo-girls/gypsy-01.jpg',
    price: 5.00,
    description: 'Mystical gypsy girl tattoo'
  },

  // Bows
  {
    id: 'wrap-601',
    name: 'Pink Bow Pattern',
    category: 'bows',
    image: '../images/wraps/bows/pink-bow-01.jpg',
    price: 5.00,
    description: 'Cute pink bows design'
  },
  {
    id: 'wrap-602',
    name: 'Ribbon Collection',
    category: 'bows',
    image: '../images/wraps/bows/ribbons-01.jpg',
    price: 5.00,
    description: 'Various ribbon styles'
  },
  {
    id: 'wrap-603',
    name: 'Glitter Bows',
    category: 'bows',
    image: '../images/wraps/bows/glitter-bows-01.jpg',
    price: 5.00,
    description: 'Sparkly bow design'
  },

  // Butterfly/Flowers
  {
    id: 'wrap-701',
    name: 'Butterfly Garden',
    category: 'butterfly-flowers',
    image: '../images/wraps/butterfly-flowers/butterfly-garden-01.jpg',
    price: 5.00,
    description: 'Butterflies with flowers'
  },
  {
    id: 'wrap-702',
    name: 'Wildflowers',
    category: 'butterfly-flowers',
    image: '../images/wraps/butterfly-flowers/wildflowers-01.jpg',
    price: 5.00,
    description: 'Beautiful wildflower pattern'
  },
  {
    id: 'wrap-703',
    name: 'Rose Garden',
    category: 'butterfly-flowers',
    image: '../images/wraps/butterfly-flowers/roses-01.jpg',
    price: 5.00,
    description: 'Elegant rose design'
  },
  {
    id: 'wrap-704',
    name: 'Monarch Butterflies',
    category: 'butterfly-flowers',
    image: '../images/wraps/butterfly-flowers/monarch-01.jpg',
    price: 5.00,
    description: 'Orange monarch butterflies'
  },

  // Drink
  {
    id: 'wrap-801',
    name: 'Coffee Vibes',
    category: 'drink',
    image: '../images/wraps/drink/coffee-vibes-01.jpg',
    price: 5.00,
    description: 'Coffee theme design'
  },
  {
    id: 'wrap-802',
    name: 'Wine Time',
    category: 'drink',
    image: '../images/wraps/drink/wine-time-01.jpg',
    price: 5.00,
    description: 'Wine lover design'
  },
  {
    id: 'wrap-803',
    name: 'Cocktail Hour',
    category: 'drink',
    image: '../images/wraps/drink/cocktail-01.jpg',
    price: 5.00,
    description: 'Cocktail themed wrap'
  },

  // Horror/Halloween
  {
    id: 'wrap-901',
    name: 'Spooky Ghosts',
    category: 'horror-halloween',
    image: '../images/wraps/horror-halloween/ghosts-01.jpg',
    price: 5.00,
    description: 'Cute spooky ghosts'
  },
  {
    id: 'wrap-902',
    name: 'Pumpkin Patch',
    category: 'horror-halloween',
    image: '../images/wraps/horror-halloween/pumpkins-01.jpg',
    price: 5.00,
    description: 'Halloween pumpkins'
  },
  {
    id: 'wrap-903',
    name: 'Horror Movie',
    category: 'horror-halloween',
    image: '../images/wraps/horror-halloween/horror-01.jpg',
    price: 5.00,
    description: 'Classic horror theme'
  },

  // Christmas
  {
    id: 'wrap-1001',
    name: 'Santa & Snowflakes',
    category: 'christmas',
    image: '../images/wraps/christmas/santa-01.jpg',
    price: 5.00,
    description: 'Santa with snowflakes'
  },
  {
    id: 'wrap-1002',
    name: 'Christmas Trees',
    category: 'christmas',
    image: '../images/wraps/christmas/trees-01.jpg',
    price: 5.00,
    description: 'Festive Christmas trees'
  },
  {
    id: 'wrap-1003',
    name: 'Winter Wonderland',
    category: 'christmas',
    image: '../images/wraps/christmas/winter-01.jpg',
    price: 5.00,
    description: 'Winter holiday scene'
  },

  // Winnie the Pooh
  {
    id: 'wrap-1101',
    name: 'Pooh & Friends',
    category: 'winnie-pooh',
    image: '../images/wraps/winnie-pooh/pooh-friends-01.jpg',
    price: 5.00,
    description: 'Winnie and companions'
  },
  {
    id: 'wrap-1102',
    name: 'Hundred Acre Wood',
    category: 'winnie-pooh',
    image: '../images/wraps/winnie-pooh/hundred-acre-01.jpg',
    price: 5.00,
    description: 'Hundred Acre Wood scene'
  },
  {
    id: 'wrap-1103',
    name: 'Honey Pot',
    category: 'winnie-pooh',
    image: '../images/wraps/winnie-pooh/honey-pot-01.jpg',
    price: 5.00,
    description: 'Pooh with honey pots'
  },

  // Animals/Insects
  {
    id: 'wrap-1201',
    name: 'Safari Animals',
    category: 'animals-insects',
    image: '../images/wraps/animals-insects/safari-01.jpg',
    price: 5.00,
    description: 'African safari animals'
  },
  {
    id: 'wrap-1202',
    name: 'Cute Puppies',
    category: 'animals-insects',
    image: '../images/wraps/animals-insects/puppies-01.jpg',
    price: 5.00,
    description: 'Adorable puppy designs'
  },
  {
    id: 'wrap-1203',
    name: 'Ladybugs',
    category: 'animals-insects',
    image: '../images/wraps/animals-insects/ladybugs-01.jpg',
    price: 5.00,
    description: 'Cute ladybug pattern'
  },
  {
    id: 'wrap-1204',
    name: 'Jungle Animals',
    category: 'animals-insects',
    image: '../images/wraps/animals-insects/jungle-01.jpg',
    price: 5.00,
    description: 'Tropical jungle creatures'
  },

  // Vehicles
  {
    id: 'wrap-1301',
    name: 'Classic Cars',
    category: 'vehicles',
    image: '../images/wraps/vehicles/classic-cars-01.jpg',
    price: 5.00,
    description: 'Vintage car collection'
  },
  {
    id: 'wrap-1302',
    name: 'Motorcycles',
    category: 'vehicles',
    image: '../images/wraps/vehicles/motorcycles-01.jpg',
    price: 5.00,
    description: 'Cool motorcycle designs'
  },
  {
    id: 'wrap-1303',
    name: 'Fire Trucks',
    category: 'vehicles',
    image: '../images/wraps/vehicles/fire-trucks-01.jpg',
    price: 5.00,
    description: 'Fire truck pattern'
  },

  // Occasions
  {
    id: 'wrap-1401',
    name: 'Birthday Party',
    category: 'occasions',
    image: '../images/wraps/occasions/birthday-01.jpg',
    price: 5.00,
    description: 'Birthday celebration theme'
  },
  {
    id: 'wrap-1402',
    name: 'Wedding Bliss',
    category: 'occasions',
    image: '../images/wraps/occasions/wedding-01.jpg',
    price: 5.00,
    description: 'Wedding celebration design'
  },
  {
    id: 'wrap-1403',
    name: 'Graduation',
    category: 'occasions',
    image: '../images/wraps/occasions/graduation-01.jpg',
    price: 5.00,
    description: 'Graduation celebration'
  },

  // Sea
  {
    id: 'wrap-1501',
    name: 'Ocean Waves',
    category: 'sea',
    image: '../images/wraps/sea/waves-01.jpg',
    price: 5.00,
    description: 'Beautiful ocean waves'
  },
  {
    id: 'wrap-1502',
    name: 'Tropical Fish',
    category: 'sea',
    image: '../images/wraps/sea/tropical-fish-01.jpg',
    price: 5.00,
    description: 'Colorful tropical fish'
  },
  {
    id: 'wrap-1503',
    name: 'Sea Turtles',
    category: 'sea',
    image: '../images/wraps/sea/turtles-01.jpg',
    price: 5.00,
    description: 'Sea turtle design'
  },

  // Fruit/Veg
  {
    id: 'wrap-1601',
    name: 'Fresh Strawberries',
    category: 'fruit-veg',
    image: '../images/wraps/fruit-veg/strawberries-01.jpg',
    price: 5.00,
    description: 'Sweet strawberry pattern'
  },
  {
    id: 'wrap-1602',
    name: 'Citrus Fruits',
    category: 'fruit-veg',
    image: '../images/wraps/fruit-veg/citrus-01.jpg',
    price: 5.00,
    description: 'Lemon and orange slices'
  },
  {
    id: 'wrap-1603',
    name: 'Veggie Garden',
    category: 'fruit-veg',
    image: '../images/wraps/fruit-veg/veggies-01.jpg',
    price: 5.00,
    description: 'Garden vegetables'
  },

  // Autism
  {
    id: 'wrap-1701',
    name: 'Autism Awareness',
    category: 'autism',
    image: '../images/wraps/autism/awareness-01.jpg',
    price: 5.00,
    description: 'Autism awareness ribbon'
  },
  {
    id: 'wrap-1702',
    name: 'Puzzle Pieces',
    category: 'autism',
    image: '../images/wraps/autism/puzzle-01.jpg',
    price: 5.00,
    description: 'Colorful puzzle piece pattern'
  },
  {
    id: 'wrap-1703',
    name: 'Be Kind Be Different',
    category: 'autism',
    image: '../images/wraps/autism/be-kind-01.jpg',
    price: 5.00,
    description: 'Positive autism message'
  },

  // Other
  {
    id: 'wrap-1801',
    name: 'Geometric Pattern',
    category: 'other',
    image: '../images/wraps/other/geometric-01.jpg',
    price: 5.00,
    description: 'Modern geometric design'
  },
  {
    id: 'wrap-1802',
    name: 'Marble Effect',
    category: 'other',
    image: '../images/wraps/other/marble-01.jpg',
    price: 5.00,
    description: 'Elegant marble pattern'
  },
  {
    id: 'wrap-1803',
    name: 'Rainbow',
    category: 'other',
    image: '../images/wraps/other/rainbow-01.jpg',
    price: 5.00,
    description: 'Colorful rainbow design'
  }
];

// Helper function to get wraps by category
function getWrapsByCategory(categoryId) {
  if (categoryId === 'all') {
    return wrapsData;
  }
  return wrapsData.filter(wrap => wrap.category === categoryId);
}

// Helper function to get wrap by ID
function getWrapById(wrapId) {
  return wrapsData.find(wrap => wrap.id === wrapId);
}

// Helper function to get category by ID
function getCategoryById(categoryId) {
  return wrapCategories.find(cat => cat.id === categoryId);
}
