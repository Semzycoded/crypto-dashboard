import { fetchCoin } from '@/app/lib/fetchCoin'
import PriceChart from '@/app/components/PriceChart'
import { fetchMarketChart } from '@/app/lib/fetchMarketChart'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const coin = await fetchCoin(id)
  const chart = await fetchMarketChart(id)

  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={coin.image.large} alt={coin.name} className="w-12 h-12" />
        <h1 className="text-3xl font-bold">{coin.name}</h1>
      </div>

      <div className="space-y-3 text-lg">
        <p>
          <span className="font-semibold">Price:</span> $
          {coin.market_data.current_price.usd.toLocaleString()}
        </p>

        <p>
          <span className="font-semibold">Market Cap:</span> $
          {coin.market_data.market_cap.usd.toLocaleString()}
        </p>

        <p
          className={
            coin.market_data.price_change_percentage_24h > 0
              ? 'text-green-600'
              : 'text-red-600'
          }
        >
          24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">7-Day Price Chart</h2>
        <PriceChart data={chart.prices} />
      </div>
    </main>
  )
}
