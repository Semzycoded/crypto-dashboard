import { fetchCoins } from '@/app/lib/fetchCoins'
import CoinList from '@/app/components/CoinList'
import { Suspense } from 'react'
import { CoinListSkeletons } from './components/Skeleton'

async function CoinListWithSuspense() {
  try {
    const coins = await fetchCoins()
    return <CoinList coins={coins} />
  } catch (error) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
        <p className="text-yellow-800 dark:text-yellow-200">
          ⚠️ Unable to fetch cryptocurrency data. Please try again later.
        </p>
      </div>
    )
  }
}

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Crypto Dashboard
          </h1>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Track top cryptocurrencies by market cap in real-time
          </p>
          <div className="mt-6 h-1 w-32 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full"></div>
        </div>

        <Suspense fallback={<CoinListSkeletons />}>
          <CoinListWithSuspense />
        </Suspense>
      </div>
    </main>
  )
}
