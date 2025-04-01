
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";
import { DeliveryMapCard } from "@/components/DeliveryMapCard";
import { DeliveryTrackingTable } from "@/components/DeliveryTrackingTable";
import { CarriersConfigCard } from "@/components/CarriersConfigCard";
import { ShippingZonesCard } from "@/components/ShippingZonesCard";
import { Button } from "@/components/ui/button";
import { Truck, Map, Settings, Download, Upload } from "lucide-react";

export default function LogisticsPage() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Logistique</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Importer
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Paramètres
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Gérez vos livraisons, transporteurs et suivez vos expéditions en temps réel.
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
    </div>
  );
}
