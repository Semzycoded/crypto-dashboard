# Crypto Dashboard

A professional-grade cryptocurrency price tracking dashboard built with Next.js, React, and TypeScript.

## 🎯 Features

### Core Features

- ✅ **Real-time Crypto Prices** - Powered by CoinGecko API
- ✅ **Interactive Price Charts** - 7-day price movements with Recharts
- ✅ **Dark/Light Theme** - System-aware theme switching with next-themes
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS

### Professional Enhancements

- 🎯 **Error Boundaries** - Graceful error handling with fallback UI
- ⚡ **Suspense & Loading States** - Skeleton loaders for better UX
- ⭐ **Favorites/Watchlist** - Save favorite coins with localStorage persistence
- ⬅️ **Navigation** - Back button and sticky header with mobile menu
- 📊 **Advanced Chart** - Min/Avg/Max price indicators
- 🔍 **Debounced Search** - Optimized search with 300ms debounce
- 🎨 **SEO & Metadata** - Dynamic meta tags for better search visibility
- 📱 **Mobile Navigation** - Hamburger menu and responsive layouts
- 🚀 **Type Safety** - Full TypeScript support with proper typing
- 🖼️ **Image Optimization** - Built-in lazy loading and optimization
- 📈 **Performance** - Optimized with Suspense, caching, and minimal re-renders

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd crypto-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
app/
├── components/           # React components
│   ├── Header.tsx       # Navigation header with mobile menu
│   ├── CoinList.tsx     # Coin grid with favorites
│   ├── PriceChart.tsx   # Interactive chart with stats
│   ├── BackButton.tsx   # Navigation back button
│   ├── ErrorBoundary.tsx # Error boundary component
│   ├── Skeleton.tsx     # Loading skeleton components
│   ├── ThemeToggle.tsx  # Dark mode toggle
│   └── ThemeProvider.tsx# Theme context provider
├── context/             # React Context
│   └── FavoritesContext.tsx # Favorites state management
├── lib/                 # Utilities & API functions
│   ├── fetchCoins.ts           # Fetch all coins
│   ├── fetchCoin.ts            # Fetch single coin details
│   ├── fetchMarketChart.ts     # Fetch price history
│   ├── useDebounce.ts          # Debounce hook
│   ├── metadata.ts             # SEO metadata generator
│   ├── formatting.ts           # Number formatting utilities
│   └── fetchCoinsWithPagination.ts # Pagination support
├── coins/[id]/
│   ├── page.tsx         # Coin detail page
│   └── loading.tsx      # Loading state
├── layout.tsx           # Root layout with providers
├── page.tsx             # Home page
└── globals.css          # Global styles
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme.

### API Source

The dashboard uses the free CoinGecko API. To use a different API:

1. Update the fetch URLs in `app/lib/fetch*.ts`
2. Adjust the data transformation in components

### Number of Coins

Change `per_page=10` in `fetchCoins.ts` to display more/fewer coins.

## 🔧 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: React 19
- **Charts**: Recharts
- **Theming**: next-themes
- **State**: React Context + Hooks
- **API**: CoinGecko REST API

## 📊 Performance Optimizations

- **Suspense Boundaries** - Loading states for data fetching
- **Route Caching** - ISR with revalidation strategies
- **Debounced Search** - Prevents excessive re-renders
- **Error Boundaries** - Prevents full app crashes
- **Lazy Loading** - Images and components load on demand
- **CSS-in-JS** - Tailwind CSS with tree-shaking

## 🚢 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to other platforms

```bash
npm run build
npm start
```

## 🐛 Common Issues

**Chart not displaying?**

- Ensure recharts is installed: `npm install recharts`

**Favorites not persisting?**

- Check if localStorage is enabled in browser settings

**Dark mode not working?**

- Clear browser cache and restart dev server

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
