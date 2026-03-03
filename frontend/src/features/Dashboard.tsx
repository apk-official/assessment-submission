import CompletionCard from "@/components/CompletionCard";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import InsightsCard from "@/components/InsightsCard";
import PageActions from "@/components/PageActions";
import PageHeader from "@/components/PageHeader";
import QuestionListCard from "@/components/QuestionListCard";
import ScoreCard from "@/components/ScoreCard";
import ScorePerQuestionChartCard from "@/components/ScorePerQuestionChartCard";
import { AssessmentResultsService } from "@/services/assessmentResult.services";
import { AssessmentResultsResponse, QuestionAnswer } from "@/types/assessmentResults";
import { useEffect, useMemo, useRef, useState } from "react";


export default function Dashboard({instanceId}) {
 
  const [results, setResults] = useState<AssessmentResultsResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!instanceId) {
    setResults(null)
    setError(null)
    return
  }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await AssessmentResultsService.getByInstanceId(instanceId);
        setResults(data);
      } catch (e: any) {
        setResults(null);
        setError(
          e?.response?.data?.error || "Failed to load assessment results.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [instanceId]);
//Transforming Question data from result
  const questions = useMemo<QuestionAnswer[]>(() => {
  if (!results) return [];

  const elementScore =
    results.element_scores[results.instance.element] ??
    Object.values(results.element_scores)[0];

  return [...elementScore.question_answers].sort(
    (a, b) => a.question_sequence - b.question_sequence
  );
  }, [results]);

  //Creating scorePerQuestionData data for chart
  const scorePerQuestionData = useMemo(() => {
  return questions.map((q) => ({
    question: `Q${q.question_sequence}`,
    score: q.answer_value ?? 0, // null becomes 0 for chart
  }));
  }, [questions]);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* states */}
      {loading && <DashboardSkeleton />}
      {!loading && error && <Error error={error } />}
      {!loading && !error && !results && <Empty />}
      {!loading && !error && results && (
        <div className="flex h-full flex-col gap-6" ref={pdfRef}>
          <div className="shrink-0">
            <PageHeader instance={results.instance}/>
            <PageActions element={results.instance.element} results={results}/>
          </div>
          {/* Grid Layout */}
          <div className="flex-1">
            <div className="grid min-h-full lg:h-full gap-3 lg:gap-6 grid-cols-3 grid-rows-14 lg:grid-cols-6 lg:grid-rows-6">
              {/* div 1 */}
              <div className="col-span-3 row-span-2 lg:col-span-2 lg:row-start-1">
                <CompletionCard  totalQuestions={results.total_questions}
  answeredQuestions={results.answered_questions}
  completionPercentage={results.completion_percentage}/>
              </div>
              {/* div2 (starts at column 3 automatically) */}
              <div className="col-span-3 row-span-2 lg:col-span-2 row-start-3 col-start-1 lg:row-start-1">
                <ScoreCard results={results}/>
              </div>
              {/* div3 (starts at column 5 automatically) */}
              <div className="col-span-3 row-span-2 lg:col-span-2 row-start-5 col-start-1 lg:row-start-1">
                <InsightsCard insights={results.insights}/>
              </div>

              {/* div4 (row start 3, spans 4 rows, spans 3 cols) */}
              <div className="col-span-3 row-span-4 row-start-7 col-start-1 lg:row-start-3">
                <QuestionListCard questions={questions}/>
              </div>

              {/* div5 (row start 3, col start 4, spans 4 rows, spans 3 cols) */}
              <div className="col-span-3 row-span-4 row-start-11 col-start-1 lg:row-start-3 lg:col-start-4">
                <ScorePerQuestionChartCard data={scorePerQuestionData}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
