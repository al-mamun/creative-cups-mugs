# Deployment Guide

Quick reference for deploying the Creative Cups & Mugs Shopify theme.

## 🚀 Quick Deploy

### One-Line Deploy Command
```bash
shopify theme push --only sections/custom-designer.liquid sections/featured-collections.liquid layout/theme.liquid templates/page.wishlist.liquid assets/header.css assets/shop.css assets/custom.css assets/custom.js assets/homepage.css assets/main.js --nodelete
```

### Full Theme Deploy
```bash
shopify theme push
```

> **Note**: The `shopify theme push` command will automatically detect and deploy to your connected theme. No need to specify theme ID.

## 📋 Prerequisites

1. **Shopify CLI Installed**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Logged Into Shopify**
   ```bash
   shopify login
   ```

3. **Connected to Store**
   ```bash
   shopify theme list
   ```

## 🎯 Deployment Steps

### Step 1: Test Locally
```bash
shopify theme dev
```

### Step 2: Deploy Specific Files
```bash
shopify theme push --only assets/custom.css
```

### Step 3: Deploy Full Theme
```bash
shopify theme push --nodelete
```

### Step 4: Verify Deployment
1. Hard refresh browser (Ctrl+Shift+R)
2. Test mobile responsiveness
3. Check custom designer functionality
4. Verify all 60 fixes are working

## 🔧 Theme Management

To list all themes and their IDs:
```bash
shopify theme list
```

To deploy to a specific theme:
```bash
shopify theme push --theme YOUR_THEME_ID
```

## 📦 Key Files for Deployment

### Critical Files (Deploy First)
- `sections/custom-designer.liquid` - Main designer
- `assets/custom.js` - Designer functionality
- `assets/custom.css` - Designer styles
- `layout/theme.liquid` - Main layout

### Secondary Files
- `assets/homepage.css` - Homepage styles
- `assets/main.js` - Main JavaScript
- `sections/featured-collections.liquid` - Collections
- `templates/page.wishlist.liquid` - Wishlist

### Optional Files
- `assets/header.css` - Navigation
- `assets/shop.css` - Shop page
- Other section files

## ✅ Post-Deployment Checklist

- [ ] Hard refresh all pages (Ctrl+Shift+R)
- [ ] Test custom designer on desktop
- [ ] Test custom designer on mobile
- [ ] Verify wishlist functionality
- [ ] Check featured collections display
- [ ] Test hero slider (single slide behavior)
- [ ] Verify mobile menu works
- [ ] Test add to cart (with/without customization)
- [ ] Check shop page filters
- [ ] Verify no horizontal scroll on mobile

## 🐛 Troubleshooting

### Issue: Changes Not Showing
```bash
# Clear browser cache
Ctrl+Shift+R (hard refresh)

# Or deploy with unpublished flag
shopify theme push --unpublished
```

### Issue: Theme Not Found
```bash
# List all themes
shopify theme list

# Use correct theme ID
shopify theme push --theme YOUR_THEME_ID
```

### Issue: Permission Denied
```bash
# Re-authenticate
shopify logout
shopify login
```

## 🔄 Git Workflow + Deployment

### Standard Workflow
```bash
# 1. Make changes locally
git add .
git commit -m "Your changes"

# 2. Push to GitHub
git push origin main

# 3. Deploy to Shopify
shopify theme push
```

### Feature Branch Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to GitHub
git push origin feature/new-feature

# 4. Test on development theme
shopify theme push --unpublished

# 5. Merge to main
git checkout main
git merge feature/new-feature

# 6. Deploy to production
shopify theme push
```

## 📊 60 Fixes Deployed

This theme includes 60+ fixes and improvements:
- Mobile responsiveness (42 fixes)
- Custom designer validation (4 fixes)
- Hero slider optimization (4 fixes)
- Featured collections (10 fixes)
- And many more...

See README.md for complete list.

## 🆘 Support

For deployment issues:
1. Check Shopify CLI version: `shopify version`
2. Verify theme ID: `shopify theme list`
3. Check connection: `shopify whoami`
4. Review error logs in terminal

## 📞 Quick Commands Reference

```bash
# List themes
shopify theme list

# Deploy full theme
shopify theme push

# Deploy specific files
shopify theme push --only path/to/file.liquid

# Test locally
shopify theme dev

# Check CLI version
shopify version

# Login/logout
shopify login
shopify logout
```

---

**Last Updated**: November 2024
**Theme Version**: 1.0.0
**Total Fixes**: 60+

✅ **Ready to Deploy!**
