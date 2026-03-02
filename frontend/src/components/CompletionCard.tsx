import { ChartRadial } from "./ChartRadial";

export default function CompletionCard() {
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
      <h3>Overview</h3>
      <div className="flex items-center justify-between">
        <div>Total Quesion</div>
        <div className="shrink-0">
          {" "}
          {/* prevent flex stretching */}
          <ChartRadial />
        </div>
      </div>
    </div>
  );
}
