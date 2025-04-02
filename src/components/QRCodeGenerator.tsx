
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Share2, Loader2, Save, Link, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Maximum content length for QR code to prevent overflow error
const MAX_QR_CONTENT_LENGTH = 800;

type QRCodeGeneratorProps = {
  defaultContent?: string;
};

export function QRCodeGenerator({ defaultContent = "" }: QRCodeGeneratorProps) {
  // Trim default content if it's too long
  const trimmedDefaultContent = defaultContent.length > MAX_QR_CONTENT_LENGTH 
    ? defaultContent.substring(0, MAX_QR_CONTENT_LENGTH) 
    : defaultContent;
    
  // States for QR code content and styling
  const [content, setContent] = useState(trimmedDefaultContent);
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState("200");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [savedQRCodes, setSavedQRCodes] = useState<Array<{
    id: string;
    value: string;
    name: string;
    color: string;
    bgColor: string;
    size: string;
  }>>([]);
  const [contentWarning, setContentWarning] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const checkContentLength = (text: string) => {
    if (text.length > MAX_QR_CONTENT_LENGTH) {
      setContentWarning(`Le contenu dépasse la limite de ${MAX_QR_CONTENT_LENGTH} caractères. Il sera tronqué lors de la génération.`);
      return text.substring(0, MAX_QR_CONTENT_LENGTH);
    }
    setContentWarning(null);
    return text;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    checkContentLength(newContent);
  };

  const handleGenerate = () => {
    const contentToUse = activeTab === "text" ? content : url;
    
    if (!contentToUse.trim()) {
      toast({
        title: activeTab === "text" ? "Contenu requis" : "URL requise",
        description: activeTab === "text" 
          ? "Veuillez saisir du contenu pour votre QR code." 
          : "Veuillez saisir une URL pour votre QR code.",
        variant: "destructive",
      });
      return;
    }

    // For URLs, validate format
    let finalContent = contentToUse;
    if (activeTab === "url" && !url.startsWith("http")) {
      finalContent = `https://${url}`;
      setUrl(finalContent);
    }

    // Trim content if it's too long
    if (finalContent.length > MAX_QR_CONTENT_LENGTH) {
      finalContent = finalContent.substring(0, MAX_QR_CONTENT_LENGTH);
      toast({
        title: "Contenu tronqué",
        description: `Le contenu a été limité à ${MAX_QR_CONTENT_LENGTH} caractères pour permettre la génération du QR code.`,
        variant: "warning",
      });
    }

    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setQrValue(finalContent);
      setHasGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "QR Code généré",
        description: "Votre QR code a été créé avec succès.",
      });
    }, 800);
  };

  // Function to download QR code as PNG
  const handleDownload = () => {
    if (!qrRef.current) return;
    
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const svg = qrRef.current.querySelector("svg");
    
    if (!svg) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le QR code.",
        variant: "destructive",
      });
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    // Add padding around the QR code
    const padding = 20;
    const svgSize = parseInt(size);
    canvas.width = svgSize + (padding * 2);
    canvas.height = svgSize + (padding * 2);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    img.onload = () => {
      // Draw the QR code in the center of the canvas
      ctx.drawImage(img, padding, padding, svgSize, svgSize);
      
      // Create a link to download
      const link = document.createElement("a");
      link.download = `qr-code-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Téléchargement réussi",
        description: "Votre QR code a été téléchargé.",
      });
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "QR Code partagé",
        text: "Voici mon QR code généré avec Zen Commerce",
        url: window.location.href
      }).then(() => {
        toast({
          title: "Partagé avec succès",
          description: "Votre QR code a été partagé.",
        });
      }).catch(() => {
        toast({
          title: "Erreur de partage",
          description: "Une erreur est survenue lors du partage.",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Fonctionnalité indisponible",
        description: "Le partage n'est pas pris en charge par votre navigateur.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    if (!qrValue) return;
    
    const newQrCode = {
      id: `qr-${Date.now()}`,
      value: qrValue,
      name: activeTab === "text" ? 
        (qrValue.length > 15 ? `${qrValue.substring(0, 15)}...` : qrValue) : 
        (new URL(qrValue).hostname),
      color,
      bgColor,
      size,
    };
    
    // Save to localStorage
    const savedCodes = localStorage.getItem('savedQRCodes');
    let updatedCodes = [];
    
    if (savedCodes) {
      try {
        const parsedCodes = JSON.parse(savedCodes);
        updatedCodes = [newQrCode, ...parsedCodes];
      } catch (error) {
        updatedCodes = [newQrCode];
      }
    } else {
      updatedCodes = [newQrCode];
    }
    
    localStorage.setItem('savedQRCodes', JSON.stringify(updatedCodes));
    setSavedQRCodes(updatedCodes);
    
    toast({
      title: "QR Code sauvegardé",
      description: "Votre QR code a été sauvegardé avec succès.",
    });
  };

  const loadSavedQRCode = (savedQR: any) => {
    setQrValue(savedQR.value);
    setColor(savedQR.color);
    setBgColor(savedQR.bgColor);
    setSize(savedQR.size);
    setHasGenerated(true);
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="text">Texte</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="qr-content">Contenu</Label>
              <Textarea
                id="qr-content"
                placeholder="Entrez le texte à encoder (maximum 800 caractères)"
                className="resize-none min-h-[150px]"
                value={content}
                onChange={handleContentChange}
              />
              {contentWarning && (
                <Alert variant="warning" className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    {contentWarning}
                  </AlertDescription>
                </Alert>
              )}
              <div className="text-xs text-muted-foreground text-right mt-1">
                {content.length} / {MAX_QR_CONTENT_LENGTH} caractères
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="qr-url">URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="qr-url"
                    placeholder="https://example.com"
                    className="pl-9"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
            disabled={isGenerating || (activeTab === "text" ? !content.trim() : !url.trim())}
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

        {hasGenerated && qrValue && (
          <div 
            ref={qrRef}
            className="flex flex-col items-center justify-center bg-white rounded-md p-8 border shadow-sm"
          >
            <QRCode
              value={qrValue}
              size={parseInt(size)}
              fgColor={color}
              bgColor={bgColor}
              level="H"
            />
            <p className="text-sm text-muted-foreground mt-4 text-center max-w-sm break-words">
              {activeTab === "url" ? (
                <a href={qrValue} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {qrValue}
                </a>
              ) : (
                qrValue.length > 50 ? `${qrValue.substring(0, 50)}...` : qrValue
              )}
            </p>
          </div>
        )}
      </CardContent>
      {hasGenerated && qrValue && (
        <CardFooter className="flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
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
