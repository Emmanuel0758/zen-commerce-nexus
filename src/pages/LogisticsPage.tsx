
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";

export default function LogisticsPage() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Logistique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gérez vos livraisons, transporteurs et suivez vos expéditions.
            </p>
            
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Livraisons en cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aucune livraison en cours pour le moment.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Transporteurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aucun transporteur configuré.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
