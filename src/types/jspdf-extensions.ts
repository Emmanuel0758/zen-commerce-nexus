
import { PubSub } from "pubsub-js";

declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
    // Autres méthodes de l'extension autoTable
    lastAutoTable: any;
    previousAutoTable: any;
    autoTableEndPosY: number;
    autoTableHtmlToJson: (tableElem: HTMLTableElement, delimeter?: string) => any;
    autoTableText: (text: string, x: number, y: number, styles: any) => void;
    
    // Définition correcte de l'interface pour internal
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
