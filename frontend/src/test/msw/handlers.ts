import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/assessment/results/:instanceId", ({ params }) => {
    const { instanceId } = params;

    return HttpResponse.json({
      instance: { element: "E1", id: instanceId },
      total_questions: 5,
      answered_questions: 3,
      completion_percentage: 60,
      insights: [],
      element_scores: {
        E1: {
          element: "E1",
          scores: { percentage: 75 },
          question_answers: [
            { question_sequence: 2, answer_value: 4 },
            { question_sequence: 1, answer_value: 2 },
            { question_sequence: 3, answer_value: null },
          ],
        },
      },
    });
  }),
];