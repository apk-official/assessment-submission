import { Skeleton } from "./ui/skeleton";

export default function PageActionsSkeleton() {
  return (
    <div className="w-full flex items-center justify-between mt-2">
          <Skeleton className="w-36 h-8"/>
          <Skeleton className="w-24 h-8"/>
    </div>
  )
}
