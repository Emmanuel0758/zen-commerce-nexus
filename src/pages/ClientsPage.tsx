
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/SidebarNav";
import { Search, UserPlus, Filter } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Clients</CardTitle>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un client
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Gérez votre base clients, consultez l'historique et les préférences.
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Rechercher un client..."
                  className="pl-8 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filtrer
              </Button>
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
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4">Jean Dupont</td>
                        <td className="p-4">jean.dupont@example.com</td>
                        <td className="p-4">06 12 34 56 78</td>
                        <td className="p-4">3</td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            Actif
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4">Marie Martin</td>
                        <td className="p-4">marie.martin@example.com</td>
                        <td className="p-4">07 65 43 21 09</td>
                        <td className="p-4">7</td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            Actif
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-4">Paul Bernard</td>
                        <td className="p-4">paul.bernard@example.com</td>
                        <td className="p-4">06 98 76 54 32</td>
                        <td className="p-4">1</td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            Nouveau
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="p-4">Sophie Leroy</td>
                        <td className="p-4">sophie.leroy@example.com</td>
                        <td className="p-4">07 12 34 56 78</td>
                        <td className="p-4">0</td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                            Inactif
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Affichage de 4 clients sur 54 au total
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
    </div>
  );
}
