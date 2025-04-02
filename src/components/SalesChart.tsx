
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
import { useAppSettings } from "@/hooks/use-app-settings";

// French data (default)
const dailyDataFr = [
  { name: "Lun", value: 950 },
  { name: "Mar", value: 1100 },
  { name: "Mer", value: 800 },
  { name: "Jeu", value: 1300 },
  { name: "Ven", value: 1450 },
  { name: "Sam", value: 1050 },
  { name: "Dim", value: 1250 },
];

const weeklyDataFr = [
  { name: "Sem 1", value: 6500 },
  { name: "Sem 2", value: 7800 },
  { name: "Sem 3", value: 9200 },
  { name: "Sem 4", value: 8300 },
];

const monthlyDataFr = [
  { name: "Jan", value: 28000 },
  { name: "Fév", value: 25500 },
  { name: "Mar", value: 32000 },
  { name: "Avr", value: 30500 },
  { name: "Mai", value: 28000 },
  { name: "Juin", value: 29000 },
  { name: "Juil", value: 31000 },
];

// English data
const dailyDataEn = [
  { name: "Mon", value: 950 },
  { name: "Tue", value: 1100 },
  { name: "Wed", value: 800 },
  { name: "Thu", value: 1300 },
  { name: "Fri", value: 1450 },
  { name: "Sat", value: 1050 },
  { name: "Sun", value: 1250 },
];

const weeklyDataEn = [
  { name: "Week 1", value: 6500 },
  { name: "Week 2", value: 7800 },
  { name: "Week 3", value: 9200 },
  { name: "Week 4", value: 8300 },
];

const monthlyDataEn = [
  { name: "Jan", value: 28000 },
  { name: "Feb", value: 25500 },
  { name: "Mar", value: 32000 },
  { name: "Apr", value: 30500 },
  { name: "May", value: 28000 },
  { name: "Jun", value: 29000 },
  { name: "Jul", value: 31000 },
];

// Translation object for UI text
const translations = {
  fr: {
    dailyTitle: "Ventes journalières",
    weeklyTitle: "Ventes hebdomadaires",
    monthlyTitle: "Ventes mensuelles",
    day: "Jour",
    week: "Semaine",
    month: "Mois",
    sales: "Ventes"
  },
  en: {
    dailyTitle: "Daily Sales",
    weeklyTitle: "Weekly Sales",
    monthlyTitle: "Monthly Sales",
    day: "Day",
    week: "Week",
    month: "Month",
    sales: "Sales"
  }
};

type TimeRange = "daily" | "weekly" | "monthly";

export function SalesChart() {
  const [range, setRange] = useState<TimeRange>("daily");
  const { settings } = useAppSettings();
  const { language } = settings;
  
  const t = translations[language];
  
  let chartData;
  let chartTitle;
  
  // Select data based on language and time range
  if (language === 'fr') {
    switch (range) {
      case "daily":
        chartData = dailyDataFr;
        chartTitle = t.dailyTitle;
        break;
      case "weekly":
        chartData = weeklyDataFr;
        chartTitle = t.weeklyTitle;
        break;
      case "monthly":
        chartData = monthlyDataFr;
        chartTitle = t.monthlyTitle;
        break;
      default:
        chartData = dailyDataFr;
        chartTitle = t.dailyTitle;
    }
  } else {
    switch (range) {
      case "daily":
        chartData = dailyDataEn;
        chartTitle = t.dailyTitle;
        break;
      case "weekly":
        chartData = weeklyDataEn;
        chartTitle = t.weeklyTitle;
        break;
      case "monthly":
        chartData = monthlyDataEn;
        chartTitle = t.monthlyTitle;
        break;
      default:
        chartData = dailyDataEn;
        chartTitle = t.dailyTitle;
    }
  }

  const formatValue = (value: number) => {
    return `${value.toLocaleString()} ${settings.currency === 'EUR' ? '€' : settings.currency}`;
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
            {t.day}
          </button>
          <button
            onClick={() => setRange("weekly")}
            className={`px-2 py-1 text-xs rounded ${
              range === "weekly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {t.week}
          </button>
          <button
            onClick={() => setRange("monthly")}
            className={`px-2 py-1 text-xs rounded ${
              range === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {t.month}
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
                tickFormatter={(value) => `${value} ${settings.currency === 'EUR' ? '€' : settings.currency}`}
                className="text-xs"
              />
              <Tooltip
                formatter={(value) => [formatValue(Number(value)), t.sales]}
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
