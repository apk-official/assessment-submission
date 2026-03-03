import { AssessmentResultsResponse } from "@/types/assessmentResults";

export default function PageHeader({
  instance,
}: {
  instance: AssessmentResultsResponse["instance"];
}) {
  const formattedDate = instance.created_at
    ? new Date(instance.created_at).toLocaleDateString()
    : "N/A";
  return (
    <div className="flex flex-col text-gray-900 dark:text-gray-100 font-sans">
          <h3 className="text-xl font-medium">{instance.responder_name} <span className="text-gray-500 font-light text-lg">({instance.id})</span></h3>
          <p className="text-sm text-gray-500 ">Created at: {formattedDate}</p>
    </div>
  );
}
