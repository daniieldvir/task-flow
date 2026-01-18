import { fetchUsers } from "@/api/users.jsx";
import { useQuery } from "@tanstack/react-query";
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
