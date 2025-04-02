
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Download, RefreshCw, Calendar, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ReportsPage() {
  const { toast } = useToast();
  const [salesReportDialogOpen, setIsSalesReportDialogOpen] = useState(false);
  const [customersReportDialogOpen, setIsCustomersReportDialogOpen] = useState(false);
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
      }
    }, 1500);
  };

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    if (format === "csv") {
      // Simuler l'export CSV
      let csvContent = "Date,Produit,Quantité,Total\n";
      csvContent += "15/07/2023,Zen Classic,5,49995 FCFA\n";
      csvContent += "14/07/2023,Zen Boost,3,21750 FCFA\n";
      csvContent += "13/07/2023,Zen Relax,2,29990 FCFA\n";
      
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "rapport-ventes.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (format === "pdf") {
      // Simuler l'export PDF
      setTimeout(() => {
        toast({
          title: "Export PDF terminé",
          description: "Le fichier PDF a été téléchargé"
        });
      }, 1000);
    } else if (format === "excel") {
      // Simuler l'export Excel
      setTimeout(() => {
        toast({
          title: "Export Excel terminé",
          description: "Le fichier Excel a été téléchargé"
        });
      }, 1000);
    }
    
    toast({
      title: "Export en cours",
      description: `Le rapport est en cours d'export au format ${format.toUpperCase()}`
    });
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
                      <PopoverContent className="w-40">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("pdf")}>
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("excel")}>
                            Exporter en Excel
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("csv")}>
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
                      <PopoverContent className="w-40">
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("pdf")}>
                            Exporter en PDF
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("excel")}>
                            Exporter en Excel
                          </Button>
                          <Button variant="ghost" className="justify-start text-sm" onClick={() => handleExportReport("csv")}>
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
                <CardHeader>
                  <CardTitle>Rapport de performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Rapport de performance",
                          description: "Le rapport de performance sera disponible prochainement"
                        });
                      }}
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
                <CardHeader>
                  <CardTitle>Analyse des stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Analyse des stocks",
                          description: "L'analyse des stocks sera disponible prochainement"
                        });
                      }}
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
    </div>
  );
}
