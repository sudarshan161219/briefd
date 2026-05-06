import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api/api";

// ==========================================
// 1. TYPES
// ==========================================

export interface Client {
  id: string;
  name: string;
  email: string;
  companyName?: string;
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

const fetchClientById = async (id: string): Promise<Client | undefined> => {
  try {
    const response = await api.get<Client>(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch client:", error);
    return undefined;
  }
};

const fetchAllClients = async (
  params?: ClientQueryParams,
): Promise<Client[]> => {
  const response = await api.get<Client[]>("/client", { params });
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
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
      // console.error("Mutation failed:", error.message);
      // toast.error(error.message);
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
