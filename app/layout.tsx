import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { FavoritesProvider } from './context/FavoritesContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Dashboard - Track Cryptocurrency Prices',
  description:
    'Real-time cryptocurrency price tracking and analysis. Monitor Bitcoin, Ethereum, and other cryptocurrencies with our interactive dashboard.',
  keywords: [
    'cryptocurrency',
    'bitcoin',
    'ethereum',
    'crypto prices',
    'dashboard',
  ],
  openGraph: {
    title: 'Crypto Dashboard',
    description: 'Track cryptocurrency prices in real-time',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
        <ErrorBoundary>
          <ThemeProvider>
            <FavoritesProvider>
              <Header />
              {children}
            </FavoritesProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
