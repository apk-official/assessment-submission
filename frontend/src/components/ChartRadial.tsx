import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartData = [{ completed: 50, fill: "#2563eb" }];

const chartConfig = {
  completed: {
    label: "completed",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function ChartRadial() {
  const total = 100;
  const completed = 50;
  const percentage = (completed / total) * 100;
  const endAngle = (percentage / 100) * 360;
  return (
    <ChartContainer config={chartConfig} className="h-28 w-32">
      <RadialBarChart
        data={chartData}
        startAngle={180}
        endAngle={180 - endAngle}
        innerRadius={50}
        outerRadius={70}
      >
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
                      {percentage}%
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
