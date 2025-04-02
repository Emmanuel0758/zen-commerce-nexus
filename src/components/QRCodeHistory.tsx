
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Eye } from "lucide-react";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type SavedQRCode = {
  id: string;
  value: string;
  name: string;
  color: string;
  bgColor: string;
  size: string;
  date?: Date;
};

export function QRCodeHistory() {
  const [savedQRCodes, setSavedQRCodes] = useState<SavedQRCode[]>([]);
  const [selectedQR, setSelectedQR] = useState<SavedQRCode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load saved QR codes from localStorage on component mount
  useEffect(() => {
    const savedCodes = localStorage.getItem('savedQRCodes');
    if (savedCodes) {
      try {
        setSavedQRCodes(JSON.parse(savedCodes));
      } catch (error) {
        console.error("Error parsing saved QR codes:", error);
      }
    }
  }, []);

  // Save QR codes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedQRCodes', JSON.stringify(savedQRCodes));
  }, [savedQRCodes]);

  // Mock data for demonstration
  useEffect(() => {
    if (savedQRCodes.length === 0) {
      setSavedQRCodes([
        {
          id: "qr-1",
          value: "https://zen-tissues.ci",
          name: "Site Web ZEN",
          color: "#000000",
          bgColor: "#FFFFFF",
          size: "200",
          date: new Date()
        },
        {
          id: "qr-2",
          value: "Mouchoirs ZEN - Douceur et confort au quotidien",
          name: "Mouchoirs ZEN",
          color: "#8B5CF6",
          bgColor: "#F5F3FF",
          size: "200",
          date: new Date(Date.now() - 86400000)
        }
      ]);
    }
  }, []);

  const handleViewQR = (qrCode: SavedQRCode) => {
    setSelectedQR(qrCode);
    setIsDialogOpen(true);
  };

  const handleDeleteQR = (id: string) => {
    setSavedQRCodes(prev => prev.filter(qr => qr.id !== id));
    toast({
      title: "QR code supprimé",
      description: "Le QR code a été supprimé avec succès."
    });
  };

  const handleDownloadQR = (qrCode: SavedQRCode) => {
    // Create a temporary SVG element
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-9999px';
    document.body.appendChild(tempContainer);
    
    // Render the QR code temporarily
    const tempQRCode = document.createElement('div');
    tempContainer.appendChild(tempQRCode);
    
    const qrInstance = <QRCode
      value={qrCode.value}
      size={parseInt(qrCode.size)}
      fgColor={qrCode.color}
      bgColor={qrCode.bgColor}
      level="H"
    />;
    
    // Use a canvas to create the download
    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(tempContainer.querySelector('svg') as SVGElement);
    const img = new Image();
    
    // Add padding
    const padding = 20;
    const svgSize = parseInt(qrCode.size);
    canvas.width = svgSize + (padding * 2);
    canvas.height = svgSize + (padding * 2);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      document.body.removeChild(tempContainer);
      return;
    }
    
    // Fill background
    ctx.fillStyle = qrCode.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    img.onload = () => {
      // Draw the QR code in the center of the canvas
      ctx.drawImage(img, padding, padding, svgSize, svgSize);
      
      // Create a link to download
      const link = document.createElement("a");
      link.download = `qr-code-${qrCode.name.replace(/\s/g, '-')}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      toast({
        title: "Téléchargement réussi",
        description: "Votre QR code a été téléchargé."
      });
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "Date inconnue";
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Historique des QR codes</CardTitle>
          <CardDescription>Liste de tous les QR codes générés</CardDescription>
        </CardHeader>
        <CardContent>
          {savedQRCodes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">Aucun historique disponible</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedQRCodes.map((qrCode) => (
                <Card key={qrCode.id} className="overflow-hidden">
                  <div 
                    className="p-4 flex justify-center items-center bg-white"
                    style={{ backgroundColor: qrCode.bgColor }}
                  >
                    <QRCode
                      value={qrCode.value}
                      size={150}
                      fgColor={qrCode.color}
                      bgColor={qrCode.bgColor}
                      level="H"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{qrCode.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(qrCode.date)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
                    <Button onClick={() => handleViewQR(qrCode)} variant="outline" size="sm">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Voir
                    </Button>
                    <Button onClick={() => handleDownloadQR(qrCode)} variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Télécharger
                    </Button>
                    <Button onClick={() => handleDeleteQR(qrCode.id)} variant="destructive" size="sm">
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Supprimer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* QR Code Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedQR?.name}</DialogTitle>
            <DialogDescription>
              {formatDate(selectedQR?.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            {selectedQR && (
              <>
                <div 
                  className="p-6 rounded-md mb-4"
                  style={{ backgroundColor: selectedQR.bgColor }}
                >
                  <QRCode
                    value={selectedQR.value}
                    size={200}
                    fgColor={selectedQR.color}
                    bgColor={selectedQR.bgColor}
                    level="H"
                  />
                </div>
                <p className="text-sm break-all max-h-24 overflow-auto">
                  {selectedQR.value}
                </p>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              onClick={() => selectedQR && handleDownloadQR(selectedQR)} 
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
