
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeHistory } from "@/components/QRCodeHistory";

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

  const handleSaveQRCode = (qrCode: any) => {
    setSavedQRCodes(prev => [
      {
        ...qrCode,
        date: new Date()
      },
      ...prev
    ]);
  };

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
              <QRCodeGenerator 
                defaultContent={`🌿 ZEN – Mouchoirs Ultra-Doux 🌿
🔹 Le confort et la douceur au quotidien
Offrez-vous une sensation de bien-être incomparable avec les mouchoirs ZEN. Conçus pour apporter une douceur ultime et une absorption optimale, ils sont idéaux pour tous les usages quotidiens.


🛠️ Caractéristiques du produit
✅ Dimensions du mouchoir : 200 x 166 mm
✅ Nombre de plis : 3 plis pour une absorption maximale
✅ Nombre de mouchoirs par boîte : 80 (soit 240 feuilles)
✅ Texture : Ultra-douce et résistante, idéale pour les peaux sensibles
✅ Sans parfum et sans additifs agressifs
✅ Emballage écologique : Conçu avec des matériaux recyclables

🌱 Pourquoi choisir les mouchoirs ZEN ?
🌱 Douceur et confort : Parfaits pour les peaux sensibles, nos mouchoirs offrent une caresse soyeuse
🌬️ Ultra-absorbant : La technologie 3 plis garantit une excellente absorption sans se déchirer
🛡️ Hygiène assurée : Chaque mouchoir est à usage unique pour limiter la propagation des germes
💚 Engagement éco-responsable : Nous utilisons des fibres certifiées et un emballage recyclable pour réduire l'empreinte environnementale


🛍️ Utilisations recommandées
🎬 Soin du visage : Idéal pour se moucher, se démaquiller, ou absorber l'excès de sébum
💻 Au bureau : Essuyez rapidement de petits accidents (renversement de café, nettoyage d'écran)
🛋️ En voyage : Format compact et pratique à glisser dans un sac ou une boîte à gants
🌟 En famille : Convient aux adultes comme aux enfants, grâce à sa douceur exceptionnelle

🌍 Contact & Informations
🏢 Produit par : DRINX Côte d'Ivoire
📞 Contact : 07 97 29 XX 08
🌐 Site Web : www.zen-tissues.ci (exemple)
🎨 Réseaux Sociaux : Retrouvez-nous sur Facebook, Instagram et Twitter pour plus d'actualités et de promotions.

Commander Maintenant`}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Créés récemment</CardTitle>
                  <CardDescription>Les QR codes que vous avez générés récemment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center">
                      <div className="w-full aspect-square bg-gray-100 mb-2 flex items-center justify-center text-xs text-gray-400">QR #1</div>
                      <span className="text-sm font-medium truncate w-full text-center">Mouchoirs ZEN</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center">
                      <div className="w-full aspect-square bg-gray-100 mb-2 flex items-center justify-center text-xs text-gray-400">Nouveau</div>
                      <span className="text-sm font-medium truncate w-full text-center">Ajouter un QR</span>
                    </div>
                  </div>
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
