/**
 * Format price in USD with proper locale and decimal places
 */
export function formatPrice(
  price: number | null | undefined,
  decimals: number = 2
): string {
  if (!price) return 'N/A'
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format large numbers to billions/millions format
 */
export function formatLargeNumber(num: number | null | undefined): string {
  if (!num) return 'N/A'

  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K'
  }

  return num.toFixed(2)
}

/**
 * Format percentage with color indicator
 */
export function getPriceChangeColor(
  change: number
): 'text-green-600' | 'text-red-600' {
  return change > 0 ? 'text-green-600' : 'text-red-600'
}

/**
 * Get price trend indicator
 */
export function getPriceTrendIcon(change: number): string {
  return change > 0 ? '📈' : '📉'
}
