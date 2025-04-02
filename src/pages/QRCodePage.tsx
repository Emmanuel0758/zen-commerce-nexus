
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { QRCodeHistory } from "@/components/QRCodeHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, History, Settings } from "lucide-react";

export default function QRCodePage() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <Layout title="Générateur de QR Code">
      <div className="p-6 space-y-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <QrCode className="h-8 w-8 text-primary" />
            Générateur de QR Code
          </h1>
          <p className="text-muted-foreground">
            Créez et gérez des QR Codes pour vos produits et campagnes marketing
          </p>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <TabsList className="mb-0 p-1">
              <TabsTrigger value="generate" className="flex items-center gap-2 px-4 py-2">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Créer un QR Code</span>
                <span className="inline sm:hidden">Créer</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2 px-4 py-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Historique</span>
                <span className="inline sm:hidden">Historique</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generate" className="mt-0">
            <Card className="bg-card/50 backdrop-blur-sm border-2">
              <CardContent className="pt-6">
                <QRCodeGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card className="bg-card/50 backdrop-blur-sm border-2">
              <CardContent className="pt-6">
                <QRCodeHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
