import React from "react";
import { useLocation } from "react-router-dom";
import { GetBlogById, ActiveBlog } from "../api/blogApi";
import "../css/blog.css";

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idBlog = queryParams.get("id");

  // Fetch blog details
  const getBlogById = GetBlogById(idBlog);
  const activeBlog = ActiveBlog();

  // Return loading or error states for blog retrieval
  if (getBlogById.isLoading) return <div>Loading...</div>;
  if (getBlogById.isError) return <div>Error loading blog</div>;

  // Handle accept/deny actions
  const handleAccept = (decision) => {
    const formData = new FormData();
    formData.append("blogId", idBlog);
    formData.append("yes", decision);
    activeBlog.mutate(formData, {
      onSuccess: (response) => {
        window.location.reload;
      },
    });
  };

  return (
    <div>
      {getBlogById.isSuccess && (
        <div className="blog-content">
          <h2>{getBlogById.data.data.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: getBlogById.data.data.content }}
          />
        </div>
      )}
      <div>
        {getBlogById.data.data.status == true && (
          <button onClick={() => handleAccept(false)}>Deny</button>
        )}
        {getBlogById.data.data.status == false && (
          <button onClick={() => handleAccept(true)}>Accept</button>
        )}
      </div>
    </div>
  );
}
