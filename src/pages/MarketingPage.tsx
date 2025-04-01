
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "@/components/SidebarNav";

export default function MarketingPage() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-8">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Créez et gérez vos campagnes marketing et programmes de fidélité.
            </p>
            
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campagnes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aucune campagne en cours.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Programme de fidélité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Le programme de fidélité n'est pas encore configuré.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
