import { FilePdfIcon } from "@phosphor-icons/react";
import ElementSelector from "./ElementSelector";
import { Button } from "./ui/button";

export default function PageActions({
  element,
  onExportPdf,
}: {
    element: string;
  onExportPdf: () => void;
}) {
  return (
      <div className="w-full flex items-center justify-between mt-2">
          <ElementSelector element={element}/>
          <Button variant="outline" onClick={onExportPdf} className="flex items-center justify-items-center border-red-700 dark:border-neutral-200 text-red-700 dark:text-neutral-200 shadow-none cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-neutral-200 dark:hover:text-red-700"><FilePdfIcon size={30}/>Export as PDF</Button>
    </div>
  )
}
