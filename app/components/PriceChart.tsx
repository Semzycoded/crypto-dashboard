'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  data: number[][]
}

export default function PriceChart({ data }: Props) {
  const chartData = data.map((item) => ({
    time: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }))

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
