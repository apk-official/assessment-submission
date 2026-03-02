import { ChartBar } from "./ChartBar";

export default function ScorePerQuestionChartCard() {
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col items-start justify-between">
      <h3>Score Per Question</h3>
      <ChartBar />
    </div>
  );
}
