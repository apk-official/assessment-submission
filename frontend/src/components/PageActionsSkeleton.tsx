import { Skeleton } from "./ui/skeleton";
/**
 * <PageActionsSkeleton />
 *
 * Renders a loading placeholder for the `PageActions` component.
 *
 * Responsibilities:
 * - Mimics the layout of the element selector and export button.
 * - Provides visual feedback while action-related data or state is loading.
 *
 * Notes:
 * - Pure presentational component.
 * - Intended to maintain layout consistency during loading states.
 */
export default function PageActionsSkeleton() {
  return (
    <div className="w-full flex items-center justify-between mt-2">
          <Skeleton className="w-36 h-8"/>
          <Skeleton className="w-24 h-8"/>
    </div>
  )
}
