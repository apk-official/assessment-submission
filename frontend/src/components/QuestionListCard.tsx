import { QuestionAnswer } from "@/types/assessmentResults";
import QuestionAndAnswerInDetail from "./QuestionAndAnswerInDetail";
import QuestionAndAnswerList from "./QuestionAndAnswerList";
type QuestionListCardProps = {
  /**
   * Ordered list of assessment questions and corresponding answers.
   */
  questions: QuestionAnswer[];
};
/**
 * <QuestionListCard />
 *
 * Displays an overview of assessment questions and their answers.
 *
 * Responsibilities:
 * - Renders a section header for the question overview.
 * - Provides access to a detailed question view (`QuestionAndAnswerInDetail`).
 * - Displays a summarized list of questions and answers via `QuestionAndAnswerList`.
 *
 * Notes:
 * - Expects questions to already be sorted before being passed in.
 * - Pure presentational component; does not transform or mutate question data.
 */
export default function QuestionListCard({questions,
}:QuestionListCardProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 h-full rounded-xl p-4 flex flex-col items-start justify-start gap-2 font-sans text-gray-800 dark:text-gray-100 w-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="font-medium">Assessment Question Overview</h3>
      <div className="flex items-center">
        <QuestionAndAnswerInDetail questions={questions}/>
      </div>
      </div>
      
      <QuestionAndAnswerList questions={questions}/>
    </div>
  );
}
