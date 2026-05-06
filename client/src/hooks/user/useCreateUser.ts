import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { setAuthToken } from "@/lib/api/api";

export interface CreateUserPayload {
  name: string;
}

export interface AuthUserResponse {
  name: string;
  slug: string;
  adminToken: string;
}

const createUser = async (
  payload: CreateUserPayload,
): Promise<AuthUserResponse> => {
  const response = await api.post<AuthUserResponse>("/user", payload);
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setAuthToken(data.adminToken);
      // queryClient.setQueryData(["currentUser"], data);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
