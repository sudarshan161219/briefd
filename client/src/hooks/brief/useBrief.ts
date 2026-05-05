import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/api";

// ==========================================
// 1. TYPES
// ==========================================

export interface Brief {
  id: string;
  slug: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "COMPLETED";

  // Scoping Fields
  projectName?: string | null;
  primaryGoal?: string | null;
  needBuilt?: string | null;
  targetAudience?: string | null;
  keyFeatures?: string | null;
  avoid?: string | null;
  deadline?: string | null;
  budgetRange?: string | null;

  // Links
  assetsUrls?: string | null;
  references?: string | null;
  additionalInfo?: string | null;

  userId: string;
  clientId: string | null;

  client: {
    name: string;
    companyName: string;
    email: string;
  };

  // Included on public routes
  user?: {
    name: string;
    slug: string;
  };
}

export interface CreateBriefPayload {
  name: string;
  clientId?: string;
}

export interface UpdatePublicBriefPayload {
  projectName?: string;
  primaryGoal?: string;
  needBuilt?: string;
  targetAudience?: string;
  keyFeatures?: string;
  avoid?: string;
  deadline?: string | null;
  budgetRange?: string;
  assetsUrls?: string;
  references?: string;
  additionalInfo?: string;
}

export interface SubmitBriefPayload {
  slug: string;
  data: {
    clientName?: string;
    clientEmail?: string;
    companyName?: string;
    projectName: string;
    primaryGoal: string;
    needBuilt: string;
    targetAudience?: string;
    keyFeatures?: string;
    avoid?: string;
    budgetRange: string;
    deadline?: string | null;
    assetsUrls?: string;
    references?: string;
    additionalInfo?: string;
  };
}

// ==========================================
// 2. API FUNCTIONS
// ==========================================

// Internal: Create a new brief
const createBrief = async (payload: CreateBriefPayload): Promise<Brief> => {
  const response = await api.post<Brief>("/brief", payload);
  return response.data;
};

// Internal: Fetch all briefs (optionally filtered by a specific client)
const fetchBriefs = async (clientId?: string): Promise<Brief[]> => {
  // If clientId is passed, it attaches ?clientId=xyz to the URL
  const response = await api.get<Brief[]>("/brief", {
    params: clientId ? { clientId } : undefined,
  });
  return response.data;
};

const fetchBrief = async (id: string): Promise<Brief> => {
  const response = await api.get<Brief>(`/brief/${id}`);
  return response.data;
};

// Public: Fetch a brief by its slug (No auth required)
const fetchPublicBrief = async (id: string): Promise<Brief> => {
  const response = await api.get<Brief>(`/public/brief/${id}`);
  return response.data;
};

const submitBrief = async ({ slug, data }: SubmitBriefPayload) => {
  const response = await api.put(`/brief/${slug}`, data);
  return response.data;
};

// Public: Submit the form fields to complete the brief

// ==========================================
// 3. REACT QUERY HOOKS
// ==========================================

/**
 * ------------------------------------------
 * INTERNAL HOOKS (Requires Admin Token)
 * ------------------------------------------
 */

export const useCreateBrief = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrief,
    onSuccess: (newBrief) => {
      // Refresh the master briefs list
      queryClient.invalidateQueries({ queryKey: ["briefs"] });

      // If tied to a client, refresh that specific client's list too
      if (newBrief.clientId) {
        queryClient.invalidateQueries({
          queryKey: ["briefs", newBrief.clientId],
        });
      }
    },
  });
};

export const useBriefs = (clientId?: string) => {
  return useQuery({
    queryKey: ["briefs", clientId],
    queryFn: () => fetchBriefs(clientId),
  });
};

export const useBrief = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brief", id],
    queryFn: () => fetchBrief(id!),
    enabled: !!id,
  });
};

/**
 * ------------------------------------------
 * PUBLIC HOOKS (No Auth Needed)
 * ------------------------------------------
 */

export const usePublicBrief = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brief", id],
    queryFn: () => fetchPublicBrief(id!),
    enabled: !!id,
    retry: false,
  });
};

export const useSubmitPublicBrief = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitBrief,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["brief", variables.slug],
      });
    },
    onError: (error) => {
      console.error("Failed to submit brief:", error);
    },
  });
};
