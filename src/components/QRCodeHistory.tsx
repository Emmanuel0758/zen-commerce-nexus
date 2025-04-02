
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash, Download, Eye, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import QRCode from "react-qr-code";

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

export const QRCodeHistory = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<QRCodeData[]>([]);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("qrcodeHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (e) {
        console.error("Erreur lors du chargement de l'historique", e);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'historique des QR codes",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Formatter la date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Supprimer un QR code de l'historique
  const handleDelete = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("qrcodeHistory", JSON.stringify(newHistory));
    toast({
      title: "QR code supprimé",
      description: "Le QR code a été supprimé de l'historique"
    });
  };

  // Télécharger un QR code
  const handleDownload = (qrCode: QRCodeData) => {
    if (qrCode.img) {
      const link = document.createElement('a');
      link.href = qrCode.img;
      link.download = `qr-${qrCode.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "QR code téléchargé",
        description: "Le QR code a été téléchargé avec succès"
      });
    } else {
      // Si l'image prérendue n'est pas disponible, générer à nouveau
      const qrElement = document.getElementById(`qr-display-${qrCode.id}`)?.querySelector('svg');
      if (!qrElement) {
        toast({
          title: "Erreur",
          description: "Impossible de télécharger le QR code",
          variant: "destructive",
        });
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(qrElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = qrCode.size;
        canvas.height = qrCode.size;
        ctx?.drawImage(img, 0, 0);
        const pngImage = canvas.toDataURL("image/png");
        
        const downloadLink = document.createElement("a");
        downloadLink.href = pngImage;
        downloadLink.download = `qr-${qrCode.id}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  // Voir les détails d'un QR code
  const handleView = (qrCode: QRCodeData) => {
    setSelectedQR(qrCode);
    setIsDialogOpen(true);
  };

  // Copier le contenu d'un QR code
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({
          title: "Contenu copié",
          description: "Le contenu du QR code a été copié dans le presse-papier"
        });
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Impossible de copier le contenu",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Historique des QR Codes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Aucun QR code généré pour l'instant
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((qrCode) => (
                <Card key={qrCode.id} className="overflow-hidden">
                  <div className="p-4 flex flex-col items-center">
                    <div 
                      id={`qr-display-${qrCode.id}`} 
                      className="mb-2 bg-white p-2 rounded-md"
                    >
                      {qrCode.img ? (
                        <img 
                          src={qrCode.img} 
                          alt={qrCode.label || "QR Code"} 
                          className="w-32 h-32 object-contain"
                        />
                      ) : (
                        <QRCode 
                          value={qrCode.content}
                          size={128}
                          fgColor={qrCode.color || "#000000"}
                        />
                      )}
                    </div>
                    <h3 className="font-medium text-center line-clamp-1">
                      {qrCode.label || "QR Code"}
                    </h3>
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      {formatDate(qrCode.createdAt)}
                    </p>
                    <div className="w-full border-t pt-2 flex justify-center gap-1">
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(qrCode)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(qrCode.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(qrCode)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(qrCode.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogue de détails */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedQR?.label || "Détails du QR Code"}</DialogTitle>
            <DialogDescription>
              Créé le {selectedQR ? formatDate(selectedQR.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center p-4 bg-white rounded-md">
            {selectedQR && (
              <div className="flex flex-col items-center">
                {selectedQR.img ? (
                  <img 
                    src={selectedQR.img} 
                    alt={selectedQR.label || "QR Code"} 
                    className="w-48 h-48 object-contain mb-4"
                  />
                ) : (
                  <QRCode 
                    value={selectedQR.content}
                    size={192}
                    fgColor={selectedQR.color || "#000000"}
                  />
                )}
              </div>
            )}
          </div>
          
          <div className="grid gap-2">
            <div>
              <p className="text-sm font-medium">Type:</p>
              <p className="text-sm">{selectedQR?.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Contenu:</p>
              <p className="text-sm break-all">{selectedQR?.content}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => handleCopy(selectedQR?.content || "")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copier
            </Button>
            <Button 
              onClick={() => selectedQR && handleDownload(selectedQR)}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
