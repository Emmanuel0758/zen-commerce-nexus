
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/SidebarNav";
import { Search, UserPlus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  status: "active" | "inactive" | "new";
};

const initialClients: Client[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    orders: 3,
    status: "active",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "07 65 43 21 09",
    orders: 7,
    status: "active",
  },
  {
    id: "3",
    name: "Paul Bernard",
    email: "paul.bernard@example.com",
    phone: "06 98 76 54 32",
    orders: 1,
    status: "new",
  },
  {
    id: "4",
    name: "Sophie Leroy",
    email: "sophie.leroy@example.com",
    phone: "07 12 34 56 78",
    orders: 0,
    status: "inactive",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
    orders: 0,
    status: "new"
  });
  
  const { toast } = useToast();
  
  // Filtrer les clients
  const filteredClients = clients.filter(client => {
    // Appliquer recherche par texte
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.phone.includes(searchQuery);
    
    // Appliquer filtre par statut
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calcul des statistiques
  const activeCount = clients.filter(c => c.status === "active").length;
  const newCount = clients.filter(c => c.status === "new").length;
  const inactiveCount = clients.filter(c => c.status === "inactive").length;

  // Fonctions pour gérer les clients
  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir au moins le nom et l'email",
        variant: "destructive"
      });
      return;
    }

    const clientToAdd: Client = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone || "",
      orders: 0,
      status: "new"
    };

    setClients([...clients, clientToAdd]);
    setIsAddDialogOpen(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      orders: 0,
      status: "new"
    });

    toast({
      title: "Client ajouté",
      description: `${clientToAdd.name} a été ajouté avec succès`
    });
  };

  const handleViewClient = (client: Client) => {
    setCurrentClient(client);
    setIsViewDialogOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été réinitialisés"
    });
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Clients</CardTitle>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un client
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Gérez votre base clients, consultez l'historique et les préférences.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-green-500">{activeCount}</div>
                  <p className="text-sm text-muted-foreground">Clients actifs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-amber-500">{newCount}</div>
                  <p className="text-sm text-muted-foreground">Nouveaux clients</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-3xl font-bold text-gray-500">{inactiveCount}</div>
                  <p className="text-sm text-muted-foreground">Clients inactifs</p>
                </CardContent>
              </Card>
            </section>

            <div className="flex items-center justify-between mb-6">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Rechercher un client..."
                  className="pl-8 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Clients actifs</SelectItem>
                    <SelectItem value="new">Nouveaux clients</SelectItem>
                    <SelectItem value="inactive">Clients inactifs</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2" onClick={resetFilters}>
                  <Filter className="h-4 w-4" /> Réinitialiser
                </Button>
              </div>
            </div>
            
            <div className="mt-2">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Nom</th>
                        <th className="text-left p-4 font-medium">Email</th>
                        <th className="text-left p-4 font-medium">Téléphone</th>
                        <th className="text-left p-4 font-medium">Commandes</th>
                        <th className="text-left p-4 font-medium">Statut</th>
                        <th className="text-right p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map(client => (
                        <tr key={client.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{client.name}</td>
                          <td className="p-4">{client.email}</td>
                          <td className="p-4">{client.phone}</td>
                          <td className="p-4">{client.orders}</td>
                          <td className="p-4">
                            {client.status === "active" && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                Actif
                              </span>
                            )}
                            {client.status === "new" && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                Nouveau
                              </span>
                            )}
                            {client.status === "inactive" && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                Inactif
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                              Voir détails
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {filteredClients.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-muted-foreground">
                            Aucun client trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredClients.length} clients sur {clients.length} au total
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue Ajouter Client */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau client</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un nouveau client
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Téléphone</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddClient}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Voir Détails Client */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du client</DialogTitle>
            <DialogDescription>
              Informations complètes sur le client
            </DialogDescription>
          </DialogHeader>
          {currentClient && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">Nom:</p>
                <p>{currentClient.name}</p>
                <p className="font-medium">Email:</p>
                <p>{currentClient.email}</p>
                <p className="font-medium">Téléphone:</p>
                <p>{currentClient.phone}</p>
                <p className="font-medium">Commandes:</p>
                <p>{currentClient.orders}</p>
                <p className="font-medium">Statut:</p>
                <p>
                  {currentClient.status === "active" ? "Actif" : 
                   currentClient.status === "new" ? "Nouveau" : "Inactif"}
                </p>
              </div>
              
              {currentClient.orders > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Dernières commandes</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between p-2 bg-muted rounded-md">
                      <span>ZEN-{1000 + parseInt(currentClient.id) * 3}</span>
                      <span>13/06/2023</span>
                      <span>24 999 FCFA</span>
                    </li>
                    {currentClient.orders > 1 && (
                      <li className="flex justify-between p-2 bg-muted rounded-md">
                        <span>ZEN-{1000 + parseInt(currentClient.id) * 3 - 1}</span>
                        <span>02/05/2023</span>
                        <span>15 500 FCFA</span>
                      </li>
                    )}
                    {currentClient.orders > 2 && (
                      <li className="flex justify-between p-2 bg-muted rounded-md">
                        <span>ZEN-{1000 + parseInt(currentClient.id) * 3 - 2}</span>
                        <span>17/04/2023</span>
                        <span>9 999 FCFA</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              toast({
                title: "Fonctionnalité en développement",
                description: "L'édition des clients sera disponible prochainement"
              });
            }}>
              Éditer
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
