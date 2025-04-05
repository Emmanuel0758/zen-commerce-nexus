import { useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Download,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  status: "active" | "inactive";
};

const demoClients: Client[] = [
  {
    id: "C1045",
    name: "Sophie Martin",
    email: "sophie@example.com",
    phone: "+221 70 123 4567",
    city: "Dakar",
    orders: 5,
    totalSpent: "198 750 FCFA",
    lastOrder: "15/07/2023",
    status: "active",
  },
  {
    id: "C1046",
    name: "Thomas Bernard",
    email: "thomas@example.com",
    phone: "+221 76 234 5678",
    city: "Thiès",
    orders: 2,
    totalSpent: "79 500 FCFA",
    lastOrder: "14/07/2023",
    status: "active",
  },
  {
    id: "C1047",
    name: "Emma Dubois",
    email: "emma@example.com",
    phone: "+221 77 345 6789",
    city: "Saint-Louis",
    orders: 1,
    totalSpent: "24 500 FCFA",
    lastOrder: "10/07/2023",
    status: "inactive",
  },
  {
    id: "C1048",
    name: "Amadou Diop",
    email: "amadou@example.com",
    phone: "+221 78 456 7890",
    city: "Dakar",
    orders: 4,
    totalSpent: "174 750 FCFA",
    lastOrder: "08/07/2023",
    status: "active",
  },
  {
    id: "C1049",
    name: "Fatou Ndiaye",
    email: "fatou@example.com",
    phone: "+221 70 567 8901",
    city: "Mbour",
    orders: 3,
    totalSpent: "106 500 FCFA",
    lastOrder: "05/07/2023",
    status: "active",
  },
  {
    id: "C1050",
    name: "Jean Sène",
    email: "jean@example.com",
    phone: "+221 76 678 9012",
    city: "Ziguinchor",
    orders: 1,
    totalSpent: "35 000 FCFA",
    lastOrder: "01/07/2023",
    status: "inactive",
  },
];

export default function ClientsPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(demoClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [editFormData, setEditFormData] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortOption) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "orders_high":
        return b.orders - a.orders;
      case "orders_low":
        return a.orders - b.orders;
      case "spent_high":
        return parseFloat(b.totalSpent.replace(/[^\d]/g, '')) - parseFloat(a.totalSpent.replace(/[^\d]/g, ''));
      case "spent_low":
        return parseFloat(a.totalSpent.replace(/[^\d]/g, '')) - parseFloat(b.totalSpent.replace(/[^\d]/g, ''));
      case "newest":
      default:
        return parseInt(b.id.substring(1)) - parseInt(a.id.substring(1));
    }
  });

  const handleViewClient = (client: Client) => {
    setCurrentClient(client);
    setIsViewDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setEditFormData({ ...client });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    
    const updatedClients = clients.map(c => 
      c.id === editFormData.id ? editFormData : c
    );
    
    setClients(updatedClients);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Client modifié",
      description: `Les informations de ${editFormData.name} ont été mises à jour`
    });
  };

  const handleDeleteClient = (client: Client) => {
    setCurrentClient(client);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!currentClient) return;
    
    const updatedClients = clients.filter(c => c.id !== currentClient.id);
    setClients(updatedClients);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Client supprimé",
      description: `${currentClient.name} a été supprimé de la base de données`
    });
  };

  const handleAddClient = () => {
    const newClient: Client = {
      id: `C${1051 + clients.length}`,
      name: "Nouveau Client",
      email: "nouveau@example.com",
      phone: "+221 70 000 0000",
      city: "Dakar",
      orders: 0,
      totalSpent: "0 FCFA",
      lastOrder: "-",
      status: "active",
    };
    
    setClients([newClient, ...clients]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Client ajouté",
      description: "Le nouveau client a été ajouté avec succès"
    });
  };

  const handleExportClients = (format: "json" | "pdf" | "excel") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clients, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "zen-clients.json");
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
      let csvContent = "ID,Nom,Email,Téléphone,Ville,Commandes,Total Dépensé,Dernière Commande,Statut\n";
      
      clients.forEach(client => {
        const status = client.status === "active" ? "Actif" : "Inactif";
        csvContent += `${client.id},${client.name},${client.email},${client.phone},${client.city},${client.orders},${client.totalSpent},${client.lastOrder},${status}\n`;
      });
      
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "zen-clients.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    
    toast({
      title: "Export réussi",
      description: `La liste des clients a été exportée en format ${format.toUpperCase()}`
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav />
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">
              Gérez vos clients et consultez leurs informations
            </p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExportClients("excel")}>
                  Format Excel (CSV)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportClients("pdf")}>
                  Format PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportClients("json")}>
                  Format JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Nouveau Client
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-green-500">
                {clients.filter(c => c.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Clients Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">
                {clients.reduce((sum, client) => sum + client.orders, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Commandes Totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold text-primary">
                {clients.length > 0 
                  ? Math.round(clients.reduce((sum, client) => sum + client.orders, 0) / clients.length * 10) / 10
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">Commandes/Client</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Liste des clients</CardTitle>
            <div className="flex items-center space-x-2">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récents</SelectItem>
                  <SelectItem value="name_asc">Nom (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Nom (Z-A)</SelectItem>
                  <SelectItem value="orders_high">Commandes (↓)</SelectItem>
                  <SelectItem value="orders_low">Commandes (↑)</SelectItem>
                  <SelectItem value="spent_high">Dépenses (↓)</SelectItem>
                  <SelectItem value="spent_low">Dépenses (↑)</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Filter className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead className="text-right">Commandes</TableHead>
                  <TableHead className="text-right">Total dépensé</TableHead>
                  <TableHead>Dernière commande</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {client.name}
                      {client.status === "inactive" && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-800 dark:text-gray-300">
                          inactif
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell className="text-right">{client.orders}</TableCell>
                    <TableCell className="text-right">{client.totalSpent}</TableCell>
                    <TableCell>{client.lastOrder}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewClient(client)}>
                            <User className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClient(client)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClient(client)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      Aucun client trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du client</DialogTitle>
          </DialogHeader>
          {currentClient && (
            <div className="py-4">
              <div className="mb-4 flex justify-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-4">{currentClient.name}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p>{currentClient.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p>{currentClient.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Ville</p>
                    <p>{currentClient.city}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Informations d'achat</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Commandes</p>
                    <p className="text-lg font-medium">{currentClient.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total dépensé</p>
                    <p className="text-lg font-medium">{currentClient.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dernière commande</p>
                    <p className="text-lg font-medium">{currentClient.lastOrder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Statut</p>
                    <p className="text-lg font-medium">
                      {currentClient.status === "active" ? "Actif" : "Inactif"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handleEditClient(currentClient!)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
            <DialogDescription>
              Modifiez les informations du client
            </DialogDescription>
          </DialogHeader>
          {editFormData && (
            <div className="py-4">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nom
                  </label>
                  <Input
                    id="name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    Ville
                  </label>
                  <Input
                    id="city"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({...editFormData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Statut
                  </label>
                  <Select
                    value={editFormData.status}
                    onValueChange={(value: "active" | "inactive") => 
                      setEditFormData({...editFormData, status: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le client</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {currentClient && (
            <div className="py-4">
              <p className="font-medium">{currentClient.name}</p>
              <p className="text-sm text-muted-foreground">{currentClient.email}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau client</DialogTitle>
            <DialogDescription>
              Entrez les informations du nouveau client
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="new-name" className="block text-sm font-medium mb-1">
                  Nom
                </label>
                <Input id="new-name" placeholder="Nom complet" />
              </div>
              <div>
                <label htmlFor="new-email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input id="new-email" type="email" placeholder="email@exemple.com" />
              </div>
              <div>
                <label htmlFor="new-phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <Input id="new-phone" placeholder="+221 70 123 4567" />
              </div>
              <div>
                <label htmlFor="new-city" className="block text-sm font-medium mb-1">
                  Ville
                </label>
                <Input id="new-city" placeholder="Ville" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddClient}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
