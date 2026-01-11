'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

type Props = {
  data: number[][]
}

export default function PriceChart({ data }: Props) {
  const chartData = data.map((item) => ({
    time: new Date(item[0]).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    price: Math.round(item[1] * 100) / 100,
  }))

  const minPrice = Math.min(...chartData.map((d) => d.price))
  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const avgPrice = (minPrice + maxPrice) / 2

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="relative overflow-hidden rounded-2xl p-6 border-2 border-blue-300/60 dark:border-blue-500/30 bg-gradient-to-br from-blue-100/80 to-blue-50/60 dark:from-blue-950/40 dark:to-blue-900/30 shadow-lg hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-500/20 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full -mr-12 -mt-12"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Min Price
          </p>
          <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            ${minPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl p-6 border-2 border-emerald-300/60 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-100/80 to-emerald-50/60 dark:from-emerald-950/40 dark:to-emerald-900/30 shadow-lg hover:shadow-xl hover:shadow-emerald-200/50 dark:hover:shadow-emerald-500/20 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full -mr-12 -mt-12"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Avg Price
          </p>
          <p className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
            ${avgPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl p-6 border-2 border-purple-300/60 dark:border-purple-500/30 bg-gradient-to-br from-purple-100/80 to-purple-50/60 dark:from-purple-950/40 dark:to-purple-900/30 shadow-lg hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-500/20 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full -mr-12 -mt-12"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Max Price
          </p>
          <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
            ${maxPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="w-full min-h-96 bg-gradient-to-br from-white/95 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/50 rounded-3xl p-8 border-2 border-indigo-200/60 dark:border-indigo-500/30 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50 dark:hover:shadow-indigo-500/20 transition-all">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(99, 102, 241, 0.15)"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: 'rgba(99, 102, 241, 0.2)' }}
            />
            <YAxis
              tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 600 }}
              domain={['auto', 'auto']}
              width={80}
              axisLine={{ stroke: 'rgba(99, 102, 241, 0.2)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '2px solid rgba(99, 102, 241, 0.5)',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              formatter={(value?: number | string) => {
                if (typeof value === 'number') {
                  return `$${value.toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}`
                }
                return value ? `$${value}` : '-'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold' }} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#colorGradient)"
              strokeWidth={4}
              dot={{ fill: '#6366f1', r: 6, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#4f46e5' }}
              name="Price (USD)"
              isAnimationActive={true}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
