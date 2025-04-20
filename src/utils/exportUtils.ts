
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

/**
 * Exports data in different formats
 * @param data The data to export
 * @param format The format to export (pdf, excel)
 * @param fileName The name of the file without extension
 * @param metadata Optional metadata about the export
 * @returns Promise resolving to true if export was successful
 */
export const exportData = async (
  data: any[],
  format: "pdf" | "excel",
  fileName: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  try {
    switch (format) {
      case "pdf":
        return exportPdf(fileName, data, metadata);
      case "excel":
        return exportExcel(fileName, data, metadata);
      default:
        console.error("Format d'export non supporté");
        return false;
    }
  } catch (error) {
    console.error("Erreur lors de l'exportation:", error);
    return false;
  }
};

/**
 * Wrapper function for exportData for simpler use
 */
export const handleExport = async (
  data: any[],
  format: "pdf" | "excel",
  fileName: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return await exportData(data, format, fileName, metadata);
};

/**
 * Exports data as PDF with improved company information and structure
 */
const exportPdf = (
  fileName: string,
  data: any[],
  metadata?: Record<string, any>
): boolean => {
  try {
    // Get app settings from localStorage to include company information
    const appSettingsStr = localStorage.getItem('appSettings');
    const appSettings = appSettingsStr ? JSON.parse(appSettingsStr) : {
      appName: 'Zen Commerce',
      logo: null,
      currency: 'CFA'
    };
    
    const doc = new jsPDF();
    
    // Header with company information
    if (appSettings.logo) {
      try {
        doc.addImage(appSettings.logo, 'JPEG', 15, 10, 30, 30);
      } catch (error) {
        console.error("Erreur lors du chargement du logo:", error);
        doc.setFontSize(22);
        doc.setTextColor(128, 0, 128);
        doc.text(appSettings.appName.substring(0, 1), 25, 25);
      }
    }
    
    // Company name and title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(appSettings.appName.toUpperCase(), appSettings.logo ? 50 : 15, 25);
    
    // Company contact info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Avenue du Commerce', appSettings.logo ? 50 : 15, 32);
    doc.text('Abidjan, Côte d\'Ivoire', appSettings.logo ? 50 : 15, 37);
    doc.text('contact@' + appSettings.appName.toLowerCase().replace(/\s/g, '') + '.com', appSettings.logo ? 50 : 15, 42);
    
    // Document title
    const title = metadata?.title || `Rapport ${fileName}`;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 105, 55, { align: 'center' });
    
    // Export date and contextual information
    doc.setFontSize(11);
    doc.text(`Date d'exportation: ${new Date().toLocaleDateString('fr-FR')}`, 105, 62, { align: 'center' });
    
    // Add metadata as contextual information
    if (metadata) {
      let yPosition = 70;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      
      // Filter out title which is already displayed
      const contextualInfo = Object.entries(metadata).filter(([key]) => key !== 'title');
      
      for (const [key, value] of contextualInfo) {
        if (typeof value !== 'object') {
          const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          doc.text(`${formattedKey}: ${value}`, 15, yPosition);
          yPosition += 6;
        }
      }
      
      yPosition += 5;
      
      // Table data
      if (data.length > 0) {
        const firstItem = data[0];
        const headers = Object.keys(firstItem);
        const rows = data.map(item => headers.map(header => item[header]));
        
        // Format headers for display
        const formattedHeaders = headers.map(header => 
          header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')
        );
        
        // @ts-ignore - jspdf-autotable functionality
        doc.autoTable({
          head: [formattedHeaders],
          body: rows,
          startY: yPosition,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [139, 92, 246] }, // Utilisation de la couleur Zen (violet)
          margin: { top: 10 }
        });
      } else {
        doc.text("Aucune donnée disponible", 15, yPosition);
      }
    } else {
      // Simple table for data without metadata
      if (data.length > 0) {
        const firstItem = data[0];
        const headers = Object.keys(firstItem);
        const rows = data.map(item => headers.map(header => item[header]));
        
        const formattedHeaders = headers.map(header => 
          header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')
        );
        
        // @ts-ignore - jspdf-autotable functionality
        doc.autoTable({
          head: [formattedHeaders],
          body: rows,
          startY: 70,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [139, 92, 246] } // Utilisation de la couleur Zen (violet)
        });
      } else {
        doc.text("Aucune donnée disponible", 15, 70);
      }
    }
    
    // Add summary information at the bottom if we have data
    if (data.length > 0) {
      const finalY = (doc as any).lastAutoTable.finalY || 70;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total éléments: ${data.length}`, 15, finalY + 15);
      
      // Add custom summary based on data type if needed
      if (metadata?.summary) {
        const summaryLines = typeof metadata.summary === 'string' 
          ? [metadata.summary] 
          : Object.entries(metadata.summary).map(([key, value]) => `${key}: ${value}`);
          
        let summaryY = finalY + 22;
        summaryLines.forEach(line => {
          doc.text(line, 15, summaryY);
          summaryY += 7;
        });
      }
    }
    
    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`${appSettings.appName} - Page ${i} sur ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    doc.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation PDF:", error);
    return false;
  }
};

/**
 * Exports data as Excel (CSV)
 */
const exportExcel = (
  fileName: string,
  data: any[],
  metadata?: Record<string, any>
): boolean => {
  try {
    if (data.length === 0) {
      console.warn("Aucune donnée à exporter");
      return false;
    }
    
    // Get app settings to include company info
    const appSettingsStr = localStorage.getItem('appSettings');
    const appSettings = appSettingsStr ? JSON.parse(appSettingsStr) : {
      appName: 'Zen Commerce'
    };
    
    // Get headers from the first data item
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    data.forEach(item => {
      const row = headers.map(header => {
        const value = item[header];
        // Handle CSV special characters and ensure proper quoting
        if (value === null || value === undefined) {
          return '""';
        }
        const stringValue = String(value).replace(/"/g, '""');
        return `"${stringValue}"`;
      });
      csvContent += row.join(",") + "\n";
    });
    
    // Add metadata and company info as commented header
    const metadataLines = [
      `# ${appSettings.appName}`,
      `# Date d'exportation: ${new Date().toLocaleDateString('fr-FR')}`,
      `# Fichier: ${fileName}`
    ];
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (typeof value !== 'object') {
          metadataLines.push(`# ${key}: ${value}`);
        }
      });
    }
    
    const metadataContent = metadataLines.join("\n");
    csvContent = metadataContent + "\n\n" + csvContent;
    
    // Create file download
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation Excel (CSV):", error);
    return false;
  }
};
