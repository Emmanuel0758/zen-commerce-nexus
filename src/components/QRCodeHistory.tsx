import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import QRCode from "react-qr-code";
import { Trash, Download, Eye, Copy, Search, Filter, QrCode, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "url" | "text" | "email" | "wifi" | "phone">("all");

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

  // Filtrer l'historique
  const filteredHistory = history.filter(qrCode => {
    const matchesSearch = qrCode.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (qrCode.label && qrCode.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || qrCode.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Obtenir l'icône pour le type de QR code
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "url": return <QrCode className="h-4 w-4" />;
      case "email": return <QrCode className="h-4 w-4" />;
      case "phone": return <QrCode className="h-4 w-4" />;
      case "wifi": return <QrCode className="h-4 w-4" />;
      default: return <QrCode className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un QR code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as "all" | "url" | "text" | "email" | "wifi" | "phone")}>
            <SelectTrigger className="w-[180px] bg-background/50">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filtrer par type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="text">Texte</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Téléphone</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <QrCode className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="mt-4 text-muted-foreground">
              {searchTerm || typeFilter !== "all" 
                ? "Aucun QR code trouvé correspondant à votre recherche"
                : "Aucun QR code généré pour l'instant"}
            </p>
            {(searchTerm || typeFilter !== "all") && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                }}
              >
                Effacer les filtres
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredHistory.map((qrCode) => (
              <div key={qrCode.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
                <div className="p-4 flex flex-col items-center">
                  <div 
                    id={`qr-display-${qrCode.id}`} 
                    className="mb-3 bg-white p-2 rounded-md shadow-sm"
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
                  
                  <div className="w-full text-center">
                    <h3 className="font-medium text-center line-clamp-1 mb-1">
                      {qrCode.label || "QR Code"}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(qrCode.createdAt)}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs mb-3">
                      {getTypeIcon(qrCode.type)}
                      <span>
                        {qrCode.type === "url" ? "Lien URL" : 
                         qrCode.type === "email" ? "Adresse email" : 
                         qrCode.type === "phone" ? "Numéro de téléphone" : 
                         qrCode.type === "wifi" ? "Configuration WiFi" : "Texte"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full border-t pt-3 flex justify-center gap-1">
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => handleView(qrCode)}
                      className="rounded-full"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(qrCode.content)}
                      className="rounded-full"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(qrCode)}
                      className="rounded-full"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(qrCode.id)}
                      className="rounded-full text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialogue de détails */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedQR?.label || "Détails du QR Code"}</DialogTitle>
            <DialogDescription>
              Créé le {selectedQR ? formatDate(selectedQR.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-4 bg-white rounded-lg shadow-inner mx-auto max-w-xs">
            {selectedQR && (
              <div className="flex flex-col items-center">
                {selectedQR.img ? (
                  <img 
                    src={selectedQR.img} 
                    alt={selectedQR.label || "QR Code"} 
                    className="w-48 h-48 object-contain"
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
          
          <div className="grid gap-3 my-2">
            <div className="bg-muted/50 p-2 rounded">
              <Label className="text-xs text-muted-foreground">Type</Label>
              <p className="font-medium">
                {selectedQR?.type === "url" ? "Lien URL" : 
                 selectedQR?.type === "email" ? "Adresse email" : 
                 selectedQR?.type === "phone" ? "Numéro de téléphone" : 
                 selectedQR?.type === "wifi" ? "Configuration WiFi" : "Texte"}
              </p>
            </div>
            <div className="bg-muted/50 p-2 rounded">
              <Label className="text-xs text-muted-foreground">Contenu</Label>
              <p className="font-medium break-all">{selectedQR?.content}</p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => handleCopy(selectedQR?.content || "")}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copier
            </Button>
            <Button 
              onClick={() => selectedQR && handleDownload(selectedQR)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
