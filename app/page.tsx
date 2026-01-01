import { fetchCoins } from '@/app/lib/fetchCoins'
import CoinList from '@/app/components/CoinList'
import ThemeToggle from '@/app/components/ThemeToggle'

export default async function Home() {
  const coins = await fetchCoins()

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Crypto Dashboard</h1>
      <ThemeToggle />
      <CoinList coins={coins} />
    </main>
  )
}
