import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Plus, FileDown, Search, Filter } from "lucide-react";

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
    total: "79 999 FCFA",
    status: "completed",
  },
  {
    id: "ZEN-1048",
    customer: "Thomas Bernard",
    date: "15/07/2023",
    items: 1,
    total: "19 999 FCFA",
    status: "processing",
  },
  {
    id: "ZEN-1047",
    customer: "Emma Dubois",
    date: "14/07/2023",
    items: 2,
    total: "39 999 FCFA",
    status: "processing",
  },
  {
    id: "ZEN-1046",
    customer: "Alexandre Petit",
    date: "14/07/2023",
    items: 2,
    total: "59 999 FCFA",
    status: "pending",
  },
  {
    id: "ZEN-1045",
    customer: "Chloé Robert",
    date: "13/07/2023",
    items: 1,
    total: "29 999 FCFA",
    status: "cancelled",
  },
  {
    id: "ZEN-1044",
    customer: "Lucas Moreau",
    date: "13/07/2023",
    items: 4,
    total: "94 999 FCFA",
    status: "completed",
  },
  {
    id: "ZEN-1043",
    customer: "Julie Leroy",
    date: "12/07/2023",
    items: 1,
    total: "24 999 FCFA",
    status: "onhold",
  },
  {
    id: "ZEN-1042",
    customer: "Mathieu Dupont",
    date: "12/07/2023",
    items: 2,
    total: "44 499 FCFA",
    status: "completed",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const { toast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const processingCount = orders.filter(o => o.status === "processing").length;
  const completedCount = orders.filter(o => o.status === "completed").length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;
  const onHoldCount = orders.filter(o => o.status === "onhold").length;

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsViewOrderDialogOpen(true);
  };

  const handleShowInvoice = (order: Order) => {
    setCurrentOrder(order);
    setIsInvoiceDialogOpen(true);
  };

  const handleExportOrders = (format: "json" | "pdf" | "excel") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "zen-orders.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } 
    else if (format === "pdf") {
      setTimeout(() => {
        toast({
          title: "Export PDF en cours",
          description: "Préparation du fichier PDF..."
        });
        
        setTimeout(() => {
          toast({
            title: "Export PDF terminé",
            description: "Le fichier PDF a été téléchargé"
          });
        }, 1500);
      }, 500);
    } 
    else if (format === "excel") {
      let csvContent = "ID,Client,Date,Articles,Total,Statut\n";
      
      orders.forEach(order => {
        const status = order.status === "completed" ? "Terminée" : 
                      order.status === "processing" ? "En traitement" : 
                      order.status === "pending" ? "En attente" : 
                      order.status === "cancelled" ? "Annulée" : "En attente de validation";
                      
        csvContent += `${order.id},${order.customer},${order.date},${order.items},${order.total},${status}\n`;
      });
      
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "zen-orders.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    
    toast({
      title: "Export réussi",
      description: `La liste des commandes a été exportée en format ${format.toUpperCase()}`
    });
  };

  const handleCreateNewOrder = () => {
    toast({
      title: "Fonctionnalité en développement",
      description: "La création de nouvelles commandes sera disponible prochainement"
    });
    setIsNewOrderDialogOpen(false);
  };

  const handleDownloadInvoice = (order: Order) => {
    toast({
      title: "Génération de facture",
      description: "Préparation du fichier PDF..."
    });
    
    setTimeout(() => {
      toast({
        title: "Facture téléchargée",
        description: `La facture ${order.id.replace('ZEN-', 'INV-')} a été téléchargée au format PDF`
      });
      setIsInvoiceDialogOpen(false);
    }, 1500);
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExportOrders("excel")}>
                  Format Excel (CSV)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportOrders("pdf")}>
                  Format PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportOrders("json")}>
                  Format JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsNewOrderDialogOpen(true)}>
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
              <div className="text-3xl font-bold">{orders.length}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-amber-500">{pendingCount}</div>
              <p className="text-sm text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-blue-500">{processingCount}</div>
              <p className="text-sm text-muted-foreground">En traitement</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-green-500">{completedCount}</div>
              <p className="text-sm text-muted-foreground">Terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-red-500">{cancelledCount + onHoldCount}</div>
              <p className="text-sm text-muted-foreground">Annulées/En attente</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Liste des commandes</CardTitle>
            <div className="flex items-center space-x-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les commandes</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="completed">Terminées</SelectItem>
                  <SelectItem value="cancelled">Annulées</SelectItem>
                  <SelectItem value="onhold">En attente de validation</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="search"
                placeholder="Rechercher..."
                className="rounded-md border border-input px-3 py-1 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                {filteredOrders.map((order) => (
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
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                          Voir
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShowInvoice(order)}>
                          Facture
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      Aucune commande trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la commande</DialogTitle>
            <DialogDescription>
              Informations complètes sur la commande
            </DialogDescription>
          </DialogHeader>
          {currentOrder && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">ID:</p>
                <p>{currentOrder.id}</p>
                <p className="font-medium">Client:</p>
                <p>{currentOrder.customer}</p>
                <p className="font-medium">Date:</p>
                <p>{currentOrder.date}</p>
                <p className="font-medium">Articles:</p>
                <p>{currentOrder.items}</p>
                <p className="font-medium">Total:</p>
                <p>{currentOrder.total}</p>
                <p className="font-medium">Statut:</p>
                <p><StatusBadge status={currentOrder.status} /></p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Articles commandés</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Zen Classic (500ml) x 2</span>
                    <span>19 998 FCFA</span>
                  </li>
                  {currentOrder.items > 1 && (
                    <li className="flex justify-between">
                      <span>Zen Boost (250ml) x 1</span>
                      <span>7 250 FCFA</span>
                    </li>
                  )}
                  {currentOrder.items > 2 && (
                    <li className="flex justify-between">
                      <span>Zen Relax (1L) x 1</span>
                      <span>14 995 FCFA</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOrderDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Facture</DialogTitle>
            <DialogDescription>
              Facture de la commande
            </DialogDescription>
          </DialogHeader>
          {currentOrder && (
            <div className="py-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="font-bold text-xl mb-1">ZEN BEVERAGES</h3>
                <p className="text-sm">123 Avenue du Commerce</p>
                <p className="text-sm">75001 Paris, France</p>
                <p className="text-sm">contact@zenbeverages.com</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="font-medium text-sm">Facturé à:</p>
                  <p>{currentOrder.customer}</p>
                  <p className="text-sm">client@example.com</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">Facture #{currentOrder.id.replace('ZEN-', 'INV-')}</p>
                  <p className="text-sm">Date: {currentOrder.date}</p>
                  <p className="text-sm">Échéance: {currentOrder.date}</p>
                </div>
              </div>
              
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Description</th>
                    <th className="text-right pb-2">Qté</th>
                    <th className="text-right pb-2">Prix</th>
                    <th className="text-right pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Zen Classic (500ml)</td>
                    <td className="text-right">2</td>
                    <td className="text-right">9 999 FCFA</td>
                    <td className="text-right">19 998 FCFA</td>
                  </tr>
                  {currentOrder.items > 1 && (
                    <tr>
                      <td className="py-1">Zen Boost (250ml)</td>
                      <td className="text-right">1</td>
                      <td className="text-right">7 250 FCFA</td>
                      <td className="text-right">7 250 FCFA</td>
                    </tr>
                  )}
                  {currentOrder.items > 2 && (
                    <tr>
                      <td className="py-1">Zen Relax (1L)</td>
                      <td className="text-right">1</td>
                      <td className="text-right">14 995 FCFA</td>
                      <td className="text-right">14 995 FCFA</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td colSpan={3} className="text-right pt-2 font-medium">Total:</td>
                    <td className="text-right pt-2 font-medium">{currentOrder.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => handleDownloadInvoice(currentOrder!)}
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
            <Button onClick={() => setIsInvoiceDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle commande</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer une nouvelle commande
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Fonctionnalité en cours de développement
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewOrderDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateNewOrder}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
