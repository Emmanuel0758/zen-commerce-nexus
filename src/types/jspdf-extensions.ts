
import { jsPDF } from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
    autoTable: (options: any) => void;
    internal: {
      events: any;
      scaleFactor: number;
      pageSize: {
        width: number;
        getWidth: () => number;
        height: number;
        getHeight: () => number;
      };
      pages: number[];
      getNumberOfPages: () => number;
      getEncryptor(objectId: number): (data: string) => string;
    };
  }
}
