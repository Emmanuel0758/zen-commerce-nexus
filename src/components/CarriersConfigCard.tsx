
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

type Carrier = {
  id: string;
  name: string;
  zones: string[];
  status: "actif" | "inactif";
};

const carriers: Carrier[] = [
  {
    id: "CAR-001",
    name: "Livreur Express",
    zones: ["Paris", "Lyon", "Marseille"],
    status: "actif"
  },
  {
    id: "CAR-002",
    name: "Transporteur Rapide",
    zones: ["Bordeaux", "Toulouse", "Lille"],
    status: "actif"
  },
  {
    id: "CAR-003",
    name: "Livraison Écologique",
    zones: ["Paris", "Nantes"],
    status: "inactif"
  }
];

export function CarriersConfigCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Transporteurs</CardTitle>
        <Button
          size="sm"
          className="h-8"
        >
          <Plus className="h-4 w-4 mr-1" /> Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Zones couvertes</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell className="font-medium">{carrier.id}</TableCell>
                <TableCell>{carrier.name}</TableCell>
                <TableCell>{carrier.zones.join(", ")}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    carrier.status === "actif" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}>
                    {carrier.status === "actif" ? "Actif" : "Inactif"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
