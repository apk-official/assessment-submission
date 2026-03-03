import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CompletionCard from "./CompletionCard";

// Mock ChartRadial so this test doesn't depend on chart rendering details
vi.mock("./ChartRadial", () => ({
  ChartRadial: ({ percentage }: { percentage: number }) => (
    <div data-testid="chart-radial">percent:{percentage}</div>
  ),
}));

describe("<CompletionCard />", () => {
  it("renders the overview heading and key labels", () => {
    render(
      <CompletionCard
        totalQuestions={50}
        answeredQuestions={20}
        completionPercentage={40}
      />
    );

    expect(
      screen.getByRole("heading", { name: /overview/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/total no\. of questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/total no\. of answered questions/i)
    ).toBeInTheDocument();
  });

  it("renders the total and answered question counts", () => {
    render(
      <CompletionCard
        totalQuestions={50}
        answeredQuestions={20}
        completionPercentage={40}
      />
    );

    // These are <p> elements, so simplest is text assertions
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("passes completionPercentage to ChartRadial", () => {
    render(
      <CompletionCard
        totalQuestions={10}
        answeredQuestions={7}
        completionPercentage={70}
      />
    );

    expect(screen.getByTestId("chart-radial")).toHaveTextContent("percent:70");
  });
});