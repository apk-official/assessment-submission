import { DotOutlineIcon } from "@phosphor-icons/react";
import { ChartRadial } from "./ChartRadial";

export default function CompletionCard() {
  return (
    <div className="border h-full border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
      <h3 className="text-gray-800 dark:text-gray-100 ">Overview</h3>
      <div className="flex items-center justify-between">
        <ul>
          {/* Total Number of Questions  */}
          <li className="flex items-center justify-start list-disc">
            <div className="flex flex-col items-start justify-start">
               <p className="text-sm text-neutral-500 dark:text-neutral-300">Total No. of Questions</p>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100">4</p> 
            </div>
          </li>
          {/* Total Answered Questions  */}
          <li className="flex items-center justify-start list-disc">
            <div className="flex flex-col items-start justify-start">
               <p className="text-sm text-neutral-500 dark:text-neutral-300">Total No. of Answered Questions</p>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100">2</p> 
            </div>
                
          </li>
        </ul>
        <div className="shrink-0">
          {" "}
          {/* prevent flex stretching */}
          <ChartRadial />
        </div>
      </div>
    </div>
  );
}
