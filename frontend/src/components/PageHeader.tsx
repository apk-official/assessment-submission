import { AssessmentResultsResponse } from "@/types/assessmentResults";
type PageHeaderProps = {
  /**
   * Assessment instance metadata used for display.
   * Includes responder name, instance ID, and creation timestamp.
   */
  instance: AssessmentResultsResponse["instance"];
};
/**
 * <PageHeader />
 *
 * Displays high-level metadata for the selected assessment instance.
 *
 * Responsibilities:
 * - Shows responder name and instance identifier.
 * - Formats and displays the creation date.
 * - Provides consistent typography styling for the dashboard header section.
 *
 * Notes:
 * - Gracefully falls back to "N/A" if `created_at` is not available.
 * - Pure presentational component with no side effects.
 */
export default function PageHeader({
  instance,
}:PageHeaderProps) {
  const formattedDate = instance.created_at
    ? new Date(instance.created_at).toLocaleDateString()
    : "N/A";
  return (
    <div className="flex flex-col text-gray-900 dark:text-gray-100 font-sans">
          <h3 className="text-xl font-medium">{instance.responder_name} <span className="text-gray-500 font-light text-lg">({instance.id})</span></h3>
          <p className="text-sm text-gray-500 ">Created at: {formattedDate}</p>
    </div>
  );
}
