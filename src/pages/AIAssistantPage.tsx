
import { useState } from "react";
import Layout from "@/components/Layout";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Bot, MessageSquareText, QrCode } from "lucide-react";

export default function AIAssistantPage() {
  return (
    <Layout title="Assistant IA">
      <div className="p-6 space-y-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            Assistant IA
          </h1>
          <p className="text-muted-foreground">
            Utilisez notre IA pour obtenir des suggestions de QR Codes adaptés à vos besoins
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AIAssistant />
          </div>
          
          <div>
            <Card className="p-4 bg-muted/50">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <MessageSquareText className="h-5 w-5 text-primary" />
                Comment utiliser l'Assistant IA
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                  <span>Décrivez votre besoin dans la zone de texte</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                  <span>L'IA analysera votre demande et suggérera des types de QR codes adaptés</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                  <span>Cliquez sur une suggestion pour l'utiliser dans le générateur de QR code</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-primary" />
                  Exemples de requêtes
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  "Je veux créer un QR code pour le site web de mon restaurant"
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  "J'ai besoin d'un QR code avec mes coordonnées pour ma carte de visite"
                </p>
                <p className="text-xs text-muted-foreground">
                  "Je souhaite partager le WiFi de mon café avec mes clients"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
