
import { jsPDF } from "jspdf";
import PubSub from "pubsub-js";

// Types étendus pour jsPDF
declare module "jspdf" {
  interface jsPDF {
    // Extension pour autoTable
    autoTable: any;
    
    // Méthode lastAutoTable ajoutée par le plugin autoTable
    lastAutoTable: {
      finalY: number;
    };
    
    // Propriétés internes
    internal: {
      events: PubSub;
      scaleFactor: number;
      pageSize: {
        width: number;
        getWidth: () => number;
        height: number;
        getHeight: () => number;
      };
      pages: number[];
      getNumberOfPages: () => number;
      getEncryptor: (objectId: number) => (data: string) => string;
    };
  }
}
