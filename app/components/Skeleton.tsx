export function CoinCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
    </div>
  )
}

export function CoinListSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CoinCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
  )
}
