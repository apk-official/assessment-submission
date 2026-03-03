import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  XCircleIcon,
} from "@phosphor-icons/react";
import QuestionAndAnswerFilter from "./QuestionAndAnswerFilter";
import { QuestionAnswer } from "@/types/assessmentResults";
import { ScrollArea } from "./ui/scroll-area";
import { useMemo, useState } from "react";
import type { QAFilter } from "./QuestionAndAnswerFilter";


export default function QuestionAndAnswerInDetail({
  questions,
}: {
  questions: QuestionAnswer[];
  }) {
  const [filter, setFilter] = useState<QAFilter>("all");

  const filteredQuestions = useMemo(() => {
  switch (filter) {
    case "answered":
      return questions.filter((q) => q.is_answered);
    case "unanswered":
      return questions.filter((q) => !q.is_answered);
    default:
      return questions;
  }
  }, [questions, filter]);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center justify-center shadow-none cursor-pointer"
        >
          View in detail
        </Button>
      </DialogTrigger>
      <DialogContent className="border dark:border-gray-700 border-gray-300 dark:text-gray-200 h-80 flex flex-col items-start">
        <DialogHeader>
          <DialogTitle>Question and Answer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <QuestionAndAnswerFilter value={filter} onChange={setFilter}/>
          <ScrollArea className="h-50">
            {filteredQuestions.map((question) =>
              question.is_reflection ? (
                <div
                  key={question.question_sequence}
                  className="flex flex-col w-full gap-2"
                >
                  <h3 className="mt-2">
                    {question.question_sequence}) {question.reflection_prompt}
                  </h3>
                  {question.is_answered ? (
                    <div className="flex items-center justify-start w-full border  bg-neutral-200 dark:bg-neutral-700 border-none  p-2 gap-1 rounded-xl text-sm">
                      <p className="dark:text-gray-300">
                        {question.answer_text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-start w-full p-2 gap-2 text-sm">
                      <p className=" flex items-center justify-center text-red-600 dark:text-red-600"><XCircleIcon size={20} weight="fill"/> Not Answered</p>
                    </div>
                  )}
                  <Badge
                    className="w-fit rounded-full border-amber-300 bg-amber-100 dark:text-gray-900 dark:bg-amber-300 dark:border-amber-200"
                    variant="outline"
                  >
                    Reflection
                  </Badge>
                </div>
              ) : (
                <div
                  key={question.question_sequence}
                  className="flex flex-col w-full gap-3"
                >
                  <h3 className="mt-2">
                    {question.question_sequence}) {question.question_title}
                  </h3>
                  {question.is_answered ? (
                    <div className="flex items-center justify-start w-full border  bg-neutral-200 dark:bg-neutral-700 border-none  p-2 gap-2 rounded-xl text-sm">
                      <p className="dark:text-gray-300">
                        {question.answer_text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-start w-full p-2 gap-2 text-sm">
                      <p className=" flex items-center justify-center text-red-600 dark:text-red-600"><XCircleIcon size={20} weight="fill"/> Not Answered</p>
                    </div>
                  )}
                  {question.is_answered ?(<Badge
                    className="w-fit rounded-full border-amber-300 bg-amber-100 dark:text-gray-900 dark:bg-amber-300 dark:border-amber-200"
                    variant="outline"
                  >
                    Score: {question.answer_value}/{question.max_score}
                  </Badge>):""}
                </div>
              ),
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
