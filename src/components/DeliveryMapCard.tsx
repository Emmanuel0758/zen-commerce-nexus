
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Package, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export function DeliveryMapCard() {
  const [activeDeliveries, setActiveDeliveries] = useState([
    { id: "DEL-1055", name: "Livraison Abidjan Centre", status: "en_cours", updated: "Il y a 35 min", destination: "Abidjan" },
    { id: "DEL-1052", name: "Livraison Bouaké", status: "retard", updated: "Il y a 2h", destination: "Bouaké" },
    { id: "DEL-1050", name: "Livraison Yamoussoukro", status: "prêt", updated: "Il y a 15 min", destination: "Yamoussoukro" },
    { id: "DEL-1048", name: "Livraison San-Pédro", status: "en_cours", updated: "Il y a 1h", destination: "San-Pédro" },
    { id: "DEL-1045", name: "Livraison Korhogo", status: "en_cours", updated: "Il y a 50 min", destination: "Korhogo" }
  ]);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Livraisons en cours</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs">En cours (3)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs">Retardé (1)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs">Prêt (1)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {activeDeliveries.map(delivery => (
              <div key={delivery.id} 
                className={`p-3 rounded-lg flex items-center justify-between ${
                  delivery.status === "en_cours" ? "bg-green-50 border-l-4 border-green-500" : 
                  delivery.status === "retard" ? "bg-amber-50 border-l-4 border-amber-500" : 
                  "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-white">
                    {delivery.status === "en_cours" ? <Truck className="text-green-500 h-5 w-5" /> : 
                     delivery.status === "retard" ? <AlertTriangle className="text-amber-500 h-5 w-5" /> : 
                     <Package className="text-blue-500 h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{delivery.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {delivery.id} • {delivery.updated}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-white px-2 py-1 rounded-full">
                  {delivery.destination}
                </span>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Avril 2025</h3>
                <div className="flex gap-1">
                  <button className="p-1 rounded hover:bg-muted">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <div className="text-xs text-muted-foreground">Lun</div>
                <div className="text-xs text-muted-foreground">Mar</div>
                <div className="text-xs text-muted-foreground">Mer</div>
                <div className="text-xs text-muted-foreground">Jeu</div>
                <div className="text-xs text-muted-foreground">Ven</div>
                <div className="text-xs text-muted-foreground">Sam</div>
                <div className="text-xs text-muted-foreground">Dim</div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center">
                <div className="text-xs p-2 text-muted-foreground">29</div>
                <div className="text-xs p-2 text-muted-foreground">30</div>
                <div className="text-xs p-2 text-muted-foreground">31</div>
                <div className="text-xs p-2">1</div>
                <div className="text-xs p-2">2</div>
                <div className="text-xs p-2 bg-green-100 rounded-full relative">
                  3
                  <span className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full"></span>
                </div>
                <div className="text-xs p-2">4</div>
                <div className="text-xs p-2">5</div>
                <div className="text-xs p-2 bg-amber-100 rounded-full relative">
                  6
                  <span className="absolute bottom-1 right-1 w-1 h-1 bg-amber-500 rounded-full"></span>
                </div>
                <div className="text-xs p-2">7</div>
                <div className="text-xs p-2">8</div>
                <div className="text-xs p-2 bg-blue-100 rounded-full relative">
                  9
                  <span className="absolute bottom-1 right-1 w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
                <div className="text-xs p-2">10</div>
                <div className="text-xs p-2">11</div>
                <div className="text-xs p-2 bg-green-100 rounded-full relative">
                  12
                  <span className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full"></span>
                </div>
                <div className="text-xs p-2">13</div>
                <div className="text-xs p-2">14</div>
                <div className="text-xs p-2">15</div>
                <div className="text-xs p-2">16</div>
                <div className="text-xs p-2">17</div>
                <div className="text-xs p-2">18</div>
                <div className="text-xs p-2">19</div>
                <div className="text-xs p-2">20</div>
                <div className="text-xs p-2">21</div>
                <div className="text-xs p-2">22</div>
                <div className="text-xs p-2">23</div>
                <div className="text-xs p-2">24</div>
                <div className="text-xs p-2">25</div>
                <div className="text-xs p-2">26</div>
                <div className="text-xs p-2">27</div>
                <div className="text-xs p-2">28</div>
                <div className="text-xs p-2">29</div>
                <div className="text-xs p-2">30</div>
                <div className="text-xs p-2 text-muted-foreground">1</div>
                <div className="text-xs p-2 text-muted-foreground">2</div>
              </div>
              
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Livraisons en cours</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Livraisons en retard</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Livraisons prêtes</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
