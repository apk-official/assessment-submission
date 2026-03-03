import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfig = {
  score: {
    label: "score",
    color: "#2563eb",
  },
} satisfies ChartConfig;
type ChartBarProps = {
  /**
   * Chart-ready data representing per-question scores.
   * Each entry contains:
   * - `question`: x-axis label
   * - `score`: numeric value to plot
   */
  data: { question: string; score: number }[];
};
/**
 * <ChartBar />
 *
 * Renders a bar chart visualising per-question scores.
 *
 * Responsibilities:
 * - Displays question labels on the x-axis.
 * - Plots score values as vertical bars.
 * - Provides tooltip and legend support via shared chart components.
 *
 * Notes:
 * - Expects preformatted, chart-ready data.
 * - X-axis labels are truncated to 3 characters for compact display.
 * - Styling and colors are controlled through `ChartContainer` config.
 */
export function ChartBar({
  data,
}:ChartBarProps) {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full z-0">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} className="dark:bg-neutral-400" />
        <XAxis
          dataKey="question"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent className="text-neutral-800 dark:text-neutral-100"/>} />
        <ChartLegend content={<ChartLegendContent />} className="text-neutral-800 dark:text-neutral-100"/>
        <Bar dataKey="score" fill="var(--color-score)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
