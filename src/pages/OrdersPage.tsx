
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
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Download, FileDown, Plus } from "lucide-react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { useAppSettings } from "@/hooks/use-app-settings";
import "@/types/jspdf-extensions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Order = {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
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

// Schema de validation pour le formulaire de nouvelle commande
const newOrderSchema = z.object({
  customer: z.string().min(3, { message: "Le nom du client est requis (min. 3 caractères)" }),
  items: z.array(z.object({
    product: z.string().min(1, { message: "Veuillez sélectionner un produit" }),
    quantity: z.number().min(1, { message: "La quantité doit être d'au moins 1" })
  })).min(1),
  status: z.enum(["pending", "processing", "completed", "cancelled", "onhold"], {
    required_error: "Veuillez sélectionner un statut"
  }),
  shippingAddress: z.string().optional(),
  notes: z.string().optional()
});

type NewOrderFormValues = z.infer<typeof newOrderSchema>;

// Produits de démonstration
const demoProducts = [
  { id: "prod-1", name: "Zen Classic (500ml)", price: 9999 },
  { id: "prod-2", name: "Zen Boost (250ml)", price: 7250 },
  { id: "prod-3", name: "Zen Relax (1L)", price: 14995 },
  { id: "prod-4", name: "Zen Energy (330ml)", price: 6500 },
  { id: "prod-5", name: "Zen Premium (750ml)", price: 19999 },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const { settings } = useAppSettings();

  const { toast } = useToast();
  
  // Formulaire pour nouvelle commande
  const form = useForm<NewOrderFormValues>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      customer: "",
      items: [{ product: "", quantity: 1 }],
      status: "pending",
      shippingAddress: "",
      notes: ""
    },
  });

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
      const doc = new jsPDF();
      
      if (settings.logo) {
        try {
          doc.addImage(settings.logo, 'JPEG', 15, 10, 30, 30);
        } catch (error) {
          console.error("Erreur lors du chargement du logo:", error);
          doc.setFontSize(22);
          doc.setTextColor(128, 0, 128);
          doc.text(settings.appName.substring(0, 1), 25, 25);
        }
      }
      
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(settings.appName.toUpperCase(), settings.logo ? 50 : 15, 25);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('123 Avenue du Commerce', settings.logo ? 50 : 15, 32);
      doc.text('75001 Paris, France', settings.logo ? 50 : 15, 37);
      doc.text('contact@zenbeverages.com', settings.logo ? 50 : 15, 42);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('LISTE DES COMMANDES', 105, 55, { align: 'center' });
      
      doc.setFontSize(11);
      doc.text(`Date d'exportation: ${new Date().toLocaleDateString('fr-FR')}`, 105, 62, { align: 'center' });
      
      const headers = [["Commande", "Client", "Date", "Articles", "Total", "Statut"]];
      
      const data = orders.map(order => {
        const status = 
          order.status === "completed" ? "Terminée" : 
          order.status === "processing" ? "En traitement" : 
          order.status === "pending" ? "En attente" : 
          order.status === "cancelled" ? "Annulée" : "En attente de validation";
        
        return [
          order.id,
          order.customer,
          order.date,
          order.items.toString(),
          order.total,
          status
        ];
      });
      
      // @ts-ignore
      doc.autoTable({
        startY: 70,
        head: headers,
        body: data,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { 
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 40 },
          2: { cellWidth: 25 },
          3: { cellWidth: 15, halign: 'center' },
          4: { cellWidth: 35, halign: 'right' },
          5: { cellWidth: 30 }
        }
      });
      
      const finalY = (doc.lastAutoTable as any).finalY;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total commandes: ${orders.length}`, 15, finalY + 15);
      doc.text(`En attente: ${pendingCount}`, 15, finalY + 22);
      doc.text(`En traitement: ${processingCount}`, 15, finalY + 29);
      doc.text(`Terminées: ${completedCount}`, 15, finalY + 36);
      doc.text(`Annulées/En attente: ${cancelledCount + onHoldCount}`, 15, finalY + 43);
      
      const pageCount = doc.internal.getNumberOfPages();
      for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`${settings.appName} - Page ${i} sur ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      doc.save(`liste-commandes.pdf`);
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

  // Fonction de création d'une nouvelle commande
  const handleCreateNewOrder = (data: NewOrderFormValues) => {
    // Calcul du total
    let totalAmount = 0;
    let itemCount = 0;
    
    data.items.forEach(item => {
      const product = demoProducts.find(p => p.id === item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
        itemCount += item.quantity;
      }
    });
    
    // Formatage du total
    const totalFormatted = `${totalAmount.toLocaleString('fr-FR')} FCFA`;
    
    // Création de l'ID
    const orderNumber = 1050 + orders.length;
    const orderId = `ZEN-${orderNumber}`;
    
    // Date du jour au format français
    const today = new Date().toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
    
    // Création de la nouvelle commande
    const newOrder: Order = {
      id: orderId,
      customer: data.customer,
      date: today,
      items: itemCount,
      total: totalFormatted,
      status: data.status,
    };
    
    // Ajout de la commande à la liste
    setOrders([newOrder, ...orders]);
    
    // Réinitialisation du formulaire
    form.reset();
    
    // Fermer le dialogue
    setIsNewOrderDialogOpen(false);
    
    // Message de succès
    toast({
      title: "Commande créée",
      description: `La commande ${orderId} a été créée avec succès.`
    });
  };

  const handleAddProductField = () => {
    const currentItems = form.getValues().items;
    form.setValue('items', [...currentItems, { product: "", quantity: 1 }]);
  };

  const handleRemoveProductField = (index: number) => {
    const currentItems = form.getValues().items;
    if (currentItems.length > 1) {
      form.setValue('items', currentItems.filter((_, i) => i !== index));
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    const doc = new jsPDF();
    
    if (settings.logo) {
      try {
        doc.addImage(settings.logo, 'JPEG', 15, 10, 30, 30);
      } catch (error) {
        console.error("Erreur lors du chargement du logo:", error);
        doc.setFontSize(22);
        doc.setTextColor(128, 0, 128);
        doc.text(settings.appName.substring(0, 1), 25, 25);
      }
    }
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(settings.appName.toUpperCase(), settings.logo ? 50 : 15, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Avenue du Commerce', settings.logo ? 50 : 15, 32);
    doc.text('75001 Paris, France', settings.logo ? 50 : 15, 37);
    doc.text('contact@zenbeverages.com', settings.logo ? 50 : 15, 42);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', 105, 55, { align: 'center' });
    
    doc.setFontSize(11);
    doc.text(`N° ${order.id.replace('ZEN-', 'INV-')}`, 105, 62, { align: 'center' });
    doc.text(`Date: ${order.date}`, 105, 68, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Facturé à:', 15, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customer, 15, 87);
    doc.text('client@example.com', 15, 93);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    
    // @ts-ignore
    doc.autoTable({
      startY: 105,
      head: [['Description', 'Qté', 'Prix unitaire', 'Total']],
      body: [
        ['Zen Classic (500ml)', '2', '9 999 FCFA', '19 998 FCFA'],
        ...(order.items > 1 ? [['Zen Boost (250ml)', '1', '7 250 FCFA', '7 250 FCFA']] : []),
        ...(order.items > 2 ? [['Zen Relax (1L)', '1', '14 995 FCFA', '14 995 FCFA']] : [])
      ],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 40, halign: 'right' }
      }
    });
    
    const finalY = (doc.lastAutoTable as any).finalY + 15;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Total', 150, finalY);
    doc.text(order.total, 180, finalY, { align: 'right' });
    
    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Merci pour votre commande!', 105, finalY + 20, { align: 'center' });
    doc.text(`${settings.appName} - SIRET: 12345678900000`, 105, finalY + 25, { align: 'center' });
    
    // Page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`${settings.appName} - Page ${i} sur ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    doc.save(`facture-${order.id}.pdf`);
    
    toast({
      title: "Facture téléchargée",
      description: `La facture ${order.id.replace('ZEN-', 'INV-')} a été téléchargée au format PDF`
    });
    
    setIsInvoiceDialogOpen(false);
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
              <Plus className="mr-2 h-4 w-4" />
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
              <Input
                type="search"
                placeholder="Rechercher..."
                className="rounded-md border border-input px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                {settings.logo ? (
                  <img 
                    src={settings.logo} 
                    alt={settings.appName} 
                    className="h-10 w-auto object-contain mb-2" 
                  />
                ) : (
                  <h3 className="font-bold text-xl mb-1">{settings.appName}</h3>
                )}
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
              onClick={() => currentOrder && handleDownloadInvoice(currentOrder)}
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle commande</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour créer une nouvelle commande
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateNewOrder)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du client" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="processing">En traitement</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                          <SelectItem value="onhold">En attente de validation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Produits</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddProductField}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un produit
                  </Button>
                </div>
                
                {form.getValues().items.map((_, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.product`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un produit" />
                              </SelectTrigger>
                              <SelectContent>
                                {demoProducts.map(product => (
                                  <SelectItem key={product.id} value={product.id}>
                                    {product.name} - {product.price.toLocaleString('fr-FR')} FCFA
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="w-20">
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              placeholder="Qté"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRemoveProductField(index)}
                      disabled={form.getValues().items.length <= 1}
                    >
                      Retirer
                    </Button>
                  </div>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse de livraison (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse de livraison" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Notes concernant la commande" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewOrderDialogOpen(false)}>Annuler</Button>
                <Button type="submit">Créer la commande</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
