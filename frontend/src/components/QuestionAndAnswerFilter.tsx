import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";

const Options = [
  {
    value: "all",
    id: "all",
    label: "All",
  },
  {
    value: "answered",
    id: "answered",
    label: "Answered",
  },
  {
    value: "unanswered",
    id: "unanswered",
    label: "Unanswered",
  },
];

export default function QuestionAndAnswerFilter() {
  return (
    <RadioGroup defaultValue="all" className="flex mb-2">
      {Options.map((option) => (
        <Label
          htmlFor={option.id}
          className="flex items-center gap-1 border p-2 cursor-pointer border-gray-300 rounded-md has-[button[data-state=checked]]:border-blue-600
            has-[button[data-state=checked]]:bg-blue-200 has-[button:focus-visible]:ring-2
    has-[button:focus-visible]:ring-blue-600 dark:has-[button[data-state=checked]]:border-blue-300 dark:has-[button[data-state=checked]]:bg-blue-700 dark:text-gray-100 dark:border-gray-700"
          key={option.id}
        >
          <RadioGroupItem
            value={option.value}
            id={option.id}
            className="data-[state=checked]:border-blue-600 data-[state=checked]:text-white data-[state=checked]:[&>span>svg]:fill-blue-600 dark:data-[state=checked]:border-gray-100 dark:data-[state=checked]:text-blue-600 dark:data-[state=checked]:[&>span>svg]:fill-gray-100"
          />
          {option.label}
        </Label>
      ))}
    </RadioGroup>
  );
}
