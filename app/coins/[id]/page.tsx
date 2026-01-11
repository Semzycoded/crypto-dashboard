import { fetchCoin } from '@/app/lib/fetchCoin'
import PriceChart from '@/app/components/PriceChart'
import { fetchMarketChart } from '@/app/lib/fetchMarketChart'
import BackButton from '@/app/components/BackButton'
import { generateCoinMetadata } from '@/app/lib/metadata'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ChartSkeleton } from '@/app/components/Skeleton'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const coin = await fetchCoin(id)
    return generateCoinMetadata(coin)
  } catch {
    return {
      title: 'Cryptocurrency - Crypto Dashboard',
    }
  }
}

async function ChartSection({ id }: { id: string }) {
  try {
    const chart = await fetchMarketChart(id)
    return <PriceChart data={chart.prices} />
  } catch (error) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        Unable to load price chart
      </div>
    )
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  let coin

  try {
    coin = await fetchCoin(id)
  } catch (error) {
    return (
      <main className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="bg-gradient-to-r from-red-100/80 to-pink-100/80 dark:from-red-950/40 dark:to-pink-950/40 rounded-3xl p-8 mt-6 border-2 border-red-400/60 dark:border-red-500/40 backdrop-blur-sm">
            <h2 className="text-3xl font-black bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
              ⚠️ Coin Not Found
            </h2>
            <p className="text-lg text-red-700 dark:text-red-300 font-medium">
              We couldn't find the cryptocurrency you're looking for. Please try
              searching for a different coin.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <BackButton />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 mt-8 bg-gradient-to-br from-indigo-100/80 via-purple-100/60 to-pink-100/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/40 rounded-3xl p-8 border-2 border-indigo-300/60 dark:border-indigo-500/30 backdrop-blur-sm">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-20 h-20 rounded-2xl shadow-xl"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
              {coin.name}
            </h1>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 tracking-widest">
              {coin.symbol?.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-4 bg-gradient-to-br from-white/95 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/50 rounded-3xl p-8 border-2 border-indigo-200/60 dark:border-indigo-500/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-500/20 transition-all">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-100/80 to-blue-100/80 dark:from-indigo-950/40 dark:to-blue-950/40 rounded-2xl border border-indigo-200/60 dark:border-indigo-500/30">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Current Price
              </span>
              <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                $
                {coin.market_data.current_price.usd.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-purple-100/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200/60 dark:border-purple-500/30">
                <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 mb-1">
                  Market Cap Rank
                </p>
                <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
                  #{coin.market_cap_rank}
                </p>
              </div>
              <div className="p-4 bg-pink-100/80 dark:bg-pink-950/40 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
                <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 mb-1">
                  Market Cap
                </p>
                <p className="text-lg font-black text-pink-600 dark:text-pink-400">
                  {coin.market_data.market_cap.usd
                    ? '$' +
                      (coin.market_data.market_cap.usd / 1e9).toFixed(1) +
                      'B'
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-100/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-500/30">
              <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 mb-1">
                24h Volume
              </p>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                $
                {coin.market_data.total_volume.usd
                  ? (coin.market_data.total_volume.usd / 1e9).toFixed(2) + 'B'
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-gradient-to-br from-white/95 to-pink-50/50 dark:from-slate-800/80 dark:to-slate-900/50 rounded-3xl p-8 border-2 border-pink-200/60 dark:border-pink-500/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-pink-200/50 dark:hover:shadow-pink-500/20 transition-all">
            <div
              className={`p-4 rounded-2xl border ${
                coin.market_data.price_change_percentage_24h > 0
                  ? 'bg-emerald-100/80 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-500/30'
                  : 'bg-red-100/80 dark:bg-red-950/40 border-red-200/60 dark:border-red-500/30'
              }`}
            >
              <p
                className={`text-xs font-bold uppercase ${
                  coin.market_data.price_change_percentage_24h > 0
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-red-700 dark:text-red-400'
                }`}
              >
                24h Change
              </p>
              <p
                className={`text-2xl font-black ${
                  coin.market_data.price_change_percentage_24h > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {coin.market_data.price_change_percentage_24h > 0 ? '📈' : '📉'}{' '}
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border ${
                coin.market_data.price_change_percentage_7d_in_currency?.usd > 0
                  ? 'bg-blue-100/80 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-500/30'
                  : 'bg-orange-100/80 dark:bg-orange-950/40 border-orange-200/60 dark:border-orange-500/30'
              }`}
            >
              <p
                className={`text-xs font-bold uppercase ${
                  coin.market_data.price_change_percentage_7d_in_currency?.usd >
                  0
                    ? 'text-blue-700 dark:text-blue-400'
                    : 'text-orange-700 dark:text-orange-400'
                }`}
              >
                7d Change
              </p>
              <p
                className={`text-2xl font-black ${
                  coin.market_data.price_change_percentage_7d_in_currency?.usd >
                  0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-orange-600 dark:text-orange-400'
                }`}
              >
                {coin.market_data.price_change_percentage_7d_in_currency?.usd >
                0
                  ? '📈'
                  : '📉'}{' '}
                {coin.market_data.price_change_percentage_7d_in_currency?.usd.toFixed(
                  2
                )}
                %
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-yellow-100/80 dark:bg-yellow-950/40 rounded-2xl border border-yellow-200/60 dark:border-yellow-500/30">
                <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 mb-1">
                  ATH
                </p>
                <p className="text-sm font-black text-yellow-600 dark:text-yellow-400">
                  $
                  {coin.market_data.ath.usd.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="p-4 bg-cyan-100/80 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200/60 dark:border-cyan-500/30">
                <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 mb-1">
                  ATL
                </p>
                <p className="text-sm font-black text-cyan-600 dark:text-cyan-400">
                  $
                  {coin.market_data.atl.usd.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/50 rounded-3xl p-10 border-2 border-indigo-200/60 dark:border-indigo-500/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-500/20 transition-all">
          <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-8">
            📊 7-Day Price Chart
          </h2>
          <Suspense fallback={<ChartSkeleton />}>
            <ChartSection id={id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
