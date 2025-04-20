import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newOrderSchema = z.object({
  customer: z.string().min(3, { message: "Le nom du client est requis (min. 3 caractères)" }),
  email: z.string().email({ message: "Email invalide" }).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  items: z.array(z.object({
    product: z.string().min(1, { message: "Veuillez sélectionner un produit" }),
    quantity: z.number().min(1, { message: "La quantité doit être d'au moins 1" })
  })).min(1),
  status: z.enum(["pending", "processing", "completed", "cancelled", "onhold"], {
    required_error: "Veuillez sélectionner un statut"
  }),
  shippingAddress: z.string().optional(),
  notes: z.string().optional()
});

export type NewOrderFormValues = z.infer<typeof newOrderSchema>;
