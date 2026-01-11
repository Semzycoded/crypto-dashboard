export async function fetchCoinsWithPagination(
  page: number = 1,
  perPage: number = 10
) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch coins')
  }

  return res.json()
}
