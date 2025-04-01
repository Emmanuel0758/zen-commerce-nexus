
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="relative h-[400px] bg-muted/30 rounded-md overflow-hidden">
          {/* Placeholder for map - in a real app this would be a Map component */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground mb-2"
            >
              <path d="M17.5 3A3.5 3.5 0 0 1 21 6.5V18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h11.5z" />
              <path d="M3 9h3" />
              <path d="M3 12h3" />
              <path d="M3 15h3" />
              <path d="M3 18h3" />
              <path d="M13.3 13.9a1.9 1.9 0 0 1-2.3-2.8" />
              <path d="M13.8 10.3a3.5 3.5 0 0 0-4.4 5.8" />
              <path d="M14.6 8.5A5.5 5.5 0 0 0 5.5 15" />
            </svg>
            <p className="text-muted-foreground text-sm">
              Carte des livraisons en cours
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Dans une application réelle, cette section afficherait une carte interactive
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
