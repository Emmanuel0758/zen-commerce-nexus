
import { useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  FileSpreadsheet, 
  Filter, 
  Download,
  Share2, 
  Printer, 
  Mail
} from "lucide-react";
import { SalesChart } from "@/components/SalesChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppSettings } from "@/hooks/use-app-settings";

export default function ReportsPage() {
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState("sales");
  const { settings } = useAppSettings();

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    toast({
      title: `Rapport exporté en ${format.toUpperCase()}`,
      description: "Le fichier a été téléchargé avec succès"
    });
  };

  const handlePrintReport = () => {
    toast({
      title: "Impression lancée",
      description: "Le rapport a été envoyé à l'imprimante"
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Rapport envoyé par email",
      description: "Le rapport a été envoyé aux destinataires sélectionnés"
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Lien de partage créé",
      description: "Le lien a été copié dans le presse-papier"
    });
  };

  // Données pour les tableaux de démonstration
  const getSampleTableData = () => {
    switch(activeReport) {
      case "sales":
        return {
          headers: ["Produit", "Quantité", "Revenu", "Croissance"],
          rows: [
            ["Zen Classic (500ml)", "1,245", "12,437,550 FCFA", "+12%"],
            ["Zen Boost (250ml)", "987", "7,155,750 FCFA", "+8%"],
            ["Zen Relax (1L)", "654", "9,807,000 FCFA", "+15%"],
            ["Zen Flow (750ml)", "432", "5,398,080 FCFA", "+5%"],
            ["Zen Mini (100ml)", "1,865", "9,316,675 FCFA", "+22%"]
          ]
        };
      case "inventory":
        return {
          headers: ["Produit", "Stock actuel", "Stock min", "Réapprovisionnement"],
          rows: [
            ["Zen Classic (500ml)", "85", "50", "Non"],
            ["Zen Boost (250ml)", "210", "100", "Non"],
            ["Zen Relax (1L)", "0", "50", "Oui - Urgent"],
            ["Zen Flow (750ml)", "150", "75", "Non"],
            ["Zen Mini (100ml)", "320", "150", "Non"]
          ]
        };
      case "customers":
        return {
          headers: ["Client", "Commandes", "Valeur totale", "Dernière commande"],
          rows: [
            ["Sophie Martin", "12", "958,788 FCFA", "15/07/2023"],
            ["Thomas Bernard", "8", "567,442 FCFA", "12/07/2023"],
            ["Emma Dubois", "15", "1,245,675 FCFA", "14/07/2023"],
            ["Alexandre Petit", "5", "344,950 FCFA", "10/07/2023"],
            ["Chloé Robert", "9", "789,491 FCFA", "11/07/2023"]
          ]
        };
      case "marketing":
        return {
          headers: ["Campagne", "Portée", "Conversions", "ROI"],
          rows: [
            ["Été Zen", "45,678", "1,234", "3.2x"],
            ["Rentrée Fraîche", "32,456", "876", "2.8x"],
            ["Promo Boost", "28,765", "954", "4.1x"],
            ["Zen pour Tous", "56,789", "1,432", "3.7x"],
            ["Découverte Mini", "34,567", "1,123", "5.2x"]
          ]
        };
      case "delivery":
        return {
          headers: ["Zone", "Commandes", "Délai moyen", "Taux de livraison"],
          rows: [
            ["Abidjan Centre", "456", "1.2 jours", "98.5%"],
            ["Abidjan Nord", "345", "1.5 jours", "97.2%"],
            ["Abidjan Sud", "432", "1.3 jours", "98.1%"],
            ["Bingerville", "234", "2.1 jours", "95.4%"],
            ["Grand Bassam", "178", "2.5 jours", "94.2%"]
          ]
        };
      default:
        return {
          headers: ["Colonne 1", "Colonne 2", "Colonne 3", "Colonne 4"],
          rows: []
        };
    }
  };

  const tableData = getSampleTableData();

  // Rendu de la visualisation adaptée au type de rapport
  const renderDataVisualization = () => {
    switch(activeReport) {
      case "sales":
        return <SalesChart />;
      case "inventory":
        return (
          <div className="h-80 w-full rounded-md">
            <div className="flex h-full items-end justify-between px-4">
              {/* Graphique à barres simplifié pour l'inventaire */}
              <div className="flex flex-col items-center">
                <div className="mb-2 h-56 w-16 rounded-t-md bg-green-500"></div>
                <span className="mt-2 text-xs">Classic</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-40 w-16 rounded-t-md bg-green-500"></div>
                <span className="mt-2 text-xs">Boost</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-2 w-16 rounded-t-md bg-red-500"></div>
                <span className="mt-2 text-xs">Relax</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-28 w-16 rounded-t-md bg-green-500"></div>
                <span className="mt-2 text-xs">Flow</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-64 w-16 rounded-t-md bg-green-500"></div>
                <span className="mt-2 text-xs">Mini</span>
              </div>
            </div>
          </div>
        );
      case "customers":
        return (
          <div className="h-80 w-full rounded-md">
            <div className="flex h-full flex-col justify-center gap-4 px-4">
              {/* Graphique pour le top 5 clients */}
              <div className="flex items-center">
                <span className="w-24 text-xs">S. Martin</span>
                <div className="ml-2 h-6 rounded-md bg-purple-500" style={{ width: '80%' }}></div>
                <span className="ml-2 text-xs">958,788</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs">E. Dubois</span>
                <div className="ml-2 h-6 rounded-md bg-purple-500" style={{ width: '65%' }}></div>
                <span className="ml-2 text-xs">1,245,675</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs">C. Robert</span>
                <div className="ml-2 h-6 rounded-md bg-purple-500" style={{ width: '50%' }}></div>
                <span className="ml-2 text-xs">789,491</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs">T. Bernard</span>
                <div className="ml-2 h-6 rounded-md bg-purple-500" style={{ width: '40%' }}></div>
                <span className="ml-2 text-xs">567,442</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-xs">A. Petit</span>
                <div className="ml-2 h-6 rounded-md bg-purple-500" style={{ width: '25%' }}></div>
                <span className="ml-2 text-xs">344,950</span>
              </div>
            </div>
          </div>
        );
      case "marketing":
        return (
          <div className="h-80 w-full rounded-md">
            <div className="grid h-full grid-cols-2 gap-4 p-4">
              {/* Graphique en camembert simplifié pour le marketing */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-40 w-40 rounded-full bg-gray-200">
                  <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-red-500 border-b-green-500 border-l-yellow-500 transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">ROI</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center text-xs">
                    <div className="mr-1 h-2 w-2 bg-blue-500"></div>
                    <span>Été Zen</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="mr-1 h-2 w-2 bg-red-500"></div>
                    <span>Rentrée</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="mr-1 h-2 w-2 bg-green-500"></div>
                    <span>Promo</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="mr-1 h-2 w-2 bg-yellow-500"></div>
                    <span>Découverte</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="rounded-md border p-3 text-center">
                  <div className="text-2xl font-bold">157k</div>
                  <div className="text-xs text-muted-foreground">Portée totale</div>
                </div>
                <div className="rounded-md border p-3 text-center">
                  <div className="text-2xl font-bold">5619</div>
                  <div className="text-xs text-muted-foreground">Conversions</div>
                </div>
                <div className="rounded-md border bg-green-100 dark:bg-green-900 p-3 text-center">
                  <div className="text-2xl font-bold">3.8x</div>
                  <div className="text-xs text-muted-foreground">ROI moyen</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "delivery":
        return (
          <div className="h-80 w-full rounded-md">
            <div className="flex h-full flex-col justify-between p-4">
              {/* Carte de taux de livraison */}
              <div className="mb-4 flex justify-between">
                <h4 className="text-sm font-medium">Taux de livraison par zone</h4>
                <span className="text-xs text-muted-foreground">Avril 2025</span>
              </div>
              <div className="flex-1 relative rounded-lg border overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
                  {/* Représentation simplifiée d'une carte */}
                  <div className="absolute inset-10 rounded-full border-2 border-dashed border-gray-300"></div>
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-green-500">
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">Abidjan Centre (98.5%)</span>
                  </div>
                  <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-green-500">
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">Abidjan Nord (97.2%)</span>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-green-500">
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">Abidjan Sud (98.1%)</span>
                  </div>
                  <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-yellow-500">
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">Bingerville (95.4%)</span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-yellow-500">
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">Grand Bassam (94.2%)</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">&gt;95%</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span className="text-xs">90-95%</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs">&lt;90%</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-80 w-full bg-muted/20 flex items-center justify-center rounded-md">
            <p className="text-muted-foreground">Sélectionnez un type de rapport</p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Rapports</h1>
          <p className="text-muted-foreground">
            Consultez et exportez les rapports d'activité
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Catégories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  <Button 
                    variant={activeReport === "sales" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveReport("sales")}
                  >
                    Ventes
                  </Button>
                  <Button 
                    variant={activeReport === "inventory" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveReport("inventory")}
                  >
                    Inventaire
                  </Button>
                  <Button 
                    variant={activeReport === "customers" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveReport("customers")}
                  >
                    Clients
                  </Button>
                  <Button 
                    variant={activeReport === "marketing" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveReport("marketing")}
                  >
                    Marketing
                  </Button>
                  <Button 
                    variant={activeReport === "delivery" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveReport("delivery")}
                  >
                    Livraisons
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleExportReport("pdf")}
                >
                  <FileText className="h-4 w-4" />
                  Exporter en PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleExportReport("excel")}
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Exporter en Excel
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleExportReport("csv")}
                >
                  <Download className="h-4 w-4" />
                  Exporter en CSV
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handlePrintReport}
                >
                  <Printer className="h-4 w-4" />
                  Imprimer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleEmailReport}
                >
                  <Mail className="h-4 w-4" />
                  Envoyer par email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleShareReport}
                >
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {activeReport === "sales" && "Rapport de ventes"}
                  {activeReport === "inventory" && "Rapport d'inventaire"}
                  {activeReport === "customers" && "Rapport clients"}
                  {activeReport === "marketing" && "Rapport marketing"}
                  {activeReport === "delivery" && "Rapport livraisons"}
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" /> Filtrer
                </Button>
              </CardHeader>
              <CardContent>
                {/* Rendu de la visualisation de données en fonction du rapport sélectionné */}
                {renderDataVisualization()}
                
                {/* Tableau des données détaillées */}
                <div className="mt-6">
                  <div className="rounded-md border">
                    <div className="py-3 px-4 border-b bg-muted/30">
                      <h3 className="font-medium">Données détaillées</h3>
                    </div>
                    <div className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {tableData.headers.map((header, index) => (
                              <TableHead key={index}>{header}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tableData.rows.length > 0 ? (
                            tableData.rows.map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={tableData.headers.length} className="text-center py-4 text-muted-foreground">
                                Aucune donnée disponible
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
