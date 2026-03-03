import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "./Dashboard"; // <-- adjust path

// --- Mock child components to keep Dashboard tests focused ---
vi.mock("@/components/DashboardSkeleton", () => ({
  default: () => <div data-testid="dashboard-skeleton" />,
}));

vi.mock("@/components/Empty", () => ({
  default: () => <div data-testid="empty" />,
}));

vi.mock("@/components/Error", () => ({
  default: ({ error }: { error: string }) => (
    <div data-testid="error">{error}</div>
  ),
}));

vi.mock("@/components/PageHeader", () => ({
  default: ({ instance }: any) => (
    <div data-testid="page-header">element:{instance?.element}</div>
  ),
}));

vi.mock("@/components/PageActions", () => ({
  default: ({ element }: any) => (
    <div data-testid="page-actions">element:{element}</div>
  ),
}));

vi.mock("@/components/CompletionCard", () => ({
  default: (props: any) => (
    <div data-testid="completion-card">
      total:{props.totalQuestions} answered:{props.answeredQuestions} pct:
      {props.completionPercentage}
    </div>
  ),
}));

vi.mock("@/components/ScoreCard", () => ({
  default: () => <div data-testid="score-card" />,
}));

vi.mock("@/components/InsightsCard", () => ({
  default: () => <div data-testid="insights-card" />,
}));

// Capture derived props for verification
vi.mock("@/components/QuestionListCard", () => ({
  default: ({ questions }: any) => (
    <div data-testid="question-list">
      {questions.map((q: any) => q.question_sequence).join(",")}
    </div>
  ),
}));

vi.mock("@/components/ScorePerQuestionChartCard", () => ({
  default: ({ data }: any) => (
    <pre data-testid="score-per-question-data">{JSON.stringify(data)}</pre>
  ),
}));

// --- Mock the service ---
const getByInstanceIdMock = vi.fn();

vi.mock("@/services/assessmentResult.services", () => ({
  AssessmentResultsService: {
    getByInstanceId: (...args: any[]) => getByInstanceIdMock(...args),
  },
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (err: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe("<Dashboard />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows Empty when instanceId is missing and does not fetch", async () => {
    render(<Dashboard />);

    expect(screen.getByTestId("empty")).toBeInTheDocument();
    expect(getByInstanceIdMock).not.toHaveBeenCalled();
  });

  it("shows loading then renders the dashboard on success (and derives sorted questions + chart data)", async () => {
    const d = deferred<any>();
    getByInstanceIdMock.mockReturnValueOnce(d.promise);

    render(<Dashboard instanceId="abc-123" />);

    // loading state appears immediately
    expect(screen.getByTestId("dashboard-skeleton")).toBeInTheDocument();
    expect(getByInstanceIdMock).toHaveBeenCalledWith("abc-123");

    const results = {
      instance: { element: "E1" },
      total_questions: 5,
      answered_questions: 3,
      completion_percentage: 60,
      insights: [],
      element_scores: {
        E1: {
          element: "E1",
          scores: { percentage: 75 },
          question_answers: [
            // intentionally unsorted
            { question_sequence: 3, answer_value: null },
            { question_sequence: 1, answer_value: 2 },
            { question_sequence: 2, answer_value: 4 },
          ],
        },
      },
    };

    d.resolve(results);

    // wait for success UI to appear
    await waitFor(() =>
      expect(screen.queryByTestId("dashboard-skeleton")).not.toBeInTheDocument()
    );

    // core dashboard pieces
    expect(screen.getByTestId("page-header")).toHaveTextContent("element:E1");
    expect(screen.getByTestId("page-actions")).toHaveTextContent("element:E1");

    // CompletionCard props wired from results
    expect(screen.getByTestId("completion-card")).toHaveTextContent(
      "total:5 answered:3 pct:60"
    );

    // Derived questions should be sorted by sequence: 1,2,3
    expect(screen.getByTestId("question-list")).toHaveTextContent("1,2,3");

    // Derived chart data should map null answer_value -> 0 and label Q{sequence}
    const chartDataJson = screen.getByTestId("score-per-question-data")
      .textContent;

    expect(chartDataJson).toContain('"question":"Q1"');
    expect(chartDataJson).toContain('"score":2');
    expect(chartDataJson).toContain('"question":"Q2"');
    expect(chartDataJson).toContain('"score":4');
    expect(chartDataJson).toContain('"question":"Q3"');
    expect(chartDataJson).toContain('"score":0');
  });

  it("shows Error when the fetch fails (uses fallback message if no API error)", async () => {
    getByInstanceIdMock.mockRejectedValueOnce(new Error("boom"));

    render(<Dashboard instanceId="abc-err" />);

    // loading first
    expect(screen.getByTestId("dashboard-skeleton")).toBeInTheDocument();

    // then error
    const err = await screen.findByTestId("error");
    expect(err).toHaveTextContent("Failed to load assessment results.");
  });

  it("uses API error message if available (e.response.data.error)", async () => {
    getByInstanceIdMock.mockRejectedValueOnce({
      response: { data: { error: "Instance not found" } },
    });

    render(<Dashboard instanceId="missing" />);

    const err = await screen.findByTestId("error");
    expect(err).toHaveTextContent("Instance not found");
  });
});