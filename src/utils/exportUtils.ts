
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

/**
 * Exports data in different formats
 * @param format The format to export (json, pdf, excel)
 * @param fileName The name of the file without extension
 * @param data The data to export
 * @param metadata Optional metadata about the export
 * @returns Promise resolving to true if export was successful
 */
export const exportData = async (
  format: "json" | "pdf" | "excel",
  fileName: string,
  data: any[],
  metadata?: Record<string, any>
): Promise<boolean> => {
  try {
    switch (format) {
      case "json":
        return exportJson(fileName, data, metadata);
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
  format: "json" | "pdf" | "excel",
  fileName: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return await exportData(format, fileName, data, metadata);
};

/**
 * Exports data as JSON
 */
const exportJson = (
  fileName: string,
  data: any[],
  metadata?: Record<string, any>
): boolean => {
  try {
    const exportObj = metadata ? { metadata, data } : data;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${fileName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation JSON:", error);
    return false;
  }
};

/**
 * Exports data as PDF
 */
const exportPdf = (
  fileName: string,
  data: any[],
  metadata?: Record<string, any>
): boolean => {
  try {
    const doc = new jsPDF();
    
    // Add title and metadata if provided
    if (metadata) {
      doc.setFontSize(18);
      doc.text(metadata.title || fileName, 14, 22);
      doc.setFontSize(10);
      
      let yPosition = 30;
      for (const key in metadata) {
        if (key !== 'title') {
          const value = typeof metadata[key] === 'string' 
            ? metadata[key] 
            : JSON.stringify(metadata[key]);
          doc.text(`${key}: ${value}`, 14, yPosition);
          yPosition += 6;
        }
      }
      
      yPosition += 10;
      
      // Convert data to table format for autotable
      if (data.length > 0) {
        const firstItem = data[0];
        const headers = Object.keys(firstItem);
        const rows = data.map(item => headers.map(header => item[header]));
        
        // @ts-ignore - jspdf-autotable functionality
        doc.autoTable({
          head: [headers],
          body: rows,
          startY: yPosition,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [66, 66, 66] }
        });
      } else {
        doc.text("No data available", 14, yPosition);
      }
    } else {
      // Simple text export for non-tabular data
      doc.text(JSON.stringify(data, null, 2), 10, 10);
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
    
    // Add metadata as commented header if provided
    if (metadata) {
      const metadataContent = Object.entries(metadata)
        .map(([key, value]) => `# ${key}: ${value}`)
        .join("\n");
      csvContent = metadataContent + "\n\n" + csvContent;
    }
    
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
