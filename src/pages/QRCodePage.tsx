
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeHistory } from "@/components/QRCodeHistory";

// Texte initial raccourci pour éviter l'erreur de débordement
const INITIAL_CONTENT = `🌿 ZEN – Mouchoirs Ultra-Doux 🌿
🔹 Le confort et la douceur au quotidien
Offrez-vous une sensation de bien-être incomparable avec les mouchoirs ZEN.

🛠️ Caractéristiques:
✅ Dimensions: 200 x 166 mm
✅ 3 plis pour absorption maximale
✅ 80 mouchoirs par boîte
✅ Ultra-doux et résistants
✅ Sans parfum

🌱 Pourquoi choisir ZEN?
🌱 Parfaits pour peaux sensibles
🛡️ Usage unique hygiénique
💚 Emballage écologique

🏢 DRINX Côte d'Ivoire
📞 07 97 29 XX 08
🌐 www.zen-tissues.ci`;

export default function QRCodePage() {
  const [savedQRCodes, setSavedQRCodes] = useState<Array<{
    id: string;
    value: string;
    name: string;
    color: string;
    bgColor: string;
    size: string;
    date: Date;
  }>>([]);

  // Charger les codes QR sauvegardés depuis localStorage
  useEffect(() => {
    const savedCodes = localStorage.getItem('savedQRCodes');
    if (savedCodes) {
      try {
        const parsedCodes = JSON.parse(savedCodes);
        // Ajouter la date si elle n'existe pas
        const codesWithDates = parsedCodes.map((code: any) => ({
          ...code,
          date: code.date ? new Date(code.date) : new Date()
        }));
        setSavedQRCodes(codesWithDates);
      } catch (error) {
        console.error("Erreur lors du chargement des codes QR:", error);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Générateur de QR Code</h1>
          <p className="text-muted-foreground">Créez et personnalisez des QR codes pour vos produits et documents</p>
        </div>
        
        <Tabs defaultValue="generator">
          <TabsList className="mb-4">
            <TabsTrigger value="generator">Générateur</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <div className="grid gap-6 md:grid-cols-2">
              <QRCodeGenerator defaultContent={INITIAL_CONTENT} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Créés récemment</CardTitle>
                  <CardDescription>Les QR codes que vous avez générés récemment</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedQRCodes.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {savedQRCodes.slice(0, 4).map((qrCode) => (
                        <div key={qrCode.id} className="border rounded-md p-4 flex flex-col items-center">
                          <div 
                            className="w-full aspect-square mb-2 flex items-center justify-center"
                            style={{ backgroundColor: qrCode.bgColor }}
                          >
                            {/* Mini preview */}
                            <svg 
                              viewBox="0 0 32 32" 
                              fill="none"
                              className="w-full h-full p-2" 
                              style={{ color: qrCode.color }}
                            >
                              <rect x="8" y="8" width="4" height="4" fill="currentColor" />
                              <rect x="12" y="8" width="4" height="4" fill="currentColor" />
                              <rect x="20" y="8" width="4" height="4" fill="currentColor" />
                              <rect x="8" y="12" width="4" height="4" fill="currentColor" />
                              <rect x="20" y="12" width="4" height="4" fill="currentColor" />
                              <rect x="8" y="20" width="4" height="4" fill="currentColor" />
                              <rect x="12" y="20" width="4" height="4" fill="currentColor" />
                              <rect x="20" y="20" width="4" height="4" fill="currentColor" />
                              <rect x="16" y="16" width="4" height="4" fill="currentColor" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium truncate w-full text-center">{qrCode.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aucun QR code sauvegardé</p>
                      <p className="text-sm">Générez et sauvegardez des QR codes pour les voir ici</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <QRCodeHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
