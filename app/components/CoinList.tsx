'use client'

import { useState } from 'react'
import Link from 'next/link'

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

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <input
        type="text"
        placeholder="Search coin..."
        className="mb-6 w-full p-3 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map((coin) => (
          <Link
            key={coin.id}
            href={`/coins/${coin.id}`}
            className="border rounded-xl p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8" />
              <h2 className="font-semibold">{coin.name}</h2>
            </div>

            <p className="mt-2 text-lg font-bold text-black dark:text-white">
              ${coin.current_price.toLocaleString()}
            </p>

            <p
              className={
                coin.price_change_percentage_24h > 0
                  ? 'text-green-600'
                  : 'text-red-500'
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
