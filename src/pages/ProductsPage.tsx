
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

type Product = {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: "lowstock" | "instock" | "outofstock";
};

const demoProducts: Product[] = [
  {
    id: "1",
    name: "Zen Classic (500ml)",
    sku: "ZEN-CL-500",
    price: "19,99 €",
    stock: 85,
    status: "lowstock",
  },
  {
    id: "2",
    name: "Zen Boost (250ml)",
    sku: "ZEN-BO-250",
    price: "14,50 €",
    stock: 210,
    status: "instock",
  },
  {
    id: "3",
    name: "Zen Relax (1L)",
    sku: "ZEN-RX-1000",
    price: "29,99 €",
    stock: 0,
    status: "outofstock",
  },
  {
    id: "4",
    name: "Zen Flow (750ml)",
    sku: "ZEN-FL-750",
    price: "24,99 €",
    stock: 150,
    status: "instock",
  },
  {
    id: "5",
    name: "Zen Ultimate (500ml)",
    sku: "ZEN-UL-500",
    price: "34,99 €",
    stock: 65,
    status: "lowstock",
  },
  {
    id: "6",
    name: "Zen Mini (100ml)",
    sku: "ZEN-MI-100",
    price: "9,99 €",
    stock: 320,
    status: "instock",
  },
];

export default function ProductsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav />
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Produits et Stocks</h1>
            <p className="text-muted-foreground">
              Gérez vos produits et suivez votre inventaire
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
              Ajouter Produit
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-zen-500">6</div>
              <p className="text-sm text-muted-foreground">Produits actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-green-500">3</div>
              <p className="text-sm text-muted-foreground">Produits en stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-amber-500">2</div>
              <p className="text-sm text-muted-foreground">Stock faible</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-red-500">1</div>
              <p className="text-sm text-muted-foreground">Rupture de stock</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Liste des produits</CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="rounded-md border border-input px-3 py-1 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="text-right">{product.price}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      <StatusBadge status={product.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="destructive" size="sm">
                          Supprimer
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
