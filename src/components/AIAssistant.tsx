
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Robot, Send, Loader2, QrCode, Copy, Mail, Phone, Wifi, Text } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuggestionType {
  type: "url" | "text" | "email" | "phone" | "wifi";
  content: string;
  label: string;
}

export const AIAssistant = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  // Fonction simulant une réponse d'IA
  const generateSuggestions = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour obtenir des suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSuggestions([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Logique de génération de suggestions basée sur des mots clés simples
    // Dans une implémentation réelle, cela serait remplacé par un appel à une API d'IA
    const lowercasePrompt = prompt.toLowerCase();
    const newSuggestions: SuggestionType[] = [];

    if (lowercasePrompt.includes("site") || lowercasePrompt.includes("web") || lowercasePrompt.includes("lien")) {
      newSuggestions.push({
        type: "url",
        content: "https://example.com/promo",
        label: "Site web promotionnel"
      });
    }

    if (lowercasePrompt.includes("contact") || lowercasePrompt.includes("email") || lowercasePrompt.includes("courriel")) {
      newSuggestions.push({
        type: "email",
        content: "contact@example.com",
        label: "Email de contact"
      });
    }

    if (lowercasePrompt.includes("appel") || lowercasePrompt.includes("téléphone") || lowercasePrompt.includes("numéro")) {
      newSuggestions.push({
        type: "phone",
        content: "+33612345678",
        label: "Numéro de téléphone"
      });
    }

    if (lowercasePrompt.includes("wifi") || lowercasePrompt.includes("réseau") || lowercasePrompt.includes("internet")) {
      newSuggestions.push({
        type: "wifi",
        content: JSON.stringify({
          ssid: "MonReseauWiFi",
          password: "MotDePasse123",
          security: "WPA"
        }),
        label: "Configuration WiFi"
      });
    }

    // Si aucune suggestion spécifique n'a été générée, fournir une suggestion de texte générique
    if (newSuggestions.length === 0) {
      newSuggestions.push({
        type: "text",
        content: `Information: ${prompt}`,
        label: "Texte informatif"
      });
    }

    setSuggestions(newSuggestions);
    setIsLoading(false);
    
    toast({
      title: "Suggestions générées",
      description: `${newSuggestions.length} suggestions disponibles`,
    });
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    // Dans une implémentation complète, cela enverrait à la page de génération de QR code
    // avec les valeurs pré-remplies
    localStorage.setItem("qrSuggestion", JSON.stringify(suggestion));
    toast({
      title: "Suggestion copiée",
      description: "Accédez à l'onglet \"Générer QR Code\" pour l'utiliser",
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "url": return <QrCode className="h-5 w-5" />;
      case "email": return <Mail className="h-5 w-5" />;
      case "phone": return <Phone className="h-5 w-5" />;
      case "wifi": return <Wifi className="h-5 w-5" />;
      default: return <Text className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Robot className="h-5 w-5 text-primary" />
            Assistant IA
          </CardTitle>
          <CardDescription>
            Décrivez ce que vous souhaitez et je vous suggérerai des QR Codes appropriés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Exemple: Je veux créer un QR code pour le site web de mon restaurant"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-background/50"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={generateSuggestions} 
            disabled={isLoading || !prompt.trim()}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Générer des suggestions
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {suggestions.map((suggestion, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getIconForType(suggestion.type)}
                    {suggestion.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {suggestion.type === 'wifi' 
                      ? 'Configuration WiFi (SSID, mot de passe)'
                      : suggestion.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Utiliser cette suggestion
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
