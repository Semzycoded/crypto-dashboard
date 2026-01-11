# Quick Reference Guide

## 🚀 Running the App

```bash
npm run dev
# Open http://localhost:3000
```

## 📁 Key Files You'll Want to Know About

### Components

- **Header.tsx** - Navigation & theme toggle
- **CoinList.tsx** - Main coin grid with favorites
- **PriceChart.tsx** - Interactive price chart
- **ErrorBoundary.tsx** - Error handling
- **Skeleton.tsx** - Loading states

### Utilities

- **useDebounce.ts** - Search optimization
- **formatting.ts** - Number/price formatting
- **metadata.ts** - SEO helpers
- **FavoritesContext.tsx** - State management

### API

- **fetchCoins.ts** - Get top 10 coins
- **fetchCoin.ts** - Get single coin details
- **fetchMarketChart.ts** - Get 7-day price history

## 🎨 Customization Examples

### Change number of coins displayed

Edit `app/lib/fetchCoins.ts`:

```typescript
per_page = 10 // Change to 50, 100, etc.
```

### Adjust debounce delay

Edit `app/components/CoinList.tsx`:

```typescript
const debouncedSearch = useDebounce(search, 300) // Change 300 to 500, etc.
```

### Change chart time period

Edit `app/lib/fetchMarketChart.ts`:

```typescript
days = 7 // Change to 1, 30, 365
```

### Customize colors

Edit `tailwind.config.js` or use Tailwind classes:

- `text-green-600` → Change to `text-emerald-600`
- `bg-blue-50` → Change to `bg-indigo-50`

## 🔧 Common Tasks

### Add a new page

1. Create `app/new-page/page.tsx`
2. Import components
3. Use `ErrorBoundary` and `Suspense` for safety

### Add a new feature

1. Create utility in `app/lib/`
2. Create component in `app/components/`
3. Import and use in pages
4. Add error handling

### Connect to different API

1. Update `app/lib/fetch*.ts`
2. Adjust component data handling
3. Update TypeScript types

## 🐛 Troubleshooting

| Issue                | Solution                              |
| -------------------- | ------------------------------------- |
| Chart not showing    | Clear cache, restart dev server       |
| Favorites not saving | Check localStorage enabled in browser |
| Theme not changing   | Clear browser cache                   |
| Search not working   | Ensure useDebounce is imported        |
| Errors not caught    | Check ErrorBoundary is in layout      |

## 📚 File Tree

```
app/
├── coins/[id]/page.tsx          ← Coin details
├── page.tsx                      ← Home page
├── layout.tsx                    ← Root wrapper
├── globals.css                   ← Global styles
├── components/
│   ├── Header.tsx
│   ├── CoinList.tsx
│   ├── PriceChart.tsx
│   ├── BackButton.tsx
│   ├── ErrorBoundary.tsx
│   ├── Skeleton.tsx
│   ├── ThemeToggle.tsx
│   ├── ThemeProvider.tsx
├── context/
│   └── FavoritesContext.tsx
└── lib/
    ├── fetchCoins.ts
    ├── fetchCoin.ts
    ├── fetchMarketChart.ts
    ├── fetchCoinsWithPagination.ts
    ├── useDebounce.ts
    ├── metadata.ts
    └── formatting.ts
```

## 💡 Tips for Senior Dev Work

1. **Always use TypeScript** - Catch errors early
2. **Wrap data fetches** - Use Suspense + Error boundaries
3. **Debounce user input** - Prevents performance issues
4. **Persist state** - Use localStorage or database
5. **Handle errors gracefully** - Never let users see crashes
6. **Mobile first** - Design for small screens first
7. **Test everything** - Consider adding Jest + Cypress
8. **Document changes** - Update README as you go
9. **Use semantic HTML** - Better accessibility
10. **Monitor performance** - Use React DevTools

## 🎯 What Makes This Professional

✅ Error handling at multiple levels
✅ Loading states for better UX
✅ Type safety with TypeScript
✅ Responsive mobile design
✅ State management pattern
✅ SEO optimization
✅ Performance optimizations
✅ Clean code structure
✅ Comprehensive documentation
✅ Ready for deployment

---

Happy coding! 🚀
