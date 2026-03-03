/**
 * Insight
 *
 * Represents a contextual insight generated from assessment results.
 * Includes:
 * - `type`: category of insight (e.g., "performance", "completion")
 * - `message`: human-readable description
 * - `positive`: indicates positive or negative outcome
 */
export interface Insight {
  type: string;
  message: string;
  positive: boolean;
}
/**
 * ScoresSummary
 *
 * Aggregated scoring information for an assessment or element.
 * Includes total score, maximum score, calculated percentage,
 * and optional associated element identifier.
 */
export interface ScoresSummary {
  total_score: number;
  max_score: number;
  percentage: number;
  element?: string;
}
/**
 * QuestionAnswer
 *
 * Represents a single question and its answer details.
 * Covers both standard and reflection-type questions.
 * Includes metadata (sequence, type), answer state,
 * scoring details, and optional selection/text data.
 */
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
  text_answer?: string | null;
  option_number?: number | null;
}
/**
 * ElementScore
 *
 * Score breakdown for a single assessment element.
 * Includes completion metrics, aggregated scores,
 * and detailed question-level answers.
 */
export interface ElementScore {
  element: string;
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  scores: ScoresSummary;
  question_answers: QuestionAnswer[];
}
/**
 * AssessmentResultsResponse
 *
 * Root API response structure for a single assessment instance.
 * Contains:
 * - Instance metadata
 * - Overall completion and scoring summary
 * - Element-level breakdown (keyed by element identifier)
 * - Generated insights
 */
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
