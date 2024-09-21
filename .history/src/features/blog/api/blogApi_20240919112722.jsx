import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const getAllBlog = () => {
  const request = async () => {
    const response = await axiosAdmin.get("Blog");
    return response.data;
  };

  return useQuery({
    queryKey: ["blogs"],
    queryFn: request,
  });
};
