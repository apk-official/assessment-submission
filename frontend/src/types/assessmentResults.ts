export interface Insight {
  type: string;
  message: string;
  positive: boolean;
}

export interface ScoresSummary {
  total_score: number;
  max_score: number;
  percentage: number;
  element?: string;
}

export interface QuestionAnswer {
  question_id: string;
  question_title: string;
  question_sequence: number;
  is_reflection: boolean;
  reflection_prompt: string | null;
  max_score: number;
  is_answered: boolean;
  answer_value: number | null;
  answer_text: string | null;
  option_number?: number | null;
}
// Score breakdown for one assessment element.
export interface ElementScore {
  element: string;
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  scores: ScoresSummary;
  question_answers: QuestionAnswer[];
}
// API response for a single assessment instance.
export interface AssessmentResultsResponse {
  instance: {
    id: string;
    completed: boolean;
    created_at: string;
    completed_at: string | null;
    element: string;
    responder_name:string
  };
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  scores: ScoresSummary;
  // Element-level breakdown keyed by element identifier (e.g. "1.1").
  element_scores: Record<string, ElementScore>;
  insights: Insight[];
}
