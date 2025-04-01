
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, MapPin, AlertTriangle } from "lucide-react";

type Delivery = {
  id: string;
  orderId: string;
  carrier: string;
  destination: string;
  status: "en_cours" | "retard" | "livré" | "prêt";
  estimatedDelivery?: string;
};

const deliveries: Delivery[] = [
  {
    id: "DEL-1055",
    orderId: "#1055",
    carrier: "Livreur Express A",
    destination: "Paris Centre",
    status: "en_cours",
    estimatedDelivery: "Aujourd'hui, 14:30"
  },
  {
    id: "DEL-1052",
    orderId: "#1052",
    carrier: "Livreur Rapide B",
    destination: "Lyon Sud",
    status: "retard",
    estimatedDelivery: "Aujourd'hui, 16:45"
  },
  {
    id: "DEL-1050",
    orderId: "#1050",
    carrier: "Non Assigné",
    destination: "Bordeaux Ouest",
    status: "prêt"
  },
  {
    id: "DEL-1047",
    orderId: "#1047",
    carrier: "Transport Express C",
    destination: "Marseille Est",
    status: "livré"
  },
  {
    id: "DEL-1045",
    orderId: "#1045",
    carrier: "Non Assigné",
    destination: "Lille Centre",
    status: "prêt"
  }
];

export function DeliveryTrackingTable() {
  const getStatusBadge = (status: Delivery["status"]) => {
    switch (status) {
      case "en_cours":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">En cours</span>;
      case "retard":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"><AlertTriangle className="w-3 h-3 mr-1" /> Retardé</span>;
      case "livré":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Livré</span>;
      case "prêt":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Prêt</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Suivi des Livraisons</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Commande</TableHead>
            <TableHead>Transporteur</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Livraison estimée</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium">{delivery.id}</TableCell>
              <TableCell>{delivery.orderId}</TableCell>
              <TableCell>{delivery.carrier}</TableCell>
              <TableCell>{delivery.destination}</TableCell>
              <TableCell>{getStatusBadge(delivery.status)}</TableCell>
              <TableCell>{delivery.estimatedDelivery || "-"}</TableCell>
              <TableCell>
                {delivery.status === "en_cours" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" />
                    Suivre
                  </Button>
                )}
                {delivery.status === "prêt" && (
                  <Button
                    size="sm"
                    variant="default"
                    className="flex items-center gap-1"
                  >
                    <Package className="h-4 w-4" />
                    Assigner
                  </Button>
                )}
                {delivery.status === "retard" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Notifier Client
                  </Button>
                )}
                {delivery.status === "livré" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    Détails
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
