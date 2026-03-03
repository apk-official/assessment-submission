import {
  CheckCircleIcon,
  FlagBannerFoldIcon,
  FlagBannerIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import type { Insight } from "@/types/assessmentResults";

const iconMap = {
  completion: {
    positive: <FlagBannerIcon weight="fill" size={26} color="#00a63e" />,
    negative: <FlagBannerFoldIcon weight="fill" size={26} color="#fd9a00" />,
  },
  performance: {
    positive: <CheckCircleIcon weight="fill" size={26} color="#00a63e" />,
    negative: <XCircleIcon weight="fill" size={26} color="#ff6467" />,
  },
} as const;
type InsightsCardProps = {
  /**
   * List of generated assessment insights.
   * Each insight contains a type, message, and positivity indicator.
   */
  insights?: Insight[];
};
/**
 * <InsightsCard />
 *
 * Displays contextual assessment insights with visual indicators.
 *
 * Responsibilities:
 * - Renders a list of insights returned from the assessment results.
 * - Maps insight `type` and `positive` state to appropriate icons.
 * - Applies contextual background and border styles based on insight category.
 * - Gracefully handles empty insight lists.
 *
 * Visual Behavior:
 * - "performance" insights use green/red styling.
 * - "completion" insights use green/amber styling.
 * - Unknown types fall back to performance icon logic.
 *
 * Notes:
 * - Pure presentational component.
 * - Assumes `insight.type` values correspond to keys in `iconMap`.
 */
export default function InsightsCard({ insights = [] }: InsightsCardProps) {
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
      <h3 className="text-gray-800 dark:text-gray-100">Insights</h3>

      {insights.length === 0 ? (
        <p className="text-sm text-muted-foreground">No insights available.</p>
      ) : (
        insights.map((insight) => {
          const key = insight.type.toLowerCase() as keyof typeof iconMap;
          const icons = iconMap[key];

          const icon = icons
            ? insight.positive
              ? icons.positive
              : icons.negative
            : insight.positive
              ? iconMap.performance.positive
              : iconMap.performance.negative;

          return (
            <div
              key={`${insight.type}-${insight.message}`}
              className={[
                "rounded-lg p-3 flex items-start gap-3 border",
                insight.type.toLowerCase() === "performance"
                  ? insight.positive
                    ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700"
                    : "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700"
                  : insight.type.toLowerCase() === "completion"
                    ? insight.positive
                      ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700"
                      : "bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700"
                    : "",
              ].join(" ")}
            >
              <div className="shrink-0">{icon}</div>

              <div className="flex flex-col">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {insight.type}
                </p>
                <p className="text-sm text-neutral-800 dark:text-neutral-100">
                  {insight.message}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
