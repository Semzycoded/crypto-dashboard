'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDebounce } from '@/app/lib/useDebounce'
import { useFavorites } from '@/app/context/FavoritesContext'

type Coin = {
  id: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

type Props = {
  coins: Coin[]
}

export default function CoinList({ coins }: Props) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { isFavorite, toggleFavorite } = useFavorites()

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <>
      <input
        type="text"
        placeholder="Search coin..."
        className="mb-8 w-full px-6 py-4 text-lg border-2 border-indigo-300 dark:border-indigo-500/50 rounded-2xl bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm shadow-lg dark:shadow-indigo-500/10 font-medium transition-all"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="relative group bg-gradient-to-br from-white/95 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/50 rounded-3xl p-6 border-2 border-indigo-200/60 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-400 shadow-md hover:shadow-2xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-500/20 transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(coin.id)}
              className={`absolute top-4 right-4 text-3xl transition transform hover:scale-125 z-10 ${
                isFavorite(coin.id)
                  ? 'text-yellow-400 drop-shadow-md'
                  : 'text-slate-300 dark:text-slate-600'
              }`}
              title={
                isFavorite(coin.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              ★
            </button>

            <Link
              href={`/coins/${coin.id}`}
              className="block hover:opacity-90 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                  {coin.name}
                </h2>
              </div>

              <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
                ${coin.current_price.toLocaleString()}
              </p>

              <p
                className={`text-lg font-bold transition ${
                  coin.price_change_percentage_24h > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h > 0 ? '📈' : '📉'}{' '}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
