
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { QRCodeHistory } from "@/components/QRCodeHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QRCodePage() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <Layout title="Générateur de QR Code">
      <div className="p-6 space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Générateur de QR Code</h1>
          <p className="text-muted-foreground">
            Créez et gérez des QR Codes pour vos produits et campagnes marketing
          </p>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <TabsList className="mb-0">
              <TabsTrigger value="generate">
                Créer un QR Code
              </TabsTrigger>
              <TabsTrigger value="history">
                Historique
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Créer un QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <QRCodeGenerator />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <QRCodeHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
