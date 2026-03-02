import ChartRadar from "./ChartRadar";


export default function ScoreCard() {
  const overallPercentage = 53.2;
  const scoreData = [
    {
      label: "Element",
      value:"1.1"
    },
    {
      label: "Overall Score",
      value: `${overallPercentage}%`
    },
    {
      label: "Points",
      value:"9/15"
    },
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
              <ChartRadar />
            </div>
          </div>
        </div>
  )
}
