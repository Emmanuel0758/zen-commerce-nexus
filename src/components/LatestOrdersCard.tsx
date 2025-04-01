
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "onhold";
};

const demoOrders: Order[] = [
  {
    id: "ZEN-1049",
    customer: "Sophie Martin",
    date: "2023-07-15",
    total: "79,99 €",
    status: "completed",
  },
  {
    id: "ZEN-1048",
    customer: "Thomas Bernard",
    date: "2023-07-15",
    total: "19,99 €",
    status: "processing",
  },
  {
    id: "ZEN-1047",
    customer: "Emma Dubois",
    date: "2023-07-14",
    total: "39,99 €",
    status: "processing",
  },
  {
    id: "ZEN-1046",
    customer: "Alexandre Petit",
    date: "2023-07-14",
    total: "59,99 €",
    status: "pending",
  },
  {
    id: "ZEN-1045",
    customer: "Chloé Robert",
    date: "2023-07-13",
    total: "29,99 €",
    status: "cancelled",
  },
];

export function LatestOrdersCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Dernières commandes</CardTitle>
        <a href="/commandes" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Voir toutes
        </a>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium py-2">Commande</th>
                <th className="text-left font-medium py-2">Client</th>
                <th className="text-left font-medium py-2">Date</th>
                <th className="text-right font-medium py-2">Total</th>
                <th className="text-left font-medium py-2">État</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2 text-right">{order.total}</td>
                  <td className="py-2">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
