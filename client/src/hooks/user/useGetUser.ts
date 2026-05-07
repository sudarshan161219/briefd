import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/api";
import { useAuthStore } from "@/store/user/useAuthStore";

export interface AuthUserResponse {
  name: string;
  slug: string;
  adminToken: string;
}

// const fetchCurrentUser = async (): Promise<AuthUserResponse> => {
//   try {
//     const response = await api.get<AuthUserResponse>("/user/me");
//     useAuthStore.getState().setUser(response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       useAuthStore.getState().setUser(null);
//     }
//     throw error;
//   }
// };

const fetchCurrentUser = async (): Promise<AuthUserResponse> => {
  const response = await api.get<AuthUserResponse>("/user/me");
  useAuthStore.getState().setUser(response.data);
  return response.data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(),
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().setUser(null);
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
