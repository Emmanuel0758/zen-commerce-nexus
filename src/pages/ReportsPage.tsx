
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Download, RefreshCw, Calendar, Filter, FileDown, FileType2, FileSpreadsheet } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ReportsPage() {
  const { toast } = useToast();
  const [salesReportDialogOpen, setIsSalesReportDialogOpen] = useState(false);
  const [customersReportDialogOpen, setIsCustomersReportDialogOpen] = useState(false);
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false);
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = (type: string) => {
    setIsGenerating(true);
    
    // Simuler la génération de rapport
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Rapport généré",
        description: `Le rapport ${type} a été généré avec succès`
      });
      
      if (type === "ventes") {
        setIsSalesReportDialogOpen(false);
      } else if (type === "clients") {
        setIsCustomersReportDialogOpen(false);
      } else if (type === "performance") {
        setPerformanceDialogOpen(false);
      } else if (type === "inventaire") {
        setInventoryDialogOpen(false);
      }
      
      // Génération automatique du PDF après 1 seconde
      setTimeout(() => {
        const fileType = type === "ventes" ? "PDF" : "Excel";
        downloadReport(type, fileType.toLowerCase());
      }, 1000);
    }, 1500);
  };

  const downloadReport = (type: string, format: "pdf" | "excel" | "csv") => {
    // Afficher un toast de téléchargement en cours
    toast({
      title: "Téléchargement en cours",
      description: `Le rapport ${type} est en cours de téléchargement au format ${format.toUpperCase()}`
    });
    
    if (format === "csv") {
      // Simuler l'export CSV
      let csvContent = "Date,Produit,Quantité,Total\n";
      csvContent += "15/07/2023,Zen Classic,5,49995 FCFA\n";
      csvContent += "14/07/2023,Zen Boost,3,21750 FCFA\n";
      csvContent += "13/07/2023,Zen Relax,2,29990 FCFA\n";
      
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `rapport-${type}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (format === "pdf") {
      // Simuler l'export PDF en créant un faux téléchargement
      setTimeout(() => {
        const blob = new Blob(["Contenu du rapport PDF"], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `rapport-${type}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        toast({
          title: "Export PDF terminé",
          description: "Le fichier PDF a été téléchargé"
        });
      }, 1000);
    } else if (format === "excel") {
      // Simuler l'export Excel
      setTimeout(() => {
        const blob = new Blob(["Contenu du rapport Excel"], { type: "application/vnd.ms-excel" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `rapport-${type}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        toast({
          title: "Export Excel terminé",
          description: "Le fichier Excel a été téléchargé"
        });
      }, 1000);
    }
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Rapports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Analysez vos performances et générez des rapports détaillés.
            </p>
            
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Rapport des ventes</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Actualisation",
                          description: "Les données des ventes ont été actualisées"
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("ventes", "pdf")}>
                            <FileDown className="h-4 w-4" />
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("ventes", "excel")}>
                            <FileSpreadsheet className="h-4 w-4" />
                            Exporter en Excel
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("ventes", "csv")}>
                            <FileType2 className="h-4 w-4" />
                            Exporter en CSV
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setIsSalesReportDialogOpen(true)}
                    >
                      Générer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Aperçu des ventes</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Ventes totales (mois)</p>
                          <p className="text-2xl font-bold">1,245,750 FCFA</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Commandes (mois)</p>
                          <p className="text-2xl font-bold">87</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Valeur moyenne</p>
                          <p className="text-2xl font-bold">14,320 FCFA</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Taux de conversion</p>
                          <p className="text-2xl font-bold">3.2%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Tendances clients</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Actualisation",
                          description: "Les données clients ont été actualisées"
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("clients", "pdf")}>
                            <FileDown className="h-4 w-4" />
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("clients", "excel")}>
                            <FileSpreadsheet className="h-4 w-4" />
                            Exporter en Excel
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("clients", "csv")}>
                            <FileType2 className="h-4 w-4" />
                            Exporter en CSV
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setIsCustomersReportDialogOpen(true)}
                    >
                      Générer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Aperçu des clients</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nouveaux clients (mois)</p>
                          <p className="text-2xl font-bold">35</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Taux de rétention</p>
                          <p className="text-2xl font-bold">68%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Valeur client moyenne</p>
                          <p className="text-2xl font-bold">42,500 FCFA</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Panier moyen</p>
                          <p className="text-2xl font-bold">14,750 FCFA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Rapport de performance</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Actualisation",
                          description: "Les données de performance ont été actualisées"
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("performance", "pdf")}>
                            <FileDown className="h-4 w-4" />
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("performance", "excel")}>
                            <FileSpreadsheet className="h-4 w-4" />
                            Exporter en Excel
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => setPerformanceDialogOpen(true)}
                      variant="outline"
                    >
                      Génération automatique
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Générez des rapports automatiques sur la performance globale de votre boutique.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Analyse des stocks</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Actualisation",
                          description: "Les données des stocks ont été actualisées"
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("inventaire", "pdf")}>
                            <FileDown className="h-4 w-4" />
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm gap-2" onClick={() => downloadReport("inventaire", "excel")}>
                            <FileSpreadsheet className="h-4 w-4" />
                            Exporter en Excel
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => setInventoryDialogOpen(true)}
                      variant="outline"
                    >
                      Analyser les stocks
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Identifiez les produits en rupture et les opportunités de réapprovisionnement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue Génération Rapport des ventes */}
      <Dialog open={salesReportDialogOpen} onOpenChange={setIsSalesReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Générer un rapport des ventes</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="report-period" className="text-sm font-medium block mb-1">
                  Période
                </label>
                <select
                  id="report-period"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month" selected>Ce mois-ci</option>
                  <option value="quarter">Ce trimestre</option>
                  <option value="year">Cette année</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Plage de dates
                  </label>
                  <Button variant="ghost" size="sm" className="h-8 flex gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Sélectionner</span>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    id="start-date"
                    className="flex-1 px-3 py-2 border rounded-md"
                    defaultValue="2023-07-01"
                  />
                  <span className="flex items-center">à</span>
                  <input
                    type="date"
                    id="end-date"
                    className="flex-1 px-3 py-2 border rounded-md"
                    defaultValue="2023-07-31"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Options</label>
                  <Button variant="ghost" size="sm" className="h-8 flex gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="text-xs">Filtres</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-taxes" defaultChecked />
                    <label htmlFor="include-taxes" className="text-sm">Inclure les taxes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="show-returns" defaultChecked />
                    <label htmlFor="show-returns" className="text-sm">Afficher les retours</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="group-by-product" defaultChecked />
                    <label htmlFor="group-by-product" className="text-sm">Grouper par produit</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSalesReportDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleGenerateReport("ventes")} 
              disabled={isGenerating}
            >
              {isGenerating ? "Génération en cours..." : "Générer le rapport"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Génération Rapport clients */}
      <Dialog open={customersReportDialogOpen} onOpenChange={setIsCustomersReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Générer un rapport client</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="customer-segment" className="text-sm font-medium block mb-1">
                  Segment de clients
                </label>
                <select
                  id="customer-segment"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="all">Tous les clients</option>
                  <option value="new">Nouveaux clients</option>
                  <option value="loyal">Clients fidèles</option>
                  <option value="inactive">Clients inactifs</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="start-date-customer" className="text-sm font-medium">
                    Plage de dates
                  </label>
                  <Button variant="ghost" size="sm" className="h-8 flex gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Sélectionner</span>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    id="start-date-customer"
                    className="flex-1 px-3 py-2 border rounded-md"
                    defaultValue="2023-01-01"
                  />
                  <span className="flex items-center">à</span>
                  <input
                    type="date"
                    id="end-date-customer"
                    className="flex-1 px-3 py-2 border rounded-md"
                    defaultValue="2023-07-31"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Options</label>
                  <Button variant="ghost" size="sm" className="h-8 flex gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="text-xs">Filtres</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-demographics" defaultChecked />
                    <label htmlFor="include-demographics" className="text-sm">Inclure données démographiques</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="purchase-history" defaultChecked />
                    <label htmlFor="purchase-history" className="text-sm">Inclure l'historique des achats</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-revenue" defaultChecked />
                    <label htmlFor="include-revenue" className="text-sm">Calculer le revenu par client</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomersReportDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleGenerateReport("clients")}
              disabled={isGenerating}
            >
              {isGenerating ? "Génération en cours..." : "Générer le rapport"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Rapport Performance */}
      <Dialog open={performanceDialogOpen} onOpenChange={setPerformanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rapport de performance</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="performance-period" className="text-sm font-medium block mb-1">
                  Période d'analyse
                </label>
                <select
                  id="performance-period"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="month">Mensuel</option>
                  <option value="quarter" selected>Trimestriel</option>
                  <option value="year">Annuel</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Métriques</label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-sales" defaultChecked />
                    <label htmlFor="include-sales" className="text-sm">Ventes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-marketing" defaultChecked />
                    <label htmlFor="include-marketing" className="text-sm">Performances marketing</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-customer" defaultChecked />
                    <label htmlFor="include-customer" className="text-sm">Satisfaction client</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-logistics" defaultChecked />
                    <label htmlFor="include-logistics" className="text-sm">Logistique</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPerformanceDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleGenerateReport("performance")}
              disabled={isGenerating}
            >
              {isGenerating ? "Génération en cours..." : "Générer le rapport"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Analyse des Stocks */}
      <Dialog open={inventoryDialogOpen} onOpenChange={setInventoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Analyse des stocks</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <label htmlFor="inventory-type" className="text-sm font-medium block mb-1">
                  Type d'analyse
                </label>
                <select
                  id="inventory-type"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="low-stock">Produits en rupture de stock</option>
                  <option value="best-sellers">Meilleures ventes</option>
                  <option value="slow-moving">Produits à rotation lente</option>
                  <option value="all" selected>Analyse complète</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Options d'analyse</label>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="forecast-demand" defaultChecked />
                    <label htmlFor="forecast-demand" className="text-sm">Prévision de la demande</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="reorder-suggestions" defaultChecked />
                    <label htmlFor="reorder-suggestions" className="text-sm">Suggestions de réapprovisionnement</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="cost-analysis" defaultChecked />
                    <label htmlFor="cost-analysis" className="text-sm">Analyse des coûts</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInventoryDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => handleGenerateReport("inventaire")}
              disabled={isGenerating}
            >
              {isGenerating ? "Analyse en cours..." : "Analyser les stocks"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
