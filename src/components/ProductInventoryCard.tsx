
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    price: "9 999 FCFA",
    stock: 85,
    status: "lowstock",
  },
  {
    id: "ZEN-BO-250",
    name: "Zen Boost (250ml)",
    price: "7 250 FCFA",
    stock: 210,
    status: "instock",
  },
  {
    id: "ZEN-RX-1000",
    name: "Zen Relax (1L)",
    price: "14 995 FCFA",
    stock: 0,
    status: "outofstock",
  },
  {
    id: "ZEN-FL-750",
    name: "Zen Flow (750ml)",
    price: "12 495 FCFA",
    stock: 150,
    status: "instock",
  },
];

export function ProductInventoryCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  
  const filteredProducts = demoProducts.filter(product => {
    // Appliquer recherche par texte
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Appliquer filtre par statut
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Inventaire Produits</CardTitle>
        <div className="space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(demoProducts, null, 2));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "zen-products-inventory.json");
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
          >
            Exporter
          </Button>
          <Button size="sm" onClick={() => navigate("/produits")}>
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="search"
              placeholder="Rechercher un produit..."
              className="rounded-md border border-input px-3 py-1 text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="instock">En stock</SelectItem>
                <SelectItem value="lowstock">Stock faible</SelectItem>
                <SelectItem value="outofstock">Rupture de stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {filteredProducts.map((product) => (
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
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
