
import { jsPDF } from "jspdf";
import { PubSub } from "pubsub-js";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    setFontSize: (size: number) => jsPDF;
    setTextColor: (r: number, g: number, b: number) => jsPDF;
    text: (text: string, x: number, y: number, options?: any) => jsPDF;
    addImage: (imageData: string, format: string, x: number, y: number, width: number, height: number) => jsPDF;
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

export {};
