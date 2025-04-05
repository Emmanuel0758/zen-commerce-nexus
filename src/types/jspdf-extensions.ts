
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: any;
    setFontSize: (size: number) => jsPDF;
    setFont: (fontName: string, fontStyle?: string, fontWeight?: string | number) => jsPDF;
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
