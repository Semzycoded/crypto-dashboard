export async function fetchMarketChart(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
    {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'crypto-dashboard',
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch market chart')
  }

  return res.json()
}
