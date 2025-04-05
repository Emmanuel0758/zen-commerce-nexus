
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import "@/types/jspdf-extensions";

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
        return exportPDF(data, fileName);
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
    
    if (Array.isArray(data)) {
      if (data.length > 0 && typeof data[0] === 'object') {
        const headers = Object.keys(data[0]);
        csvContent += headers.join(',') + '\n';
        
        data.forEach(item => {
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
    } else if (typeof data === 'object') {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            const headers = Object.keys(value[0]);
            const rows = value.map(item => headers.map(k => item[k]?.toString() || ''));
            
            csvContent += headers.join(',') + '\n';
            
            rows.forEach(row => {
              csvContent += row.join(',') + '\n';
            });
          }
        }
      }
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Erreur d'exportation Excel:", error);
    return false;
  }
};

/**
 * Export au format PDF
 */
const exportPDF = (data: ExportableData, fileName: string): boolean => {
  try {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(fileName, 14, 22);
    doc.setFontSize(12);
    doc.text(`Exporté le ${new Date().toLocaleDateString()}`, 14, 30);
    
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const headers = Object.keys(data[0]);
      const rows = data.map(item => headers.map(key => item[key]?.toString() || ''));
      
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 }
      });
    } else if (typeof data === 'object') {
      let yPos = 40;
      
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          doc.setFontSize(12);
          doc.text(key, 14, yPos);
          yPos += 8;
          
          const headers = Object.keys(value[0]);
          const rows = value.map(item => headers.map(k => item[k]?.toString() || ''));
          
          doc.autoTable({
            head: [headers],
            body: rows,
            startY: yPos,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 }
          });
          
          yPos = doc.lastAutoTable.finalY + 15;
        }
      }
    }
    
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    doc.save(`${fileName}.pdf`);
    return true;
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
