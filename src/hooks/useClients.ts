
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/types';

export function useClients() {
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(client => ({
        ...client,
        orders: 0,
        totalSpent: '0',
        lastOrder: '',
        status: client.status || 'active'
      } as Client));
    },
  });

  const createClient = useMutation({
    mutationFn: async (newClient: Omit<Client, 'id'>) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: newClient.name,
          email: newClient.email,
          phone: newClient.phone,
          city: newClient.city,
          status: newClient.status
        }])
        .select()
        .single();

      if (error) throw error;
      return {
        ...data,
        orders: 0,
        totalSpent: '0',
        lastOrder: ''
      } as Client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  return {
    clients,
    isLoading,
    createClient,
  };
}
