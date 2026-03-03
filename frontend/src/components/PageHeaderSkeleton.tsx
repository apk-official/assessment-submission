import { Skeleton } from "./ui/skeleton";
/**
 * <PageHeaderSkeleton />
 *
 * Renders a loading placeholder for the `PageHeader` component.
 *
 * Responsibilities:
 * - Mimics the layout of the responder name and instance metadata.
 * - Preserves vertical spacing and typography structure during loading.
 *
 * Notes:
 * - Pure presentational component.
 * - Used to prevent layout shift while assessment metadata is loading.
 */
export default function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-2 text-gray-900 dark:text-gray-100 font-sans">
          <div className="text-xl font-medium"><Skeleton className="w-60 h-5"/></div>
          <Skeleton className="w-40 h-3"/>
    </div>
  )
}
