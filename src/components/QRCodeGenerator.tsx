
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Share2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

type QRCodeGeneratorProps = {
  defaultContent?: string;
};

export function QRCodeGenerator({ defaultContent = "" }: QRCodeGeneratorProps) {
  const [content, setContent] = useState(defaultContent);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState("200");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQrValue] = useState(defaultContent);
  const [hasGenerated, setHasGenerated] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!content.trim()) {
      toast({
        title: "Contenu requis",
        description: "Veuillez saisir du contenu pour votre QR code.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setQrValue(content);
      setHasGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "QR Code généré",
        description: "Votre QR code a été créé avec succès.",
      });
    }, 800);
  };

  const handleDownload = () => {
    // In a real app, this would generate an image download
    // For now we'll just show a toast message
    toast({
      title: "Téléchargement démarré",
      description: "Votre QR code va être téléchargé.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Partage",
      description: "Fonctionnalité de partage à venir.",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Générer un QR Code</CardTitle>
        <CardDescription>
          Personnalisez et créez votre QR code facilement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="qr-content">Contenu</Label>
          <Textarea
            id="qr-content"
            placeholder="Entrez le texte ou l'URL à encoder"
            className="resize-none min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label htmlFor="qr-color">Couleur</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="qr-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="qr-bg-color">Fond</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="qr-bg-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="qr-size">Taille</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger id="qr-size">
                <SelectValue placeholder="Choisir une taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 px</SelectItem>
                <SelectItem value="200">200 px</SelectItem>
                <SelectItem value="300">300 px</SelectItem>
                <SelectItem value="400">400 px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !content.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" />
                Générer le QR Code
              </>
            )}
          </Button>
        </div>

        {hasGenerated && (
          <div 
            ref={qrRef}
            className="flex flex-col items-center justify-center bg-white rounded-md p-8"
          >
            <QRCode
              value={qrValue}
              size={parseInt(size)}
              fgColor={color}
              bgColor={bgColor}
            />
          </div>
        )}
      </CardContent>
      {hasGenerated && (
        <CardFooter className="gap-2 justify-end">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
