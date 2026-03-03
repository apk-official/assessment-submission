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

export default function ChartRadar({
  elementScores,
}: {
  elementScores: Record<string, ElementScore>;
}) {
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
