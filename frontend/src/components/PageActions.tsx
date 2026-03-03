import { FilePdfIcon } from "@phosphor-icons/react";
import ElementSelector from "./ElementSelector";
import { Button } from "./ui/button";
import { AssessmentResultsResponse } from "@/types/assessmentResults";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AssessmentReportPdf from "./pdf/AssesmentReportPdf";

export default function PageActions({
  element,
  results,
}: {
    element: string;
  results: AssessmentResultsResponse;
}) {
  return (
      <div className="w-full flex items-center justify-between mt-2">
      <ElementSelector element={element} />
      <PDFDownloadLink
        document={<AssessmentReportPdf results={results} />}
        fileName="assessment-results.pdf"
        style={{ textDecoration: "none" }}
      >
        {({ loading }) => (
          <Button variant="outline" className="flex items-center justify-items-center border-red-700 dark:border-neutral-200 text-red-700 dark:text-neutral-200 shadow-none cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-neutral-200 dark:hover:text-red-700"><FilePdfIcon size={30}/>{loading ? "Preparing PDF..." : "Export as PDF"}</Button>
        )}
      </PDFDownloadLink>
          
    </div>
  )
}
