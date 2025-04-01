
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";

export default function ReportsPage() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Rapports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analysez vos performances et générez des rapports détaillés.
            </p>
            
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rapport des ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aucune donnée disponible pour l'instant.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendances clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Les données clients seront disponibles prochainement.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
