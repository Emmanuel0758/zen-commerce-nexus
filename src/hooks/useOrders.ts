
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/types';

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(order => ({
        id: order.id,
        customer: order.client?.name || 'Unknown',
        date: order.created_at,
        items: order.items_count,
        total: `${order.total_amount} FCFA`,
        status: order.status
      } as Order));
    },
  });

  const createOrder = useMutation({
    mutationFn: async (newOrder: Omit<Order, 'id'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          client_id: newOrder.client_id,
          order_number: newOrder.order_number,
          items_count: newOrder.items,
          total_amount: parseFloat(newOrder.total.replace(' FCFA', '')),
          status: newOrder.status
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders,
    isLoading,
    createOrder,
  };
}
