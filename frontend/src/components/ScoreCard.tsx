import { AssessmentResultsResponse } from "@/types/assessmentResults";
import ChartRadar from "./ChartRadar";


export default function ScoreCard({ results }: { results: AssessmentResultsResponse }) {
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
              {scoreData.map((score)=>(<li className="flex items-center justify-start list-disc">
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
