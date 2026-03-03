import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChartBar } from "./ChartBar";

// Capture props passed to these mocked components
let lastXAxisProps: any = null;
let lastBarProps: any = null;

// Mock Recharts components
vi.mock("recharts", () => {
  return {
    BarChart: ({ children, data }: any) => (
      <div data-testid="barchart" data-count={data?.length ?? 0}>
        {children}
      </div>
    ),
    CartesianGrid: () => <div data-testid="grid" />,
    XAxis: (props: any) => {
      lastXAxisProps = props;
      return <div data-testid="xaxis" />;
    },
    Bar: (props: any) => {
      lastBarProps = props;
      return <div data-testid="bar" />;
    },
  };
});

// Mock your shared chart wrapper components
vi.mock("@/components/ui/chart", () => {
  return {
    ChartContainer: ({ children }: any) => (
      <div data-testid="chart-container">{children}</div>
    ),
    ChartTooltip: () => <div data-testid="chart-tooltip" />,
    ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
    ChartLegend: () => <div data-testid="chart-legend" />,
    ChartLegendContent: () => <div data-testid="chart-legend-content" />,
  };
});

describe("<ChartBar />", () => {
  it("renders the chart container and passes data to BarChart", () => {
    render(
      <ChartBar
        data={[
          { question: "Q1", score: 2 },
          { question: "Q2", score: 5 },
        ]}
      />
    );

    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("barchart")).toHaveAttribute("data-count", "2");
  });

  it("wires XAxis to the 'question' key and truncates labels to 3 chars", () => {
    render(<ChartBar data={[{ question: "QuestionOne", score: 10 }]} />);

    expect(screen.getByTestId("xaxis")).toBeInTheDocument();
    expect(lastXAxisProps?.dataKey).toBe("question");
    expect(typeof lastXAxisProps?.tickFormatter).toBe("function");

    // Verify your formatting rule: value.slice(0, 3)
    expect(lastXAxisProps.tickFormatter("QuestionOne")).toBe("Que");
    expect(lastXAxisProps.tickFormatter("AB")).toBe("AB"); // short strings should remain safe
  });

  it("wires Bar to the 'score' key and uses the CSS variable fill", () => {
    render(<ChartBar data={[{ question: "Q1", score: 2 }]} />);

    expect(screen.getByTestId("bar")).toBeInTheDocument();
    expect(lastBarProps?.dataKey).toBe("score");
    expect(lastBarProps?.fill).toBe("var(--color-score)");
    expect(lastBarProps?.radius).toBe(4);
  });
});