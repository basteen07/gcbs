export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 rounded-lg bg-gray-200 animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-white border border-gray-100 animate-pulse" />
        ))}
      </div>
      <div className="h-80 rounded-2xl bg-white border border-gray-100 animate-pulse" />
    </div>
  )
}
