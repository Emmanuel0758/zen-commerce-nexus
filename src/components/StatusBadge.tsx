
import { cn } from "@/lib/utils";

type StatusProps = {
  status: "pending" | "processing" | "completed" | "cancelled" | "onhold" | "lowstock" | "instock" | "outofstock";
  className?: string;
};

export function StatusBadge({ status, className }: StatusProps) {
  const statusStyles = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    onhold: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    lowstock: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    instock: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    outofstock: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const statusLabels = {
    pending: "En attente",
    processing: "En traitement",
    completed: "Terminé",
    cancelled: "Annulé",
    onhold: "En attente",
    lowstock: "Stock bas",
    instock: "En stock",
    outofstock: "Rupture",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
