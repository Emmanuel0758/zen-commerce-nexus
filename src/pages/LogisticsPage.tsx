import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { DeliveryMapCard } from "@/components/DeliveryMapCard";
import { DeliveryTrackingTable } from "@/components/DeliveryTrackingTable";
import { CarriersConfigCard } from "@/components/CarriersConfigCard";
import { ShippingZonesCard } from "@/components/ShippingZonesCard";
import { Button } from "@/components/ui/button";
import { Truck, Map, Settings, Download, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useDataExport } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

export default function LogisticsPage() {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const { handleExport } = useDataExport();
  const { toast } = useToast();

  // Données de démo pour l'exportation
  const demoLogisticsData = {
    deliveries: [
      { id: "DEL-1055", status: "en_cours", destination: "Abidjan Centre", date: "2025-04-02" },
      { id: "DEL-1052", status: "retard", destination: "Bouaké", date: "2025-04-01" },
      { id: "DEL-1050", status: "prêt", destination: "Yamoussoukro", date: "2025-04-03" },
      { id: "DEL-1048", status: "en_cours", destination: "San-Pédro", date: "2025-04-02" },
      { id: "DEL-1045", status: "en_cours", destination: "Korhogo", date: "2025-04-01" },
    ],
    carriers: [
      { id: 1, name: "Livreur Express Abidjan", active: true, zone: "Sud" },
      { id: 2, name: "Transporteur National CI", active: true, zone: "National" },
      { id: 3, name: "Livreur Yamoussoukro", active: false, zone: "Centre" },
    ],
    zones: [
      { id: 1, name: "Abidjan et environs", deliveryTime: "24h", price: "1000 FCFA" },
      { id: 2, name: "Villes principales", deliveryTime: "48h", price: "2500 FCFA" },
      { id: 3, name: "Rural", deliveryTime: "72-96h", price: "5000 FCFA" },
    ]
  };

  // Fonction pour gérer l'export de données
  const handleExportRequest = async (format: "json" | "pdf" | "excel") => {
    await handleExport(demoLogisticsData, format, "logistique-donnees");
  };

  // Fonction pour gérer l'import de données
  const handleImport = () => {
    // Simuler un import réussi
    setTimeout(() => {
      toast({
        title: "Import réussi",
        description: "Les données ont été importées avec succès"
      });
      setImportDialogOpen(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Logistique</CardTitle>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exporter
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="flex flex-col gap-1">
                      <Button variant="ghost" className="justify-start" onClick={() => handleExportRequest("excel")}>
                        Format Excel (CSV)
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => handleExportRequest("pdf")}>
                        Format PDF
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => handleExportRequest("json")}>
                        Format JSON
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => setImportDialogOpen(true)}>
                  <Upload className="h-4 w-4" />
                  Importer
                </Button>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => setSettingsDialogOpen(true)}>
                  <Settings className="h-4 w-4" />
                  Paramètres
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Gérez vos livraisons, transporteurs et suivez vos expéditions en temps réel en Côte d'Ivoire.
            </p>
            
            <div className="flex flex-col gap-6">
              {/* Carte principale avec la carte de livraisons */}
              <DeliveryMapCard />
              
              {/* Table de suivi des livraisons */}
              <Card>
                <CardContent className="pt-6">
                  <DeliveryTrackingTable />
                </CardContent>
              </Card>
              
              {/* Section avec les cards de configuration */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CarriersConfigCard />
                <ShippingZonesCard />
              </div>
              
              {/* Section statistiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-md font-medium">Statistiques de Livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="text-4xl font-bold text-green-600 mb-1">94%</div>
                        <p className="text-sm text-muted-foreground">Livraisons à temps</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="text-4xl font-bold text-amber-500 mb-1">2.3h</div>
                        <p className="text-sm text-muted-foreground">Temps moyen de livraison</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-1">8</div>
                        <p className="text-sm text-muted-foreground">Livraisons en cours</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogue Paramètres */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paramètres de Logistique</DialogTitle>
            <DialogDescription>
              Configurez les paramètres de votre système de logistique
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Méthodes de livraison</h3>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="standard" defaultChecked />
                  <label htmlFor="standard">Livraison standard</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="express" defaultChecked />
                  <label htmlFor="express">Livraison express</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sameday" />
                  <label htmlFor="sameday">Livraison le jour même</label>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Notifications</h3>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="customer_notif" defaultChecked />
                  <label htmlFor="customer_notif">Notifier les clients des mises à jour</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="admin_notif" defaultChecked />
                  <label htmlFor="admin_notif">Notifier les administrateurs des problèmes</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              toast({
                title: "Paramètres mis à jour",
                description: "Les paramètres de logistique ont été mis à jour"
              });
              setSettingsDialogOpen(false);
            }}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue Importer */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer des données</DialogTitle>
            <DialogDescription>
              Importez des données de livraisons depuis un fichier
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Glissez-déposez un fichier ici ou cliquez pour parcourir
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Formats supportés: CSV, JSON, XLS
                  </p>
                  <Button variant="outline" className="mt-4">
                    Parcourir les fichiers
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleImport}>
              Importer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
