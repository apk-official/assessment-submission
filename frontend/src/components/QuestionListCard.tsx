import QuestionAndAnswerInDetail from "./QuestionAndAnswerInDetail";
import QuestionAndAnswerList from "./QuestionAndAnswerList";

export default function QuestionListCard() {
  return (
    <div className="border border-gray-300 dark:border-gray-700 h-full rounded-xl p-4 flex flex-col items-start justify-start gap-2 font-sans text-gray-800 dark:text-gray-100 w-full">
      <div className="flex items-center justify-between w-full">
        <h3>Questions and Answer</h3>
      <div className="flex items-center">
        <QuestionAndAnswerInDetail/>
      </div>
      </div>
      
      <QuestionAndAnswerList/>
    </div>
  );
}
