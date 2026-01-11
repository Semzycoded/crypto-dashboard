# Architecture Overview

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Root Layout (layout.tsx)                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           ErrorBoundary (Error Handling)             │    │
│  │  ┌───────────────────────────────────────────────┐  │    │
│  │  │         ThemeProvider (Dark Mode)              │  │    │
│  │  │  ┌─────────────────────────────────────────┐  │  │    │
│  │  │  │    FavoritesProvider (State)             │  │  │    │
│  │  │  │  ┌──────────────────────────────────┐   │  │  │    │
│  │  │  │  │     Header (Navigation)          │   │  │  │    │
│  │  │  │  │  • Sticky + Responsive          │   │  │  │    │
│  │  │  │  │  • Mobile Menu                  │   │  │  │    │
│  │  │  │  │  • Theme Toggle                 │   │  │  │    │
│  │  │  │  └──────────────────────────────────┘   │  │  │    │
│  │  │  │  ┌──────────────────────────────────┐   │  │  │    │
│  │  │  │  │     Page Content (Dynamic)       │   │  │  │    │
│  │  │  │  │  ┌──────────────────────────┐    │   │  │  │    │
│  │  │  │  │  │  Suspense Boundary      │    │   │  │  │    │
│  │  │  │  │  │ ┌────────────────────┐  │    │   │  │  │    │
│  │  │  │  │  │ │ CoinList / Details │  │    │   │  │  │    │
│  │  │  │  │  │ └────────────────────┘  │    │   │  │  │    │
│  │  │  │  │  │ Fallback: Skeleton      │    │   │  │  │    │
│  │  │  │  │  └──────────────────────────┘    │   │  │  │    │
│  │  │  │  └──────────────────────────────────┘   │  │  │    │
│  │  │  └─────────────────────────────────────────┘  │  │    │
│  │  └───────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌─────────────────────┐
│  CoinGecko API      │
│  (REST Endpoints)   │
└──────────┬──────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   Fetch Functions (app/lib/)         │
│  ├─ fetchCoins()                     │
│  ├─ fetchCoin(id)                    │
│  ├─ fetchMarketChart(id)             │
│  └─ fetchCoinsWithPagination()       │
└──────────┬───────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   Pages (Server Components)           │
│  ├─ Home Page (page.tsx)             │
│  └─ Coin Detail ([id]/page.tsx)      │
└──────────┬───────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   Components (Client Components)      │
│  ├─ CoinList                         │
│  ├─ PriceChart                       │
│  ├─ Header                           │
│  ├─ ErrorBoundary                    │
│  └─ Skeleton (Loading)               │
└──────────┬───────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   State Management                   │
│  ├─ FavoritesContext (Global)        │
│  ├─ useState (Local)                 │
│  └─ useDebounce (Search)             │
└──────────┬───────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   Browser                            │
│  ├─ DOM (Rendered UI)                │
│  ├─ localStorage (Favorites)         │
│  └─ Cookies (Theme)                  │
└──────────────────────────────────────┘
```

---

## Component Hierarchy

```
RootLayout
├── ErrorBoundary
│   └── ThemeProvider
│       └── FavoritesProvider
│           ├── Header
│           │   ├── Logo Link
│           │   ├── Nav Links
│           │   └── ThemeToggle
│           └── Page Content
│               ├── Home (page.tsx)
│               │   └── Suspense
│               │       └── CoinList
│               │           ├── Input (Search)
│               │           └── Coin Cards (with ⭐)
│               │               └── Link to /coins/[id]
│               │
│               └── CoinDetail ([id]/page.tsx)
│                   ├── BackButton
│                   ├── Coin Header
│                   ├── Price Stats
│                   └── Suspense
│                       └── PriceChart
```

---

## Features Architecture

```
Error Handling
├── ErrorBoundary (Component)
├── Try/Catch in Pages
└── User-Friendly Fallbacks

Loading States
├── Skeleton Components
├── Suspense Boundaries
└── Graceful Degradation

State Management
├── FavoritesContext
│   ├── Provider
│   ├── Hook (useFavorites)
│   └── localStorage Sync
└── Local useState

Performance
├── Debounced Search
├── Image Lazy Loading
├── Route Caching (ISR)
└── Code Splitting

Mobile Experience
├── Header Navigation
│   ├── Desktop Menu
│   └── Mobile Hamburger
├── Responsive Grid
└── Touch-Friendly UI

SEO & Metadata
├── Dynamic Titles
├── OpenGraph Tags
├── Dynamic Descriptions
└── Keyword Optimization
```

---

## API Integration Layer

```
┌──────────────────────────────────────┐
│     CoinGecko API v3                 │
│  https://api.coingecko.com/api/v3/   │
└──────────────────┬───────────────────┘
                   │
        ┌──────────┼──────────┬──────────┐
        │          │          │          │
        ↓          ↓          ↓          ↓
    /coins/    /coins/[id]  market_chart  markets
    markets     (full data)   (7d prices)  (paginated)
        │          │          │          │
        ↓          ↓          ↓          ↓
    ┌─────────────────────────────────────┐
    │   Fetch Functions (Cached)          │
    │ • Revalidation: 60s                 │
    │ • Error Handling: Thrown Errors     │
    │ • Headers: Accept, User-Agent       │
    └──────────────────┬──────────────────┘
                       │
            ┌──────────┼──────────┐
            │          │          │
            ↓          ↓          ↓
        Home Page   Coin Page    List
         (Top 10)  (Details)    (Paginated)
```

---

## User Interaction Flow

```
┌─────────────┐
│   Visitor   │
└──────┬──────┘
       │
       ↓ Lands on Home Page
┌──────────────────────┐
│  Home Page           │
│  ├─ Show Skeleton    │
│  ├─ Fetch Coins      │
│  └─ Display List     │
└──────┬───────────────┘
       │
       ├─→ [Click Theme Toggle]
       │   └─ Theme Changes (Persisted)
       │
       ├─→ [Type in Search]
       │   └─ Debounced Filtering
       │
       ├─→ [Click ⭐ Star]
       │   └─ Add to Favorites (localStorage)
       │
       └─→ [Click Coin Card]
           └─ Navigate to Detail Page
               │
               ↓
           ┌──────────────────┐
           │  Coin Detail     │
           │  ├─ Show Skeleton│
           │  ├─ Fetch Data   │
           │  └─ Display Info │
           └──────┬───────────┘
                  │
                  ├─→ [Click ← Back]
                  │   └─ Return to Home
                  │
                  └─→ [View Chart]
                      └─ Interactive Chart
```

---

## Error Handling Strategy

```
┌──────────────────────────────────────┐
│        Error Occurs                   │
└──────────────────┬───────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ↓                     ↓
    React Error         API Error
    (Component)         (Data Fetch)
        │                     │
        ↓                     ↓
    ┌────────────┐       ┌──────────────┐
    │ Error      │       │ Try/Catch    │
    │ Boundary   │       │ + Fallback   │
    │            │       │ UI           │
    └────────────┘       └──────────────┘
        │                     │
        └──────────┬──────────┘
                   ↓
        ┌──────────────────────┐
        │ User Sees:           │
        │ • Error Message      │
        │ • "Try Again" Button │
        │ • App Stays Running  │
        └──────────────────────┘
```

---

## Technology Stack

```
Frontend
├── Next.js 16 (Framework)
├── React 19 (UI Library)
├── TypeScript (Type Safety)
├── Tailwind CSS 4 (Styling)
└── Recharts (Charting)

State Management
├── React Context (Global)
├── React Hooks (Local)
└── localStorage (Persistence)

Theme
├── next-themes (Theme Switching)
├── CSS Custom Properties
└── Tailwind Dark Mode

Development
├── Node.js 18+
├── npm (Package Manager)
└── TypeScript Compiler
```

---

## Performance Considerations

```
Optimization Strategy
├── Code Splitting
│   └── Route-based chunks
├── Image Loading
│   └── Native lazy loading
├── API Caching
│   └── ISR (60s revalidation)
├── Search Optimization
│   └── Debouncing (300ms)
├── Component Optimization
│   ├── Memo for stable components
│   ├── useCallback for handlers
│   └── Suspense for data
└── CSS Optimization
    ├── Tailwind tree-shaking
    ├── Critical CSS inline
    └── Fonts system stack
```

---

## Deployment Architecture

```
GitHub (Source Code)
  │
  ↓
Vercel (Build & Deploy)
  ├─ Build Process
  ├─ Type Check
  ├─ Preview Deployment
  └─ Production Deployment
       │
       ↓
   CDN (Edge Network)
   ├─ Static Assets
   ├─ ISR Pages
   └─ API Routes
       │
       ↓
   User Browser
   ├─ HTML (Pre-rendered)
   ├─ CSS (Critical)
   ├─ JS (Code Split)
   └─ Images (Lazy)
```

---

This architecture ensures:
✅ **Reliability** - Error handling at every level
✅ **Performance** - Optimized for speed
✅ **Scalability** - Ready to grow
✅ **Maintainability** - Clean separation of concerns
✅ **User Experience** - Smooth and responsive
