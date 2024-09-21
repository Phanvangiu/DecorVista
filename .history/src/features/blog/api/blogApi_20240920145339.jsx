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
// activeBlog
// const activeBlog = async (id, decision) => {
//   const response = await axiosAdmin.get(
//     "blog/activeBlog?id=" + id + "&yes=" + decision
//   );
//   return response.data;
// };
// export function ActiveBlog() {
//   return useMutation({
//     mutationFn: activeBlog,
//   });
// }
// API function to activate the blog
const activeBlog = async (id, yes) => {
  const response = await axiosAdmin.put(
    `/blog/activeBlog?blogId=${id}&yes=${yes}`
  );
  return response.data;
};

// Exporting the React Query mutation
export function useActiveBlog() {
  return useMutation(({ id, decision }) => activeBlog(id, decision));
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
