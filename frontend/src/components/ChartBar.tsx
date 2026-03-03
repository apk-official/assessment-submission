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

export function ChartBar({
  data,
}: {
  data: { question: string; score: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
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
