
import { jsPDF } from "jspdf";
import "jspdf-autotable";

/**
 * Exporte les données au format PDF, CSV ou JSON
 * @param data Les données à exporter
 * @param format Le format d'exportation (pdf, excel, json)
 * @param title Le titre de l'exportation
 * @returns Promise<boolean> Succès de l'exportation
 */
export const exportData = async (
  data: any[],
  format: "pdf" | "excel" | "json",
  title: string
): Promise<boolean> => {
  try {
    switch (format) {
      case "pdf":
        return exportToPDF(data, title);
      case "excel":
        return exportToCSV(data, title);
      case "json":
        return exportToJSON(data, title);
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
 * Exporte les données au format PDF
 * @param data Les données à exporter
 * @param title Le titre de l'exportation
 * @returns boolean Succès de l'exportation
 */
const exportToPDF = (data: any[], title: string): boolean => {
  try {
    // Création du document PDF
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    // Ajout du titre et de la date
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(150);
    doc.text(`Exporté le ${currentDate}`, 14, 30);
    doc.setTextColor(0);
    doc.setFontSize(12);
    
    // Preparation des données pour le tableau
    const rows = data.map((item) => {
      // Si c'est un projet
      if (item.id && item.name && item.status) {
        return [
          item.id,
          item.name,
          item.type || "-",
          item.status,
          item.priority || "-",
          `${item.progress || 0}%`,
          item.deadline ? new Date(item.deadline).toLocaleDateString() : "-",
          item.assignedTo || "-",
        ];
      }
      // Si c'est un autre type de données, retourner les valeurs de l'objet
      return Object.values(item);
    });
    
    // Définition des entêtes du tableau
    let headers;
    
    // Si c'est un projet
    if (data[0]?.id && data[0]?.name && data[0]?.status) {
      headers = [
        "ID", 
        "Nom", 
        "Type", 
        "Statut", 
        "Priorité", 
        "Progression", 
        "Échéance", 
        "Assigné à"
      ];
    } else {
      // Sinon, utiliser les clés de l'objet comme entêtes
      headers = Object.keys(data[0] || {});
    }
    
    // Configuration et création du tableau
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 40,
      margin: { top: 40 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });
    
    // Numérotation des pages
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} sur ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    
    // Téléchargement du fichier
    doc.save(`${title.toLowerCase().replace(/\s+/g, "_")}_${currentDate.replace(/\//g, "-")}.pdf`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation PDF:", error);
    return false;
  }
};

/**
 * Exporte les données au format CSV
 * @param data Les données à exporter
 * @param title Le titre de l'exportation
 * @returns boolean Succès de l'exportation
 */
const exportToCSV = (data: any[], title: string): boolean => {
  try {
    // Préparation des entêtes du tableau
    let headers;
    
    // Si c'est un projet
    if (data[0]?.id && data[0]?.name && data[0]?.status) {
      headers = [
        "ID", 
        "Nom", 
        "Type", 
        "Statut", 
        "Priorité", 
        "Progression", 
        "Échéance", 
        "Assigné à"
      ];
    } else {
      // Sinon, utiliser les clés de l'objet comme entêtes
      headers = Object.keys(data[0] || {});
    }
    
    // Préparation des lignes du tableau
    const rows = data.map((item) => {
      // Si c'est un projet
      if (item.id && item.name && item.status) {
        return [
          item.id,
          item.name,
          item.type || "",
          item.status,
          item.priority || "",
          `${item.progress || 0}%`,
          item.deadline ? new Date(item.deadline).toLocaleDateString() : "",
          item.assignedTo || "",
        ];
      }
      // Sinon, utiliser les valeurs de l'objet
      return Object.values(item);
    });
    
    // Construction du contenu CSV
    let csvContent = headers.join(";") + "\n";
    
    rows.forEach((row) => {
      csvContent += row.join(";") + "\n";
    });
    
    // Création et téléchargement du fichier
    const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "_")}_${currentDate}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation CSV:", error);
    return false;
  }
};

/**
 * Exporte les données au format JSON
 * @param data Les données à exporter
 * @param title Le titre de l'exportation
 * @returns boolean Succès de l'exportation
 */
const exportToJSON = (data: any[], title: string): boolean => {
  try {
    // Création du fichier JSON
    const jsonContent = JSON.stringify(data, null, 2);
    const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "_")}_${currentDate}.json`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'exportation JSON:", error);
    return false;
  }
};
