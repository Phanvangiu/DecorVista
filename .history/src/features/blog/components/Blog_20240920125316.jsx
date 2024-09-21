import React, { useEffect, useState } from "react";
import { GetBlogById } from "../api/blogApi";
import { useLocation } from "react-router-dom";

export default function Blog() {
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const location = useLocation();

  // Get the blog ID from query parameters
  const queryParams = new URLSearchParams(location.search);
  const idBlog = queryParams.get("id");
  const getBlogById = GetBlogById(idBlog);

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
