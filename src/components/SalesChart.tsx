
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { name: "Lun", value: 950 },
  { name: "Mar", value: 1100 },
  { name: "Mer", value: 800 },
  { name: "Jeu", value: 1300 },
  { name: "Ven", value: 1450 },
  { name: "Sam", value: 1050 },
  { name: "Dim", value: 1250 },
];

const weeklyData = [
  { name: "Sem 1", value: 6500 },
  { name: "Sem 2", value: 7800 },
  { name: "Sem 3", value: 9200 },
  { name: "Sem 4", value: 8300 },
];

const monthlyData = [
  { name: "Jan", value: 28000 },
  { name: "Fév", value: 25500 },
  { name: "Mar", value: 32000 },
  { name: "Avr", value: 30500 },
  { name: "Mai", value: 28000 },
  { name: "Juin", value: 29000 },
  { name: "Juil", value: 31000 },
];

type TimeRange = "daily" | "weekly" | "monthly";

export function SalesChart() {
  const [range, setRange] = useState<TimeRange>("daily");

  let chartData;
  let chartTitle;
  
  switch (range) {
    case "daily":
      chartData = dailyData;
      chartTitle = "Ventes journalières";
      break;
    case "weekly":
      chartData = weeklyData;
      chartTitle = "Ventes hebdomadaires";
      break;
    case "monthly":
      chartData = monthlyData;
      chartTitle = "Ventes mensuelles";
      break;
    default:
      chartData = dailyData;
      chartTitle = "Ventes journalières";
  }

  const formatValue = (value: number) => {
    return `${value.toLocaleString()} €`;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{chartTitle}</CardTitle>
        <div className="space-x-2">
          <button
            onClick={() => setRange("daily")}
            className={`px-2 py-1 text-xs rounded ${
              range === "daily"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Jour
          </button>
          <button
            onClick={() => setRange("weekly")}
            className={`px-2 py-1 text-xs rounded ${
              range === "weekly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setRange("monthly")}
            className={`px-2 py-1 text-xs rounded ${
              range === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Mois
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis
                tickFormatter={(value) => `${value} €`}
                className="text-xs"
              />
              <Tooltip
                formatter={(value) => [formatValue(Number(value)), "Ventes"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
