import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import QuestionAndAnswerFilter from "./QuestionAndAnswerFilter";
import { ButtonGroup } from "./ui/button-group";
export default function QuestionAndAnswerInDetail() {
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
      <DialogContent className="border dark:border-gray-700 border-gray-300 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Question and Answer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <QuestionAndAnswerFilter />
          <h3>1) How confident are you in planning engaging lessons?</h3>
          {/* Multiple Question Answer  */}
          <div className="flex items-center justify-start w-full border border-green-300 bg-green-100 dark:bg-green-800 dark:border-green-500 p-2 gap-2 rounded-xl text-sm">
            <CheckCircleIcon
              size={20}
              className="text-green-600 dark:text-gray-50"
            />
            <p className="dark:text-gray-300">Always</p>
          </div>
          {/* Reflective Question  */}
          {/* <div className="flex items-center justify-start w-full border border-gray-300 bg-gray-100 dark:bg-green-800 dark:border-green-500 p-2 gap-2 rounded-xl text-sm">
            <p className="dark:text-gray-300">Something something...</p>
          </div> */}
          <Badge
            className="w-fit rounded-full border-amber-300 bg-amber-100 dark:text-gray-900 dark:bg-amber-300 dark:border-amber-200"
            variant="outline"
          >
            Score: 4/5
          </Badge>
        </div>
        <DialogFooter className="flex items-center justify-end w-full">
          <div className="flex items-center justify-center gap-2">
            <ButtonGroup>
              <Button
                variant="outline"
                className="shadow-none p-3 cursor-pointer"
              >
                <CaretLeftIcon size={20} />
              </Button>
            </ButtonGroup>
            <p className="">1/4</p>
            <ButtonGroup>
              <Button
                variant="outline"
                className="shadow-none p-3 cursor-pointer"
              >
                <CaretRightIcon size={20} />
              </Button>
            </ButtonGroup>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
