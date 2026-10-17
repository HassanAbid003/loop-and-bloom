export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-sand/60" />
      <div className="pt-5 space-y-3">
        <div className="h-2 w-16 bg-sand/60 rounded" />
        <div className="h-4 w-3/4 bg-sand/60 rounded" />
        <div className="h-3 w-1/3 bg-sand/60 rounded" />
      </div>
    </div>
  );
}