// The file contains JSX but uses the type "warning" which is not allowed
// Will update any occurrences of "warning" variant to "destructive" which is valid
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, QrCode, Mail, Phone, Wifi, Text, Download, Save, Settings } from "lucide-react";

interface QRCodeData {
  id: string;
  content: string;
  size: number;
  type: "url" | "text" | "email" | "wifi" | "phone";
  color?: string;
  label?: string;
  createdAt: Date;
  img?: string;
}

export const QRCodeGenerator = () => {
  const { toast } = useToast();
  const [qrValue, setQrValue] = useState("https://example.com");
  const [qrSize, setQrSize] = useState(200);
  const [qrType, setQrType] = useState<"url" | "text" | "email" | "wifi" | "phone">("url");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrLabel, setQrLabel] = useState("");
  const [history, setHistory] = useState<QRCodeData[]>(() => {
    const savedHistory = localStorage.getItem("qrcodeHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Fonction pour manipuler le contenu basé sur le type de QR
  const handleContentChange = (value: string) => {
    setQrValue(value);
  };

  // Fonction pour formatter le contenu basé sur le type
  const getFormattedContent = () => {
    switch (qrType) {
      case "url":
        // Assurez-vous que l'URL commence par http:// ou https://
        if (qrValue && !qrValue.startsWith('http://') && !qrValue.startsWith('https://')) {
          return `https://${qrValue}`;
        }
        return qrValue;
      case "email":
        return `mailto:${qrValue}`;
      case "phone":
        return `tel:${qrValue}`;
      case "wifi":
        // Format: WIFI:S:SSID;T:WPA;P:password;;
        try {
          const wifiData = JSON.parse(qrValue);
          return `WIFI:S:${wifiData.ssid};T:${wifiData.security || 'WPA'};P:${wifiData.password};;`;
        } catch (e) {
          // Si le format n'est pas JSON valide, utiliser comme texte brut
          toast({
            title: "Format WiFi non valide",
            description: "Utilisez le format JSON: {\"ssid\":\"nom_reseau\",\"password\":\"mot_de_passe\",\"security\":\"WPA\"}",
            variant: "destructive",
          });
          return qrValue;
        }
      default:
        return qrValue;
    }
  };

  // Fonction pour obtenir un placeholder approprié selon le type
  const getPlaceholder = () => {
    switch (qrType) {
      case "url":
        return "https://example.com";
      case "email":
        return "nom@example.com";
      case "phone":
        return "+33612345678";
      case "wifi":
        return "{\"ssid\":\"nom_reseau\",\"password\":\"mot_de_passe\",\"security\":\"WPA\"}";
      default:
        return "Texte à encoder";
    }
  };

  // Fonction pour obtenir un label approprié selon le type
  const getInputLabel = () => {
    switch (qrType) {
      case "url":
        return "URL";
      case "email":
        return "Adresse email";
      case "phone":
        return "Numéro de téléphone";
      case "wifi":
        return "Configuration WiFi (format JSON)";
      default:
        return "Texte";
    }
  };

  // Fonction pour générer le QR code
  const handleGenerateQR = () => {
    const formattedContent = getFormattedContent();
    if (!formattedContent) {
      toast({
        title: "Contenu manquant",
        description: "Veuillez entrer un contenu pour le QR code",
        variant: "destructive",
      });
      return;
    }

    // Capturer l'image du QR code
    const svg = document.querySelector("#qrcode svg");
    const svgData = svg ? new XMLSerializer().serializeToString(svg) : "";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0);
      const pngImage = canvas.toDataURL("image/png");
      
      // Créer un nouvel élément d'historique
      const newQRCode: QRCodeData = {
        id: `qr-${Date.now()}`,
        content: formattedContent,
        size: qrSize,
        type: qrType,
        color: qrColor,
        label: qrLabel || `QR Code ${history.length + 1}`,
        createdAt: new Date(),
        img: pngImage
      };
      
      // Mettre à jour l'historique
      const newHistory = [newQRCode, ...history];
      setHistory(newHistory);
      localStorage.setItem("qrcodeHistory", JSON.stringify(newHistory));
      
      toast({
        title: "QR Code généré",
        description: "Le QR code a été créé et ajouté à l'historique"
      });
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  // Fonction pour télécharger le QR code
  const handleDownloadQR = () => {
    const svg = document.querySelector("#qrcode svg");
    if (!svg) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le QR code pour le téléchargement",
        variant: "destructive",
      });
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0);
      const pngImage = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: "QR Code téléchargé",
        description: "Le QR code a été téléchargé avec succès"
      });
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  // Fonction pour obtenir l'icône appropriée selon le type
  const getTypeIcon = (type: "url" | "text" | "email" | "wifi" | "phone") => {
    switch (type) {
      case "url": return <Link className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "text": return <Text className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="url" value={qrType} onValueChange={(value) => setQrType(value as "url" | "text" | "email" | "wifi" | "phone")}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">URL</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Text className="h-4 w-4" />
            <span className="hidden sm:inline">Texte</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Téléphone</span>
          </TabsTrigger>
          <TabsTrigger value="wifi" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span className="hidden sm:inline">WiFi</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="qrContent" className="flex items-center gap-2">
                {getTypeIcon(qrType)} {getInputLabel()}
              </Label>
              <Input
                id="qrContent"
                value={qrValue}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={getPlaceholder()}
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="qrLabel" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" /> Étiquette (optionnelle)
              </Label>
              <Input
                id="qrLabel"
                value={qrLabel}
                onChange={(e) => setQrLabel(e.target.value)}
                placeholder="Description du QR code"
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="qrSize" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Taille (pixels)
              </Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="qrSize"
                  type="range"
                  min="100"
                  max="500"
                  value={qrSize}
                  onChange={(e) => setQrSize(parseInt(e.target.value, 10))}
                  className="flex-grow"
                />
                <span className="text-sm font-medium w-16 text-center">{qrSize}px</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="qrColor" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Couleur
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  id="qrColor"
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="h-10 w-12 p-0 border-0 rounded"
                />
                <Input 
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-grow bg-background/50"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div 
              id="qrcode" 
              className="p-4 bg-white rounded-lg shadow-md flex justify-center items-center"
              style={{ width: `${qrSize + 32}px`, height: `${qrSize + 32}px` }}
            >
              <QRCode 
                value={getFormattedContent() || " "}
                size={qrSize} 
                fgColor={qrColor}
                className="rounded"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {qrLabel || "QR Code"}
              </p>
              <p className="text-xs text-muted-foreground">
                {qrSize}x{qrSize} pixels
              </p>
            </div>

            <div className="flex gap-2 mt-4 w-full">
              <Button onClick={handleGenerateQR} className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder
              </Button>
              <Button onClick={handleDownloadQR} variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
