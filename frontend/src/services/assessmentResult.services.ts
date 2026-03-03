
import { apiClient } from "./apiClient";
import type { AssessmentResultsResponse } from "@/types/assessmentResults";
/**
 * AssessmentResultsService
 *
 * Service layer responsible for retrieving assessment result data
 * from the backend API.
 *
 * Responsibilities:
 * - Encapsulates API endpoint details.
 * - Returns strongly typed response data.
 * - Keeps HTTP logic separate from UI components.
 *
 * Notes:
 * - Uses the shared `apiClient` instance.
 * - Errors are propagated to the caller for handling.
 */
export const AssessmentResultsService = {
  getByInstanceId: async (instanceId: string): Promise<AssessmentResultsResponse> => {
    const { data } = await apiClient.get<AssessmentResultsResponse>(
      `/api/assessment/results/${instanceId}`
    );
    return data;
  },
};