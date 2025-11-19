# Creative Cups & Mugs - Shopify Theme

> A modern, fully-featured Shopify theme for custom cup and mug businesses with advanced product customization capabilities.

![Theme Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Shopify](https://img.shields.io/badge/shopify-compatible-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## 📖 About This Theme

**Creative Cups & Mugs** is a professional, production-ready Shopify theme built from the ground up for businesses selling customizable drinkware products. Whether you're running a custom tumbler shop, personalized mug business, or creative drinkware store, this theme provides everything you need to showcase and sell your products online.

### 🎯 Purpose

This theme was created to solve the unique challenges of selling customizable cup and mug products online:
- **Visual Customization**: Customers need to see what their custom design looks like before purchasing
- **Multiple Options**: Easy selection from hundreds of wrap designs, styles, and textures
- **Mobile Shopping**: Most customers browse on mobile devices, requiring perfect mobile optimization
- **Professional Design**: Stand out with a modern, teal-themed aesthetic that matches drinkware aesthetics

### 💼 Ideal For

- Custom tumbler businesses
- Personalized mug shops
- Print-on-demand drinkware stores
- Small to medium e-commerce businesses
- Entrepreneurs in the custom drinkware industry
- Businesses offering design-your-own product experiences

### 🌟 What Makes It Special

1. **Custom Product Designer**: Built-in interactive designer that lets customers create their perfect cup
2. **60+ Optimizations**: Carefully crafted with 60+ fixes for performance, mobile responsiveness, and user experience
3. **No Third-Party Apps Required**: All customization features built directly into the theme
4. **Mobile-First Design**: Perfect experience on phones, tablets, and desktops
5. **Easy to Customize**: Well-organized code with clear documentation for easy modifications

## 🎨 Theme Overview

Creative Cups & Mugs is a professional Shopify theme designed specifically for businesses selling customizable drinkware. It features a powerful custom designer tool that allows customers to create their own unique cup designs with wraps, styles, and textures.

## ✨ Key Features

### 🎯 Custom Product Designer
- **Interactive Cup Designer**: Real-time preview of cup customizations
- **Wrap & Style System**: Select multiple wrap designs and style options
- **Product Categories**: Organized by categories for easy navigation
- **Optional Customization**: Customers can add to cart with or without customizations
- **Live Preview**: 3D-style preview with rotation capabilities
- **Mobile Responsive**: Fully optimized for mobile devices

### 🛍️ E-commerce Features
- **Dynamic Product Pages**: Rich product information with image galleries
- **Wishlist System**: Save favorite products for later
- **Advanced Filtering**: Filter products by categories, styles, and more
- **Collection Pages**: Beautiful collection grid layouts
- **Quick Add to Cart**: Streamlined checkout process

### 🎨 Design & UI
- **Modern Teal Theme**: Professional color scheme with dark mode support
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Hero Slider**: Eye-catching homepage hero with multiple slides
- **Featured Collections**: Showcase up to 50 collections
- **Custom Icons & Graphics**: Polished visual elements

### 📱 Mobile Optimization
- **Touch-Friendly**: Optimized for mobile interactions
- **Mobile Menu**: Clean, accessible navigation
- **Single Column Layouts**: Optimized for small screens
- **No Horizontal Scroll**: Proper overflow handling
- **Compact Grids**: Efficient use of mobile screen space

## 🚀 Installation

### Prerequisites
- Shopify CLI installed
- Node.js (if using build tools)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creative-cups-mugs
   ```

2. **Connect to your Shopify store**
   ```bash
   shopify theme serve
   ```

3. **Deploy to your store**
   ```bash
   shopify theme push --theme <THEME_ID>
   ```

## 📁 Theme Structure

```
creative-cups-mugs/
├── assets/              # CSS, JS, images, and other static files
│   ├── base.css         # Base styles and variables
│   ├── custom.css       # Custom designer styles
│   ├── custom.js        # Custom designer functionality
│   ├── homepage.css     # Homepage specific styles
│   ├── header.css       # Navigation and header styles
│   ├── shop.css         # Shop page styles
│   ├── product.css      # Product page styles
│   └── main.js          # Main JavaScript functionality
├── config/              # Theme settings
│   └── settings_schema.json
├── layout/              # Theme layouts
│   └── theme.liquid     # Main theme layout
├── locales/             # Translation files
├── sections/            # Reusable sections
│   ├── hero-slider.liquid
│   ├── featured-collections.liquid
│   ├── custom-designer.liquid
│   └── ...
├── snippets/            # Reusable code snippets
├── templates/           # Page templates
│   ├── product.liquid
│   ├── collection.liquid
│   ├── page.wishlist.liquid
│   └── ...
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🎯 Key Sections

### Custom Designer (`sections/custom-designer.liquid`)
The custom cup designer is the centerpiece of this theme:
- Pick from various cup products
- Select wrap designs organized by categories
- Choose styles/textures for customization
- Real-time preview of selections
- Add to cart with customization details

### Featured Collections (`sections/featured-collections.liquid`)
- Display up to 50 collections
- Automatic fallback to product images
- Clickable collection titles
- Responsive grid layout

### Hero Slider (`sections/hero-slider.liquid`)
- Multiple slide support
- Auto-play functionality (disabled for single slides)
- Navigation controls and indicators
- Mobile responsive

## 🛠️ Customization

### Color Scheme
The theme uses a teal color palette with dark mode support. Customize colors in `assets/variables.css`:

```css
--color-primary: #009688;
--color-accent-emerald: #12908e;
--color-accent-teal: #00bcd4;
```

### Custom Designer Settings
Configure the designer in the Shopify theme customizer:
1. Go to Online Store > Themes > Customize
2. Navigate to the Custom Designer section
3. Select collections for wraps and styles
4. Configure step titles and descriptions

### Adding Products
Products should be tagged appropriately:
- `category:quotes` - For wrap categories
- `category:glitter` - For style categories
- Use consistent tagging for filtering

## 📱 Mobile Responsive Features

### Mobile Custom Designer
- Single column layout
- Preview section shows first
- Non-sticky preview (proper scrolling)
- Compact product grids (2 columns)
- Full-width action buttons

### Mobile Menu
- White background with black text
- Teal active states
- Dropdown submenus
- Smooth animations

### Mobile Shop Page
- Responsive filter panel
- No overflow issues
- Touch-friendly controls

## 🎨 Theme Highlights

### Design Philosophy
- **Clean & Modern**: Professional appearance
- **User-Friendly**: Intuitive navigation and interactions
- **Accessible**: WCAG compliant color contrasts
- **Fast Loading**: Optimized assets and lazy loading

### Recent Improvements (60 Fixes)
1. Custom.js script tag fixes
2. Wishlist product matching
3. Mobile header optimization
4. Mobile menu comprehensive fixes
5. Filter panel improvements
6. Shop page hero with teal gradient
7. Mobile custom designer responsiveness
8. Horizontal scroll prevention
9. Custom designer validation (wraps/styles optional)
10. Hero slider single-slide behavior
11. Featured collections improvements
12. Clickable collection titles

## 🤝 Contributing

### Development Guidelines
- Follow existing code style and structure
- Test on mobile and desktop
- Ensure accessibility compliance
- Document new features
- Submit pull requests for review

## 📄 License

This theme is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Documentation**: See theme customizer help text
- **Issues**: Report bugs via GitHub issues
- **Email**: mamunstudios@gmail.com

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release with custom designer
- 60+ fixes and improvements
- Mobile responsive optimization
- Featured collections system
- Wishlist functionality
- Advanced filtering
- Dark mode support

## 🙏 Acknowledgments

- Built for Shopify platform
- Icons from custom icon set
- Fonts: System fonts with fallbacks
- Color scheme inspired by teal/turquoise aesthetics

## 📞 Contact

For business inquiries or custom development:
- **Website**: https://mamundevstudios.com
- **Email**: mamunstudios@gmail.com
- **GitHub**: https://github.com/al-mamun

---

**Made with ❤️ for Creative Cups & Mugs Business**

*Last Updated: November 2024*
