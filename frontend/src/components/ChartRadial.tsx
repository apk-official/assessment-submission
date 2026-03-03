import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartConfig = {
  completed: {
    label: "completed",
    color: "#2563eb",
  },
} satisfies ChartConfig;
type ChartRadialProps = {
  /**
   * Completion percentage (expected range: 0–100).
   * Values outside range are clamped internally.
   */
  percentage: number;
};
/**
 * <ChartRadial />
 *
 * Visualises completion as a radial progress indicator with a center label.
 *
 * Responsibilities:
 * - Clamps the input `percentage` to a safe 0–100 range.
 * - Builds a small Recharts dataset for a single radial bar.
 * - Uses a fixed angle-axis domain so values scale consistently (e.g., 50 always renders as half of the configured sweep).
 * - Displays the percentage value and a "Completed" caption in the center.
 *
 * Notes:
 * - Uses a slight 100% adjustment (`99.999`) to avoid occasional full-sweep rendering quirks in Recharts.
 * - The visible sweep is controlled by `startAngle`/`endAngle` (currently configured as a half-circle).
 */
export function ChartRadial({ percentage }: ChartRadialProps) {
  const safe = Number.isFinite(percentage)
    ? Math.max(0, Math.min(100, percentage))
    : 0;
  // Recharts can be quirky when the sweep is exactly 360 degrees.
  // This keeps the "full" ring visually full without edge-case rendering issues.
  const displayValue = safe === 100 ? 99.999 : safe;

  const chartData = [{ completed: displayValue, fill: "#2563eb" }];

  return (
    <ChartContainer config={chartConfig} className="h-28 w-32">
      <RadialBarChart
        data={chartData}
        startAngle={180}
        endAngle={-180}
        innerRadius={50}
        outerRadius={70}
      >
        {/* CRITICAL: fixed domain so 50 renders as half, not "full" */}
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-background last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="completed" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-medium font-sans"
                    >
                      {displayValue}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Completed
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
