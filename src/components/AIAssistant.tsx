
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Bot, Send, Loader2, QrCode, Copy, Mail, Phone, Wifi, Text, FileText, BarChart, ImageIcon, MessageSquareText, Palette, Code, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface SuggestionType {
  type: "url" | "text" | "email" | "phone" | "wifi";
  content: string;
  label: string;
}

interface ImageGenerationType {
  prompt: string;
  imageUrl: string;
}

interface TextSuggestionType {
  prompt: string;
  content: string;
  type: "marketing" | "description" | "social" | "email" | "custom";
}

export const AIAssistant = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("qrcode");
  const [isLoading, setIsLoading] = useState(false);
  const [qrSuggestions, setQrSuggestions] = useState<SuggestionType[]>([]);
  const [textSuggestions, setTextSuggestions] = useState<TextSuggestionType[]>([]);
  const [colorPalettes, setColorPalettes] = useState<{name: string, colors: string[]}[]>([]);
  const [generatedImages, setGeneratedImages] = useState<ImageGenerationType[]>([]);
  const [textType, setTextType] = useState<string>("marketing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fonction simulant une réponse d'IA pour QR Codes
  const generateQRSuggestions = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour obtenir des suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQrSuggestions([]);

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

    setQrSuggestions(newSuggestions);
    setIsLoading(false);
    
    toast({
      title: "Suggestions générées",
      description: `${newSuggestions.length} suggestions disponibles`,
    });
  };

  // Fonction pour générer du texte
  const generateTextContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer du texte",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTextSuggestions([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockTexts: Record<string, string[]> = {
      marketing: [
        "Découvrez notre gamme exclusive de produits. Profitez de 20% de réduction pour votre première commande.",
        "Ne manquez pas notre offre exceptionnelle! Des remises incroyables vous attendent sur notre site."
      ],
      description: [
        "Ce produit de haute qualité est fabriqué avec des matériaux durables et respectueux de l'environnement. Sa conception élégante s'adapte parfaitement à tous les styles.",
        "Conçu pour répondre aux besoins des professionnels exigeants, notre solution innovante combine performance et facilité d'utilisation."
      ],
      social: [
        "🚀 Nous sommes ravis de vous présenter notre nouvelle collection! #innovation #qualité #design",
        "✨ Nouveauté en magasin! Venez découvrir nos créations uniques et faites-nous part de vos impressions. 📱"
      ],
      email: [
        "Cher client,\n\nNous sommes heureux de vous informer de nos dernières nouveautés. Visitez notre site pour découvrir toutes nos offres.\n\nCordialement,\nL'équipe commerciale",
        "Bonjour,\n\nMerci pour votre fidélité! Nous avons le plaisir de vous offrir un code promo exclusif: MERCI10.\n\nÀ bientôt,\nLe service client"
      ],
      custom: [
        `En réponse à "${prompt}", voici une suggestion personnalisée: Explorez nos solutions adaptées spécifiquement à vos besoins.`,
        `Basé sur votre requête "${prompt}", nous proposons: Une approche innovante qui répond exactement à vos attentes.`
      ]
    };

    // Générer quelques textes basés sur le type sélectionné
    const texts = mockTexts[textType as keyof typeof mockTexts] || mockTexts.custom;
    const generatedTexts = texts.map(content => ({
      prompt,
      content,
      type: textType as any
    }));

    setTextSuggestions(generatedTexts);
    setIsLoading(false);
    
    toast({
      title: "Textes générés",
      description: `${generatedTexts.length} suggestions de texte disponibles`,
    });
  };

  // Fonction pour générer des palettes de couleurs
  const generateColorPalettes = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer des palettes",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setColorPalettes([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Palettes prédéfinies selon des thèmes communs
    const mockPalettes = [
      {
        name: "Moderne & Minimaliste",
        colors: ["#2D3047", "#419D78", "#E0A458", "#F4E9CD", "#FFFFFF"]
      },
      {
        name: "Vibrant & Dynamique",
        colors: ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"]
      },
      {
        name: "Élégant & Professionnel",
        colors: ["#1B1B25", "#565676", "#A9A9CA", "#D5D5E8", "#FFFFFF"]
      }
    ];

    setColorPalettes(mockPalettes);
    setIsLoading(false);
    
    toast({
      title: "Palettes générées",
      description: `${mockPalettes.length} palettes de couleurs disponibles`,
    });
  };

  // Fonction pour générer des images
  const generateImages = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Demande vide",
        description: "Veuillez entrer une description pour générer des images",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImages([]);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Images fictives (dans une vraie implémentation, on appellerait une API comme DALL-E ou Midjourney)
    const mockImages = [
      {
        prompt: prompt,
        imageUrl: "https://placehold.co/600x400/eee/31343C?text=Image+Générée+1"
      },
      {
        prompt: prompt,
        imageUrl: "https://placehold.co/600x400/eee/31343C?text=Image+Générée+2"
      }
    ];

    setGeneratedImages(mockImages);
    setIsLoading(false);
    
    toast({
      title: "Images générées",
      description: `${mockImages.length} images disponibles`,
    });
  };

  const handleGenerate = () => {
    switch(activeTab) {
      case "qrcode":
        generateQRSuggestions();
        break;
      case "text":
        generateTextContent();
        break;
      case "color":
        generateColorPalettes();
        break;
      case "image":
        generateImages();
        break;
      default:
        generateQRSuggestions();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    localStorage.setItem("qrSuggestion", JSON.stringify(suggestion));
    toast({
      title: "Suggestion copiée",
      description: "Accédez à l'onglet \"Générer QR Code\" pour l'utiliser",
    });
  };

  const handleTextCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Texte copié",
      description: "Le texte a été copié dans le presse-papiers",
    });
  };

  const handleColorCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Couleur copiée",
      description: `La couleur ${color} a été copiée dans le presse-papiers`,
    });
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
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

  const getIconForTextType = (type: string) => {
    switch (type) {
      case "marketing": return <BarChart className="h-5 w-5" />;
      case "description": return <FileText className="h-5 w-5" />;
      case "social": return <MessageSquareText className="h-5 w-5" />;
      case "email": return <Mail className="h-5 w-5" />;
      default: return <Text className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant IA Multifonction
          </CardTitle>
          <CardDescription>
            Un assistant intelligent pour générer QR codes, textes, palettes de couleurs et images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full">
              <TabsTrigger value="qrcode" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Textes
              </TabsTrigger>
              <TabsTrigger value="color" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Couleurs
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qrcode" className="space-y-4">
              <Textarea
                placeholder="Exemple: Je veux créer un QR code pour le site web de mon restaurant"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-type" className="text-sm font-medium">Type de texte</label>
                  <Select value={textType} onValueChange={setTextType}>
                    <SelectTrigger id="text-type">
                      <SelectValue placeholder="Sélectionnez un type de texte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing & Promotions</SelectItem>
                      <SelectItem value="description">Description de produit</SelectItem>
                      <SelectItem value="social">Réseaux sociaux</SelectItem>
                      <SelectItem value="email">Emails</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Décrivez ce que vous souhaitez générer comme texte..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50"
                />
              </div>
            </TabsContent>

            <TabsContent value="color" className="space-y-4">
              <Textarea
                placeholder="Décrivez l'ambiance ou le style de palette que vous souhaitez générer..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <Textarea
                placeholder="Décrivez l'image que vous souhaitez générer..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleGenerate} 
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
                <Lightbulb className="h-4 w-4" />
                Générer
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* QR Code Suggestions */}
      {activeTab === "qrcode" && qrSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestions de QR Code</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {qrSuggestions.map((suggestion, index) => (
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

      {/* Text Suggestions */}
      {activeTab === "text" && textSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestions de texte</h3>
          <div className="grid gap-4">
            {textSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getIconForTextType(suggestion.type)}
                    {suggestion.type === "marketing" ? "Texte marketing" : 
                     suggestion.type === "description" ? "Description de produit" :
                     suggestion.type === "social" ? "Post pour réseaux sociaux" :
                     suggestion.type === "email" ? "Email" : "Texte personnalisé"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line">
                    {suggestion.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleTextCopy(suggestion.content)}
                  >
                    <Copy className="h-4 w-4" />
                    Copier le texte
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Color Palettes */}
      {activeTab === "color" && colorPalettes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Palettes de couleurs</h3>
          <div className="grid gap-6">
            {colorPalettes.map((palette, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{palette.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex flex-col items-center"
                        onClick={() => handleColorCopy(color)}
                      >
                        <div 
                          className="w-12 h-12 rounded-md cursor-pointer hover:ring-2 ring-offset-2 ring-offset-background transition-all" 
                          style={{ backgroundColor: color }}
                          title={`Cliquez pour copier: ${color}`}
                        />
                        <span className="text-xs mt-1">{color}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Generated Images */}
      {activeTab === "image" && generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Images générées</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {generatedImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={image.imageUrl} 
                  alt={`Image générée basée sur: ${image.prompt}`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleImageClick(image.imageUrl)}
                />
                <CardFooter className="p-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => handleImageClick(image.imageUrl)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Voir en taille réelle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Image modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image générée</DialogTitle>
            <DialogDescription>
              Basée sur votre demande: {prompt}
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center my-4">
              <img 
                src={selectedImage} 
                alt="Image générée en taille réelle" 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedImage(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
