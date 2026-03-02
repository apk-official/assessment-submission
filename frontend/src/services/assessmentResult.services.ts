
import { apiClient } from "./apiClient";
import type { AssessmentResultsResponse } from "@/types/assessmentResults";

export const AssessmentResultsService = {
  getByInstanceId: async (instanceId: string): Promise<AssessmentResultsResponse> => {
    const { data } = await apiClient.get<AssessmentResultsResponse>(
      `/api/assessment/results/${instanceId}`
    );
    return data;
  },
};