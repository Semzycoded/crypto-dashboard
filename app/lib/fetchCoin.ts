export async function fetchCoin(id: string) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'crypto-dashboard',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch coin: ${res.status}`)
  }

  return res.json()
}
