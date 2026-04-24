import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/api";
import { useAuthStore } from "@/store/user/useAuthStore";

export interface AuthUserResponse {
  name: string;
  slug: string;
  adminToken: string;
}

const fetchCurrentUser = async (): Promise<AuthUserResponse> => {
  const response = await api.get<AuthUserResponse>("/user/me");
  return response.data;
};

export const useGetUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) return false;
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
    // If the query fails (e.g., 401 Unauthorized), clear the store
    if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isSuccess, query.isError, setUser]);

  return query;
};
