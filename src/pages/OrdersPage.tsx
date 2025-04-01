
import { SidebarNav } from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: string;
  items: number;
  status: "pending" | "processing" | "completed" | "cancelled" | "onhold";
};

const demoOrders: Order[] = [
  {
    id: "ZEN-1049",
    customer: "Sophie Martin",
    date: "15/07/2023",
    items: 3,
    total: "79,99 €",
    status: "completed",
  },
  {
    id: "ZEN-1048",
    customer: "Thomas Bernard",
    date: "15/07/2023",
    items: 1,
    total: "19,99 €",
    status: "processing",
  },
  {
    id: "ZEN-1047",
    customer: "Emma Dubois",
    date: "14/07/2023",
    items: 2,
    total: "39,99 €",
    status: "processing",
  },
  {
    id: "ZEN-1046",
    customer: "Alexandre Petit",
    date: "14/07/2023",
    items: 2,
    total: "59,99 €",
    status: "pending",
  },
  {
    id: "ZEN-1045",
    customer: "Chloé Robert",
    date: "13/07/2023",
    items: 1,
    total: "29,99 €",
    status: "cancelled",
  },
  {
    id: "ZEN-1044",
    customer: "Lucas Moreau",
    date: "13/07/2023",
    items: 4,
    total: "94,99 €",
    status: "completed",
  },
  {
    id: "ZEN-1043",
    customer: "Julie Leroy",
    date: "12/07/2023",
    items: 1,
    total: "24,99 €",
    status: "onhold",
  },
  {
    id: "ZEN-1042",
    customer: "Mathieu Dupont",
    date: "12/07/2023",
    items: 2,
    total: "44,49 €",
    status: "completed",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav />
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Commandes</h1>
            <p className="text-muted-foreground">
              Gérez vos commandes et suivez leur évolution
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
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
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exporter
            </Button>
            <Button>
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
                className="mr-2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nouvelle Commande
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-amber-500">1</div>
              <p className="text-sm text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-blue-500">2</div>
              <p className="text-sm text-muted-foreground">En traitement</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-green-500">3</div>
              <p className="text-sm text-muted-foreground">Terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-red-500">2</div>
              <p className="text-sm text-muted-foreground">Annulées/En attente</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Liste des commandes</CardTitle>
            <div className="flex items-center space-x-2">
              <select className="rounded-md border border-input px-3 py-1 text-sm">
                <option>Toutes les commandes</option>
                <option>En attente</option>
                <option>En traitement</option>
                <option>Terminées</option>
                <option>Annulées</option>
                <option>En attente de validation</option>
              </select>
              <input
                type="search"
                placeholder="Rechercher..."
                className="rounded-md border border-input px-3 py-1 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Articles</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          Facture
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
