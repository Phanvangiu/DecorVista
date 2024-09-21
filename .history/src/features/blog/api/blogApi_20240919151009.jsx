import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
//phần dành riêng cho lưu ảnh khi dùng nút uploadImage khi tạo bài blog
// export const uploadImage = async (payload) => {
//   const response = await axiosClient.post("/uploadImage", payload); //qua nhánh main thì blog/uploadImage
//   return response.data;
// };

// export const UploadImageMutation = () => {
//   const uploadMutation = useMutation({
//     mutationFn: uploadImage,
//   });

//   return uploadMutation;
// };
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
