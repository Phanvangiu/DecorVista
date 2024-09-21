import React, { useEffect, useState } from "react";
import { GetBlogById } from "../api/blogApi";
import { useLocation } from "react-router-dom";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  // Get the blog ID from query parameters
  const queryParams = new URLSearchParams(location.search);
  const idBlog = queryParams.get("id");
  const getBlogById = GetBlogById(idBlog);
  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const response = GetBlogById(idBlog); // Fetch the blog by ID
  //       setBlog(response.data); // Assuming response.data contains the blog data
  //     } catch (error) {
  //       setIsError(true); // Handle error
  //     } finally {
  //       setIsLoading(false); // Set loading to false
  //     }
  //   };

  //   fetchBlog();
  // }, [idBlog]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog</div>;

  if (!blog) return <div>No blog found</div>;

  return (
    <div>
      {getBlogById.isSuccess && (
        <div>
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      )}
    </div>
  );
}
