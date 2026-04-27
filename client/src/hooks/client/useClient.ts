import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/api";

// ==========================================
// 1. TYPES
// ==========================================

export interface Client {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  userId: string;
  briefs: [];
}

export interface ClientQueryParams {
  search?: string;
  sortBy?: "name" | "email" | "companyName";
  order?: "asc" | "desc";
  hasCompany?: "true" | "false" | "all";
}

export interface CreateClientPayload {
  name: string;
  email: string;
  companyName?: string;
}

export interface UpdateClientPayload {
  name?: string;
  email?: string;
  companyName?: string;
}

// ==========================================
// 2. API FUNCTIONS
// ==========================================

const createClient = async (payload: CreateClientPayload): Promise<Client> => {
  const response = await api.post<Client>("/client", payload);
  return response.data;
};

const fetchClientById = async (id: string): Promise<Client> => {
  const response = await api.get<Client>(`/client/${id}`);
  return response.data;
};

const fetchAllClients = async (
  params?: ClientQueryParams,
): Promise<Client[]> => {
  const response = await api.get<Client[]>("/client", { params });
  console.log("RAW AXIOS DATA:", response.data);
  return response.data;
};

const updateClient = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateClientPayload;
}): Promise<Client> => {
  const response = await api.patch<Client>(`/client/${id}`, data);
  return response.data;
};

const deleteClient = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete<{ success: boolean }>(`/client/${id}`);
  return response.data;
};

// ==========================================
// 3. REACT QUERY HOOKS
// ==========================================

/**
 * Hook to fetch a single client by ID
 */
export const useClient = (id: string | undefined) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClientById(id!),
    enabled: !!id,
  });
};

/**
 * Hook to fetch all clients for the current freelancer
 */
export const useClients = (params?: ClientQueryParams) => {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => fetchAllClients(params),
  });
};

/**
 * Hook to create a new client
 */
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Instantly invalidate the clients list so the UI updates
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

/**
 * Hook to update an existing client
 */
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClient,
    onSuccess: (updatedClient) => {
      // Invalidate the specific client's cache and the master list
      queryClient.invalidateQueries({ queryKey: ["client", updatedClient.id] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

/**
 * Hook to delete a client
 */
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Invalidate the master list so the deleted client disappears from the UI
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
