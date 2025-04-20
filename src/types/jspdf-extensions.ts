
import { jsPDF } from "jspdf";
import PubSub from "pubsub-js";

declare module "jspdf" {
  interface jsPDF {
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
      getEncryptor: (objectId: number) => (data: string) => string;
    };
  }
}
