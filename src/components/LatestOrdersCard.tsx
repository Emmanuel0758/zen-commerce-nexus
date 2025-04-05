
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
    total: "79 999 FCFA",
    status: "completed",
  },
  {
    id: "ZEN-1048",
    customer: "Thomas Bernard",
    date: "2023-07-15",
    total: "19 999 FCFA",
    status: "processing",
  },
  {
    id: "ZEN-1047",
    customer: "Emma Dubois",
    date: "2023-07-14",
    total: "39 999 FCFA",
    status: "processing",
  },
  {
    id: "ZEN-1046",
    customer: "Alexandre Petit",
    date: "2023-07-14",
    total: "59 999 FCFA",
    status: "pending",
  },
  {
    id: "ZEN-1045",
    customer: "Chloé Robert",
    date: "2023-07-13",
    total: "29 999 FCFA",
    status: "cancelled",
  },
];

export function LatestOrdersCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = demoOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Dernières commandes</CardTitle>
        <a href="/commandes" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Voir toutes
        </a>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="search"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto"
            />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="onhold">En attente de validation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {filteredOrders.map((order) => (
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
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
