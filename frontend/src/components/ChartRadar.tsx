import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import type { ElementScore } from "@/types/assessmentResults";
import { useMemo } from "react";

const chartConfig = {
  score: {
    label: "Score (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
type ChartRadarProps = {
  /**
   * Element-level scoring keyed by element identifier/name.
   * Each entry is mapped to `{ element, score }` for plotting.
   */
  elementScores: Record<string, ElementScore>;
};
/**
 * <ChartRadar />
 *
 * Renders an element comparison radar chart using assessment element scores.
 *
 * Responsibilities:
 * - Transforms `elementScores` into Recharts-compatible `data` points.
 * - Visualises each element's percentage score on a radar chart.
 * - Provides hover tooltip details via the shared chart tooltip components.
 *
 * Notes:
 * - This component is intended to compare multiple elements. If only a single
 *   element score is provided, the radar chart will render a minimal shape and
 *   may offer limited visual insight.
 */
export default function ChartRadar({
  elementScores,
}:ChartRadarProps) {
  const chartData = useMemo(() => {
    return Object.values(elementScores).map((e) => ({
      element: e.element,
      score: e.scores.percentage,
    }));
  }, [elementScores]);
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-62.5 h-40 w-50"
    >
      <RadarChart data={chartData}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis dataKey="element" />
        <PolarGrid radialLines={false} />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0}
          stroke="var(--color-score)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}
