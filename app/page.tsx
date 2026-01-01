import { fetchCoins } from '@/app/lib/fetchCoins'
import CoinList from '@/app/components/CoinList'

export default async function Home() {
  const coins = await fetchCoins()

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Crypto Dashboard</h1>

      <CoinList coins={coins} />
    </main>
  )
}
