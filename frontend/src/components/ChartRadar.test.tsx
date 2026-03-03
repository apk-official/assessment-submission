import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChartRadar from "./ChartRadar"; // adjust if filename differs

let lastRadarChartProps: any = null;
let lastPolarAngleAxisProps: any = null;
let lastRadarProps: any = null;

vi.mock("recharts", () => {
  return {
    RadarChart: (props: any) => {
      lastRadarChartProps = props;
      return <div data-testid="radar-chart">{props.children}</div>;
    },
    PolarAngleAxis: (props: any) => {
      lastPolarAngleAxisProps = props;
      return <div data-testid="polar-angle-axis" />;
    },
    PolarGrid: () => <div data-testid="polar-grid" />,
    Radar: (props: any) => {
      lastRadarProps = props;
      return <div data-testid="radar" />;
    },
  };
});

vi.mock("./ui/chart", () => {
  return {
    ChartContainer: ({ children }: any) => (
      <div data-testid="chart-container">{children}</div>
    ),
    ChartTooltip: (props: any) => (
      <div data-testid="chart-tooltip">
        {props.content /* 👈 important */}
      </div>
    ),
    ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
  };
});

describe("<ChartRadar />", () => {
  it("transforms elementScores into chart data and passes it to RadarChart", () => {
    const elementScores = {
      a: { element: "Memory", scores: { percentage: 80 } },
      b: { element: "Logic", scores: { percentage: 60 } },
    } as any;

    render(<ChartRadar elementScores={elementScores} />);

    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart")).toBeInTheDocument();

    // Data is derived from Object.values(). Order follows insertion order of keys in most cases.
    // We'll assert content ignoring order to keep it robust.
    expect(Array.isArray(lastRadarChartProps?.data)).toBe(true);

    const data = lastRadarChartProps.data;
    expect(data).toEqual(
      expect.arrayContaining([
        { element: "Memory", score: 80 },
        { element: "Logic", score: 60 },
      ])
    );
    expect(data).toHaveLength(2);
  });

  it("wires the axis and radar keys correctly", () => {
    const elementScores = {
      a: { element: "Accuracy", scores: { percentage: 90 } },
    } as any;

    render(<ChartRadar elementScores={elementScores} />);

    expect(screen.getByTestId("polar-angle-axis")).toBeInTheDocument();
    expect(lastPolarAngleAxisProps?.dataKey).toBe("element");

    expect(screen.getByTestId("radar")).toBeInTheDocument();
    expect(lastRadarProps?.dataKey).toBe("score");
    expect(lastRadarProps?.stroke).toBe("var(--color-score)");
    expect(lastRadarProps?.fill).toBe("var(--color-score)");
    expect(lastRadarProps?.strokeWidth).toBe(2);
  });

  it("includes tooltip content", () => {
    const elementScores = {
      a: { element: "Speed", scores: { percentage: 70 } },
    } as any;

    render(<ChartRadar elementScores={elementScores} />);

    expect(screen.getByTestId("chart-tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("chart-tooltip-content")).toBeInTheDocument();
  });
});