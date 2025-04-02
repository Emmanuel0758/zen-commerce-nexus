
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IvoryCoastMap from "./IvoryCoastMap";

export function DeliveryMapCard() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Livraisons en cours</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs">En cours (5)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs">Retardé (2)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] overflow-hidden rounded-md">
          <IvoryCoastMap height="400px" />
        </div>
      </CardContent>
    </Card>
  );
}
