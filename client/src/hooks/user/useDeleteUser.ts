import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { clearAuthToken } from "@/lib/api/api";

const deleteUserAccount = async () => {
  const response = await api.delete("/user");
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      queryClient.clear();
      clearAuthToken();
    },
    onError: (error) => {
      console.error("Failed to delete user account:", error);
    },
  });
};
