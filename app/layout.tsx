import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
