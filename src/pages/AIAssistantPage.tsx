
import { useState } from "react";
import Layout from "@/components/Layout";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Bot, MessageSquareText, QrCode, FileText, Palette, ImageIcon, Lightbulb } from "lucide-react";

export default function AIAssistantPage() {
  return (
    <Layout title="Assistant IA">
      <div className="p-6 space-y-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            Assistant IA Multifonction
          </h1>
          <p className="text-muted-foreground">
            Exploitez la puissance de l'IA pour générer des QR codes, des textes, des palettes de couleurs et des images
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AIAssistant />
          </div>
          
          <div className="space-y-6">
            <Card className="p-4 bg-muted/50">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <MessageSquareText className="h-5 w-5 text-primary" />
                Comment utiliser l'Assistant IA
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                  <span>Sélectionnez le type de contenu à générer dans les onglets</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                  <span>Décrivez votre besoin dans la zone de texte</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                  <span>L'IA analysera votre demande et générera des suggestions adaptées</span>
                </li>
              </ul>
            </Card>
              
            <Card className="p-4 bg-muted/50">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-primary" />
                Fonctionnalités disponibles
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <QrCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">QR Codes</p>
                    <p className="text-xs text-muted-foreground">Générez des QR codes pour sites web, emails, téléphones, WiFi</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Textes</p>
                    <p className="text-xs text-muted-foreground">Créez des textes marketing, descriptions, posts sociaux</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Palette className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Palettes de couleurs</p>
                    <p className="text-xs text-muted-foreground">Obtenez des combinaisons de couleurs harmonieuses</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <ImageIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Images</p>
                    <p className="text-xs text-muted-foreground">Générez des images basées sur vos descriptions</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
