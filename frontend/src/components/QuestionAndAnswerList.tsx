import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "./ui/button"
import { QuestionAnswer } from "@/types/assessmentResults";
type QuestionAndAnswerListProps = {
  /**
   * Ordered list of assessment questions.
   * Expected to be pre-sorted before being passed in.
   */
  questions: QuestionAnswer[];
};
/**
 ** <QuestionAndAnswerList />
 *
 * Displays a summarised list of assessment questions.
 *
 ** Responsibilities:
 * - Renders question sequence and title in a compact list format.
 * - Provides a lightweight overview version of questions
 *   (without answers or scoring details).
 *
 * Notes:
 * - Pure presentational component.
 * - Intended to complement the detailed dialog view.
 */
export default function QuestionAndAnswerList({
  questions,
}:QuestionAndAnswerListProps) {
  return (
    <Item className="p-0 w-full mt-2">
  {questions.map((question)=>(<ItemContent key={question.question_id} className="p-2 rounded-md w-full bg-neutral-100 dark:bg-neutral-800 gap-2">
    <ItemTitle className="text-neutral-800 dark:text-neutral-100">{question.question_sequence }) {question.question_title }</ItemTitle>
  </ItemContent>))}
</Item>
  )
}
