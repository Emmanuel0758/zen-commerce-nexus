
export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  status: "active" | "inactive";
};

export type Order = {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "onhold";
};
