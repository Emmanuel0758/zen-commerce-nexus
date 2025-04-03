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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileText, FileSpreadsheet, FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { exportData } from "@/utils/exportUtils";
import { useAppSettings } from "@/hooks/use-app-settings";
import "@/types/jspdf-extensions";

type Product = {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: "lowstock" | "instock" | "outofstock";
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Zen Classic (500ml)",
    sku: "ZEN-CL-500",
    price: "9 999 FCFA",
    stock: 85,
    status: "lowstock",
  },
  {
    id: "2",
    name: "Zen Boost (250ml)",
    sku: "ZEN-BO-250",
    price: "7 250 FCFA",
    stock: 210,
    status: "instock",
  },
  {
    id: "3",
    name: "Zen Relax (1L)",
    sku: "ZEN-RX-1000",
    price: "14 995 FCFA",
    stock: 0,
    status: "outofstock",
  },
  {
    id: "4",
    name: "Zen Flow (750ml)",
    sku: "ZEN-FL-750",
    price: "12 495 FCFA",
    stock: 150,
    status: "instock",
  },
  {
    id: "5",
    name: "Zen Ultimate (500ml)",
    sku: "ZEN-UL-500",
    price: "17 495 FCFA",
    stock: 65,
    status: "lowstock",
  },
  {
    id: "6",
    name: "Zen Mini (100ml)",
    sku: "ZEN-MI-100",
    price: "4 995 FCFA",
    stock: 320,
    status: "instock",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("none");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    sku: "",
    price: "",
    stock: 0,
    status: "instock"
  });
  
  const { toast } = useToast();
  const { settings } = useAppSettings();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (priceSort === "asc") {
      return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
    } else if (priceSort === "desc") {
      return parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, ''));
    }
    return 0;
  });

  const inStockCount = products.filter(p => p.status === "instock").length;
  const lowStockCount = products.filter(p => p.status === "lowstock").length;
  const outOfStockCount = products.filter(p => p.status === "outofstock").length;

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.price) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const stockNum = Number(newProduct.stock);
    let productStatus: "lowstock" | "instock" | "outofstock" = "instock";
    
    if (stockNum <= 0) {
      productStatus = "outofstock";
    } else if (stockNum < 100) {
      productStatus = "lowstock";
    }

    const newProductComplete: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      sku: newProduct.sku,
      price: newProduct.price.endsWith('FCFA') ? newProduct.price : `${newProduct.price} FCFA`,
      stock: stockNum,
      status: productStatus
    };

    setProducts([...products, newProductComplete]);
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      price: "",
      stock: 0,
      status: "instock"
    });

    toast({
      title: "Produit ajouté",
      description: `${newProductComplete.name} a été ajouté avec succès`
    });
  };

  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    if (currentProduct.price && !currentProduct.price.includes('FCFA')) {
      currentProduct.price = `${currentProduct.price} FCFA`;
    }
    
    const updatedProducts = products.map(p => 
      p.id === currentProduct.id ? currentProduct : p
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Produit mis à jour",
      description: `${currentProduct.name} a été mis à jour avec succès`
    });
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.filter(p => p.id !== currentProduct.id);
    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Produit supprimé",
      description: `${currentProduct.name} a été supprimé avec succès`
    });
  };

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleExportProducts = async (format: "json" | "pdf" | "excel") => {
    try {
      toast({
        title: `Exportation ${format.toUpperCase()} en cours`,
        description: "Préparation du fichier..."
      });
      
      if (format === "pdf") {
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
        doc.text('CATALOGUE PRODUITS', 105, 55, { align: 'center' });
        
        doc.setFontSize(11);
        doc.text(`Date d'exportation: ${new Date().toLocaleDateString('fr-FR')}`, 105, 62, { align: 'center' });
        
        const headers = [["Nom", "Référence", "Prix", "Stock", "Statut"]];
        
        const data = products.map(product => {
          const status = 
            product.status === "instock" ? "En stock" : 
            product.status === "lowstock" ? "Stock faible" : 
            "Rupture de stock";
          
          return [
            product.name,
            product.sku,
            product.price,
            product.stock.toString(),
            status
          ];
        });
        
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
            0: { cellWidth: 60 },
            1: { cellWidth: 30 },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 20, halign: 'right' },
            4: { cellWidth: 30 }
          }
        });
        
        const finalY = doc.lastAutoTable.finalY;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total produits: ${products.length}`, 15, finalY + 15);
        doc.text(`En stock: ${inStockCount}`, 15, finalY + 22);
        doc.text(`Stock faible: ${lowStockCount}`, 15, finalY + 29);
        doc.text(`Rupture de stock: ${outOfStockCount}`, 15, finalY + 36);
        
        const pageCount = doc.internal.getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text(`${settings.appName} - Page ${i} sur ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
        }
        
        doc.save(`catalogue-produits.pdf`);
        
        toast({
          title: "Exportation réussie",
          description: `Le catalogue des produits a été exporté en format PDF`
        });
        return;
      }
      
      const dataToExport = {
        metadata: {
          title: "Catalogue des produits Zen",
          exportDate: new Date().toISOString(),
          totalProducts: products.length,
          inStock: inStockCount,
          lowStock: lowStockCount,
          outOfStock: outOfStockCount
        },
        products: products.map(product => ({
          ...product,
          statusText: product.status === "instock" ? "En stock" : 
                      product.status === "lowstock" ? "Stock faible" : "Rupture de stock"
        }))
      };
      
      const success = await exportData(dataToExport, format, "zen-products");
      
      if (success) {
        toast({
          title: "Exportation réussie",
          description: `Le catalogue des produits a été exporté en format ${format.toUpperCase()}`
        });
      } else {
        throw new Error("Échec de l'exportation");
      }
    } catch (error) {
      console.error("Erreur lors de l'exportation:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation du catalogue",
        variant: "destructive"
      });
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriceSort("none");
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres ont été réinitialisés"
    });
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExportProducts("excel")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Format Excel (CSV)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportProducts("pdf")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Format PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportProducts("json")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Format JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsAddDialogOpen(true)}>
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
              <div className="text-4xl font-bold text-zen-500">{products.length}</div>
              <p className="text-sm text-muted-foreground">Produits actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-green-500">{inStockCount}</div>
              <p className="text-sm text-muted-foreground">Produits en stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-amber-500">{lowStockCount}</div>
              <p className="text-sm text-muted-foreground">Stock faible</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl font-bold text-red-500">{outOfStockCount}</div>
              <p className="text-sm text-muted-foreground">Rupture de stock</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Liste des produits</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="rounded-md border border-input px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="instock">En stock</SelectItem>
                  <SelectItem value="lowstock">Stock faible</SelectItem>
                  <SelectItem value="outofstock">Rupture de stock</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={priceSort}
                onValueChange={(value) => setPriceSort(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Non trié</SelectItem>
                  <SelectItem value="asc">Prix croissant</SelectItem>
                  <SelectItem value="desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
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
                {filteredProducts.map((product) => (
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
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                          Éditer
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(product)}>
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un nouveau produit
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">Référence</Label>
              <Input
                id="sku"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Prix</Label>
              <Input
                id="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="0 FCFA"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddProduct}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un produit</DialogTitle>
            <DialogDescription>
              Modifiez les informations du produit
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Nom</Label>
                <Input
                  id="edit-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-sku" className="text-right">Référence</Label>
                <Input
                  id="edit-sku"
                  value={currentProduct.sku}
                  onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Prix</Label>
                <Input
                  id="edit-price"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => {
                    const stock = parseInt(e.target.value) || 0;
                    let status = currentProduct.status;
                    if (stock <= 0) status = "outofstock";
                    else if (stock < 100) status = "lowstock";
                    else status = "instock";
                    
                    setCurrentProduct({...currentProduct, stock, status});
                  }}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Statut</Label>
                <Select 
                  value={currentProduct.status}
                  onValueChange={(value: "lowstock" | "instock" | "outofstock") => 
                    setCurrentProduct({...currentProduct, status: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instock">En stock</SelectItem>
                    <SelectItem value="lowstock">Stock faible</SelectItem>
                    <SelectItem value="outofstock">Rupture de stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleEditProduct}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer un produit</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="py-4">
              <p><strong>Produit :</strong> {currentProduct.name}</p>
              <p><strong>Référence :</strong> {currentProduct.sku}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
