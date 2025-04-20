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
    
    // Check if this is an invoice export
    const isInvoice = fileName.startsWith('facture-') || (metadata && metadata.invoiceType);
    
    // Header with company information
    if (appSettings.logo) {
      try {
        doc.addImage(appSettings.logo, 'JPEG', 15, 10, 30, 30);
      } catch (error) {
        console.error("Erreur lors du chargement du logo:", error);
        doc.setFontSize(22);
        doc.setTextColor(139, 92, 246);
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
    
    // Export date
    doc.setFontSize(11);
    doc.text(`Date: ${metadata?.invoiceDate || new Date().toLocaleDateString('fr-FR')}`, 105, 62, { align: 'center' });
    
    if (isInvoice) {
      // Invoice specific layout
      const order = data[0];
      
      // Customer information
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Facturé à:', 15, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(metadata?.customer || order.customer, 15, 87);
      doc.text(metadata?.customerEmail || 'client@example.com', 15, 93);
      
      // Items table for invoice
      const items = order.items || [];
      const tableBody = items.map((item: any) => [
        item.description,
        item.quantity.toString(),
        item.unitPrice,
        item.total
      ]);
      
      // @ts-ignore - jspdf-autotable functionality
      doc.autoTable({
        startY: 105,
        head: [['Description', 'Qté', 'Prix unitaire', 'Total']],
        body: tableBody,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 4 },
        headStyles: { fillColor: [139, 92, 246], textColor: 255 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 40, halign: 'right' },
          3: { cellWidth: 40, halign: 'right' }
        }
      });
      
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      
      // Total
      doc.setFont('helvetica', 'bold');
      doc.text('Total', 150, finalY);
      doc.text(order.total, 180, finalY, { align: 'right' });
      
      // Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Merci pour votre commande!', 105, finalY + 20, { align: 'center' });
      doc.text(`${appSettings.appName} - SIRET: 12345678900000`, 105, finalY + 25, { align: 'center' });
    } else {
      // Standard export for lists
      if (data.length > 0) {
        // Add metadata as contextual information
        if (metadata) {
          let yPosition = 70;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          
          // Filter out title which is already displayed
          const contextualInfo = Object.entries(metadata).filter(([key]) => 
            key !== 'title' && key !== 'invoiceType' && 
            key !== 'customer' && key !== 'customerEmail' &&
            key !== 'invoiceDate' && key !== 'dueDate'
          );
          
          for (const [key, value] of contextualInfo) {
            if (typeof value !== 'object') {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
              doc.text(`${formattedKey}: ${value}`, 15, yPosition);
              yPosition += 6;
            }
          }
          
          yPosition += 5;
          
          // Generate table based on data structure
          const firstItem = data[0];
          const headers = Object.keys(firstItem).filter(key => key !== 'items'); // Exclude items array for list exports
          const rows = data.map(item => headers.map(header => {
            if (header === 'status') {
              return item[header] === "completed" ? "Terminée" : 
                    item[header] === "processing" ? "En traitement" : 
                    item[header] === "pending" ? "En attente" : 
                    item[header] === "cancelled" ? "Annulée" : "En attente de validation";
            }
            return item[header];
          }));
          
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
            headStyles: { fillColor: [139, 92, 246] },
            margin: { top: 10 }
          });
        }
      } else {
        doc.text("Aucune donnée disponible", 15, 70);
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

// Add a default export for SettingsPage
export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Configurez votre application Zen Commerce
          </p>
        </header>
        <div className="grid gap-6">
          <p>Page de paramètres en cours de développement.</p>
        </div>
      </div>
    </div>
  );
}
