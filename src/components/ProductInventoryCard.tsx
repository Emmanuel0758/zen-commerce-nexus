
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileText, FileSpreadsheet, FileDown } from "lucide-react";
import { exportData } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/hooks/use-app-settings";

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
  const { toast } = useToast();
  const { settings } = useAppSettings();
  
  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getExportData = () => {
    const localizedProducts = filteredProducts.map(product => {
      const statusTranslation = settings.language === 'fr'
        ? product.status === "instock" ? "En stock" : product.status === "lowstock" ? "Stock faible" : "Rupture de stock"
        : product.status === "instock" ? "In stock" : product.status === "lowstock" ? "Low stock" : "Out of stock";
      
      return {
        ...product,
        localizedStatus: statusTranslation
      };
    });
    
    return localizedProducts;
  };

  const exportFileName = settings.language === 'fr' ? 'inventaire-produits' : 'product-inventory';

  const handleExportRequest = async (format: "json" | "pdf" | "excel") => {
    try {
      toast({
        title: `Exportation ${format.toUpperCase()} en cours`,
        description: "Préparation du fichier..."
      });
      
      const exportData = getExportData();
      const metadata = {
        title: settings.language === 'fr' ? "Inventaire produits" : "Product inventory",
        exportDate: new Date().toISOString(),
        totalItems: exportData.length,
        appName: settings.appName
      };
      
      const success = await exportData(
        format, 
        exportFileName, 
        exportData, 
        metadata
      );
      
      if (success) {
        toast({
          title: "Exportation réussie",
          description: `L'inventaire des produits a été exporté en format ${format.toUpperCase()}`
        });
      } else {
        throw new Error("Échec de l'exportation");
      }
    } catch (error) {
      console.error("Erreur lors de l'exportation:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Inventaire Produits</CardTitle>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExportRequest("excel")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Format Excel (CSV)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportRequest("pdf")}>
                <FileDown className="mr-2 h-4 w-4" />
                Format PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportRequest("json")}>
                <FileText className="mr-2 h-4 w-4" />
                Format JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
