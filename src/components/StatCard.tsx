
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  type?: "sales" | "orders" | "inventory" | "delivery";
  className?: string;
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  type = "sales",
  className,
}: StatCardProps) {
  const typeCn = {
    sales: "stat-sales",
    orders: "stat-orders",
    inventory: "stat-inventory",
    delivery: "stat-delivery",
  };

  const trendCn = trend ? (trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400") : "";
  const trendIcon = trend ? (
    trend > 0 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  ) : null;

  return (
    <Card className={cn("stat-card", typeCn[type], className)}>
      <div className="flex justify-between items-start">
        <div className="text-muted-foreground text-sm">{title}</div>
        <div className="p-1 rounded-full bg-background/20">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {trend !== undefined && (
        <div className={cn("flex items-center text-xs font-medium", trendCn)}>
          {trendIcon}
          <span>{Math.abs(trend)}% vs mois précédent</span>
        </div>
      )}
    </Card>
  );
}
