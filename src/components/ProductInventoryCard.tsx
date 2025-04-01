
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: string;
  stock: number;
  status: "lowstock" | "instock" | "outofstock";
};

const demoProducts: Product[] = [
  {
    id: "ZEN-CL-500",
    name: "Zen Classic (500ml)",
    price: "19,99 €",
    stock: 85,
    status: "lowstock",
  },
  {
    id: "ZEN-BO-250",
    name: "Zen Boost (250ml)",
    price: "14,50 €",
    stock: 210,
    status: "instock",
  },
  {
    id: "ZEN-RX-1000",
    name: "Zen Relax (1L)",
    price: "29,99 €",
    stock: 0,
    status: "outofstock",
  },
  {
    id: "ZEN-FL-750",
    name: "Zen Flow (750ml)",
    price: "24,99 €",
    stock: 150,
    status: "instock",
  },
];

export function ProductInventoryCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Inventaire Produits</CardTitle>
        <div className="space-x-2">
          <Button size="sm" variant="outline">
            Exporter
          </Button>
          <Button size="sm">
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium py-2">Référence</th>
                <th className="text-left font-medium py-2">Produit</th>
                <th className="text-right font-medium py-2">Prix</th>
                <th className="text-right font-medium py-2">Stock</th>
                <th className="text-left font-medium py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {demoProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50">
                  <td className="py-2">{product.id}</td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2 text-right">{product.price}</td>
                  <td className="py-2 text-right">{product.stock}</td>
                  <td className="py-2">
                    <StatusBadge status={product.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
