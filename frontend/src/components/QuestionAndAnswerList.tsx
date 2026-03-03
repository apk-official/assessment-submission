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

export default function QuestionAndAnswerList({
  questions,
}: {
  questions: QuestionAnswer[];
}) {
  return (
    <Item className="p-0 w-full mt-2">
  {questions.map((question)=>(<ItemContent className="p-2 rounded-md w-full bg-neutral-100 dark:bg-neutral-800 gap-2">
    <ItemTitle className="text-neutral-800 dark:text-neutral-100">{question.question_sequence }) {question.question_title }</ItemTitle>
  </ItemContent>))}
</Item>
  )
}
