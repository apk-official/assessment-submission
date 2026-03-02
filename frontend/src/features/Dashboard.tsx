import CompletionCard from "@/components/CompletionCard";
import InsightsCard from "@/components/InsightsCard";
import PageActions from "@/components/PageActions";
import PageHeader from "@/components/PageHeader";
import QuestionListCard from "@/components/QuestionListCard";
import ScoreCard from "@/components/ScoreCard";
import ScorePerQuestionChartCard from "@/components/ScorePerQuestionChartCard";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="shrink-0">
        <PageHeader />
        <PageActions />
      </div>
      {/* Grid Layout */}
      <div className="flex-1">
        <div className="grid min-h-full lg:h-full gap-3 lg:gap-6 grid-cols-3 grid-rows-16 lg:grid-cols-6 lg:grid-rows-6">
          {/* div 1 */}
          <div className="col-span-3 row-span-2 lg:col-span-2 lg:row-start-1">
            <CompletionCard />
          </div>
          {/* div2 (starts at column 3 automatically) */}
          <div className="col-span-3 row-span-2 lg:col-span-2 row-start-3 col-start-1 lg:row-start-1">
            <ScoreCard/>
          </div>
          {/* div3 (starts at column 5 automatically) */}
          <div className="col-span-3 row-span-2 lg:col-span-2 row-start-5 col-start-1 lg:row-start-1">
            <InsightsCard/>
          </div>

          {/* div4 (row start 3, spans 4 rows, spans 3 cols) */}
          <div className="col-span-3 row-span-4 row-start-7 col-start-1 lg:row-start-3">
            <QuestionListCard/>
          </div>

          {/* div5 (row start 3, col start 4, spans 4 rows, spans 3 cols) */}
          <div className="col-span-3 row-span-4 row-start-11 col-start-1 lg:row-start-3 lg:col-start-4">
            <ScorePerQuestionChartCard />
          </div>
        </div>
      </div>
    </div>
  );
}
