import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const getAllBlog = () => {
  const request = async () => {
    const response = await axiosAdmin.get("blog");
    return response.data;
  };

  return useQuery({
    queryKey: ["blogs"],
    queryFn: request,
  });
};

const getBlogByUserId = async (ownerBlogId) => {
  const response = await axiosAdmin.get(
    "blog/getblogbyuserid?ownerBlogId=" + ownerBlogId
  );
  return response.data;
};

export function GetAllBlogByUser(ownerBlogId) {
  return useQuery({
    queryKey: ["allBlogByUser", ownerBlogId],
    queryFn: () => getBlogByUserId(ownerBlogId), // Pass ownerBlogId to the function
  });
}
const getBlogById = async (id) => {
  const response = await axiosAdmin.get("blog/getblogbyid?id=" + id);
  return response.data;
};
export function GetBlogById(id) {
  return useQuery({
    queryKey: ["getBlogById", id],
    queryFn: () => getBlogById(id), // Pass ownerBlogId to the function
  });
}

const activeBlog = async (id, yes) => {
  const response = await axiosAdmin.get("blog/activeBlog", {
    params: { id, yes },
  });
  return response.data;
};

// export const ActiveBlog = (id, yes) => {
//   return useQuery({
//     queryKey: ["activeBlog", id],
//     queryFn: () => {
//       return activeBlog(id, yes);
//     },
//   });
// };

// Exporting the React Query mutation
export function useActiveBlog() {
  return useMutation(({ id, yes }) => activeBlog(id, yes));
}
const getBlogByTitle = async (text) => {
  const response = await axiosAdmin.get("blog/getblogbytitle?title=" + text);
  return response.data;
};
export function FilterBlogByName(text) {
  return useQuery({
    queryKey: ["filterBlogByTitle", text],
    queryFn: () => getBlogByTitle(text), // Pass ownerBlogId to the function
  });
}
const createBlog = async (payload) => {
  const response = await axiosAdmin.post("blog", payload);
  return response.data;
};
export const CreateBlogMutation = () => {
  const blogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["Blog"] });
      //thay bằng onSuccess bên nút submit
    },
  });

  return blogMutation;
};