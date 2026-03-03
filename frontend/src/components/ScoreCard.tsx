import { AssessmentResultsResponse } from "@/types/assessmentResults";
import ChartRadar from "./ChartRadar";
type ScoreCardProps = {
  /** Full assessment results payload used to derive scoring summary and radar data. */
  results: AssessmentResultsResponse;
};
/**
 * <ScoreCard />
 *
 * Displays a compact scoring summary for an assessment and visualizes
 * per-element performance using a radar chart.
 *
 * Responsibilities:
 * - Derives and displays core score metrics:
 *   - element name
 *   - overall percentage
 *   - points (total / max)
 * - Applies a simple color scale to the overall percentage for quick readability.
 * - Passes `element_scores` to `ChartRadar` for the comparative visualization.
 *
 * Notes:
 * - Pure presentational component: all calculations are derived from `results`.
 * - Expects `results.scores` and `results.element_scores` to be present.
 *  - This component renders a radar chart for element comparison; however,
 *   when only a single element score is available, the chart will display
 *   a minimal shape (e.g., a single plotted value such as 1.1).
 *   The visualisation becomes more meaningful when multiple element-level
 *   scores are provided.
 */
export default function ScoreCard({ results }: ScoreCardProps) {
   const overallPercentage = results.scores.percentage;
  const element = results.scores.element ?? results.instance.element; // your API includes scores.element
  const points = `${results.scores.total_score}/${results.scores.max_score}`;
  const scoreData = [
     { label: "Element", value: element },
    { label: "Overall Score", value: `${overallPercentage}%` },
    { label: "Points", value: points },
  ]
    const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return '#7ccf00'
    if (percentage >= 60) return '#fd9a00'
    return '#fb2c36'
  }
  return (
    <div className="border h-full  border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
          <h3 className="text-gray-800 dark:text-gray-100 ">Score</h3>
          <div className="flex items-center justify-between">
            <ul>
              {/* List of Element, Total Score and Max Score  */}
          {scoreData.map((score) => (<li key={score.label }  className="flex items-center justify-start list-disc">
                <div className="flex flex-col items-start justify-start">
                   <p className="text-sm text-neutral-500 dark:text-neutral-300">{score.label}</p>
                <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100" style={
          score.label === "Overall Score"
            ? { color: getScoreColor(overallPercentage) }
            : undefined
        }>{score.value}</p> 
                </div>
              </li>))}
              
            </ul>
            <div className="shrink-0">
              {/* prevent flex stretching */}
              <ChartRadar elementScores={results.element_scores} />
            </div>
          </div>
        </div>
  )
}
