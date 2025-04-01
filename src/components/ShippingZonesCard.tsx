
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

type ShippingZone = {
  id: string;
  name: string;
  cities: string[];
  rates: string;
};

const shippingZones: ShippingZone[] = [
  {
    id: "ZONE-001",
    name: "Zone Urbaine Paris",
    cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis"],
    rates: "5,99€ (standard) / 9,99€ (express)"
  },
  {
    id: "ZONE-002",
    name: "Grand Est",
    cities: ["Strasbourg", "Nancy", "Metz", "Colmar"],
    rates: "7,99€ (standard) / 12,99€ (express)"
  },
  {
    id: "ZONE-003",
    name: "Sud-Ouest",
    cities: ["Bordeaux", "Toulouse", "Biarritz"],
    rates: "7,99€ (standard) / 12,99€ (express)"
  }
];

export function ShippingZonesCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Zones de Livraison</CardTitle>
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
              <TableHead>Villes</TableHead>
              <TableHead>Tarifs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shippingZones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.id}</TableCell>
                <TableCell>{zone.name}</TableCell>
                <TableCell>{zone.cities.join(", ")}</TableCell>
                <TableCell>{zone.rates}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
