
import { jsPDF } from "jspdf";

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => any;
    lastAutoTable: { finalY: number };
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
