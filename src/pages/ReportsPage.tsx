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

export default function ReportsPage() {
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState("sales");

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
                {/* Placeholder for chart/data visualization */}
                <div className="h-80 w-full bg-muted/20 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Visualisation des données {activeReport}</p>
                </div>
                
                {/* Placeholder for tabular data */}
                <div className="mt-6">
                  <div className="rounded-md border">
                    <div className="py-3 px-4 border-b bg-muted/30">
                      <h3 className="font-medium">Données détaillées</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground">Tableau de données détaillées pour le rapport {activeReport}</p>
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
