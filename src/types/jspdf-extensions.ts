
import { jsPDF } from "jspdf";
import PubSub from "pubsub-js";

// Étendre l'interface jsPDF pour inclure les fonctionnalités autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
    lastAutoTable: {
      finalY: number;
    };
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
