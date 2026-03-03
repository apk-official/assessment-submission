import { ChartBar } from "./ChartBar";

type ScorePerQuestionChartCardProps = {
  /**
   * Chart-ready data representing per-question scores.
   * Each item contains a question label and its corresponding score.
   */
  data: { question: string; score: number }[];
};
/**
 ** <ScorePerQuestionChartCard />
 *
 * Displays a bar chart visualizing scores for each assessment question.
 *
 ** Responsibilities:
 * - Renders a section header for per-question scoring.
 * - Passes formatted score data to `ChartBar` for visualisation.
 *
 ** Notes:
 * - Expects data to already be transformed into chart-friendly format.
 * - Pure presentational wrapper around `ChartBar`.
 */
export default function ScorePerQuestionChartCard({
  data,
}:ScorePerQuestionChartCardProps) {
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col items-start justify-between">
      <h3 className="text-neutral-800 dark:text-neutral-100 ">Score Per Question</h3>
      <ChartBar data={data}/>
    </div>
  );
}
