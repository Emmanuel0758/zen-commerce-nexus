
import { useToast } from "@/hooks/use-toast";

type ExportFormat = "json" | "pdf" | "excel";

interface ExportableData {
  [key: string]: any;
}

/**
 * Utilitaire pour exporter des données dans différents formats de fichier
 */
export const exportData = async (data: ExportableData, format: ExportFormat, fileName: string): Promise<boolean> => {
  try {
    switch (format) {
      case "json":
        return exportJSON(data, fileName);
      case "excel":
        return exportExcel(data, fileName);
      case "pdf":
        return await exportPDF(data, fileName);
      default:
        console.error("Format d'exportation non pris en charge");
        return false;
    }
  } catch (error) {
    console.error("Erreur lors de l'exportation:", error);
    return false;
  }
};

/**
 * Export au format JSON
 */
const exportJSON = (data: ExportableData, fileName: string): boolean => {
  try {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${fileName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    return true;
  } catch (error) {
    console.error("Erreur d'exportation JSON:", error);
    return false;
  }
};

/**
 * Export au format Excel (CSV)
 */
const exportExcel = (data: ExportableData, fileName: string): boolean => {
  try {
    let csvContent = "";
    
    // Logique pour différents types de données
    if (Array.isArray(data)) {
      // Si c'est un tableau d'objets
      if (data.length > 0 && typeof data[0] === 'object') {
        // En-têtes (clés du premier objet)
        const headers = Object.keys(data[0]);
        csvContent += headers.join(',') + '\n';
        
        // Lignes de données
        data.forEach(item => {
          const row = headers.map(header => {
            let cell = item[header]?.toString() || '';
            // Échapper les virgules et les guillemets si nécessaire
            if (cell.includes(',') || cell.includes('"')) {
              cell = `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          });
          csvContent += row.join(',') + '\n';
        });
      }
    } else if (typeof data === 'object') {
      // Pour un objet avec des propriétés imbriquées
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          // Exportons ce tableau en tant que sous-section
          csvContent += `${key}\n`;
          
          if (value.length > 0 && typeof value[0] === 'object') {
            const headers = Object.keys(value[0]);
            csvContent += headers.join(',') + '\n';
            
            value.forEach(item => {
              const row = headers.map(header => {
                let cell = item[header]?.toString() || '';
                if (cell.includes(',') || cell.includes('"')) {
                  cell = `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
              });
              csvContent += row.join(',') + '\n';
            });
          }
          csvContent += '\n';
        }
      }
    }
    
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
  } catch (error) {
    console.error("Erreur d'exportation Excel:", error);
    return false;
  }
};

/**
 * Export au format PDF (simulation)
 * Note: Dans une application réelle, vous utiliseriez une bibliothèque comme jsPDF
 */
const exportPDF = async (data: ExportableData, fileName: string): Promise<boolean> => {
  try {
    // Simulation de la génération d'un PDF avec un délai
    return new Promise<boolean>((resolve) => {
      // Créer un élément HTML pour visualiser les données
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.innerHTML = `<h1>${fileName}</h1><pre>${JSON.stringify(data, null, 2)}</pre>`;
      
      document.body.appendChild(container);
      
      // Simuler un traitement
      setTimeout(() => {
        // En production, utilisez jsPDF ou une autre bibliothèque pour générer un vrai PDF
        const dataStr = "data:application/pdf;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute("href", dataStr);
        downloadLink.setAttribute("download", `${fileName}.pdf`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        container.remove();
        
        resolve(true);
      }, 1000);
    });
  } catch (error) {
    console.error("Erreur d'exportation PDF:", error);
    return false;
  }
};

/**
 * Hook personnalisé pour gérer les exportations avec notifications
 */
export const useDataExport = () => {
  const { toast } = useToast();
  
  const handleExport = async (data: ExportableData, format: ExportFormat, fileName: string) => {
    toast({
      title: `Exportation ${format.toUpperCase()} en cours`,
      description: "Préparation du fichier..."
    });
    
    const success = await exportData(data, format, fileName);
    
    if (success) {
      toast({
        title: "Exportation réussie",
        description: `Les données ont été exportées au format ${format.toUpperCase()}`,
      });
    } else {
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation",
        variant: "destructive"
      });
    }
    
    return success;
  };
  
  return { handleExport };
};
