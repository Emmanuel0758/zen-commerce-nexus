
import { PubSub } from "pubsub-js";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    setFontSize: (size: number) => jsPDF;
    setFont: (fontName: string, fontStyle?: string) => jsPDF;
    setTextColor: (r: number, g: number, b: number) => jsPDF;
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
