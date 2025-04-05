
import { jsPDF } from "jspdf";
import { PubSub } from "@/types";

declare module "jspdf" {
  interface jsPDF {
    // Add extensions to jsPDF type
    autoTable: any;
    setTextColor: (ch1: string | number, ch2?: number, ch3?: number, ch4?: number) => jsPDF;
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
      getEncryptor: (objectId: number) => (data: string) => string;
    };
  }
}
