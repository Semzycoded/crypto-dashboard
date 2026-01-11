import { Metadata } from 'next'

export function generateCoinMetadata(coin: {
  name: string
  market_data: {
    current_price: { usd: number }
  }
}): Metadata {
  const price = coin.market_data.current_price.usd.toLocaleString()

  return {
    title: `${coin.name} Price - Crypto Dashboard`,
    description: `Current price of ${coin.name} is $${price}. Track and analyze ${coin.name} price movements in real-time.`,
    keywords: [
      `${coin.name}`,
      'price',
      'cryptocurrency',
      'crypto',
      'dashboard',
    ],
  }
}
