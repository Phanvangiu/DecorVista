import React, { useEffect, useState } from "react";
import { ActiveBlog, GetBlogById } from "../api/blogApi";
import { useLocation } from "react-router-dom";
import "../css/blog.css";

export default function Blog() {
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const location = useLocation();

  // Get the blog ID from query parameters
  const queryParams = new URLSearchParams(location.search);
  const idBlog = queryParams.get("id");
  const getBlogById = GetBlogById(idBlog);
  const activeBlog = ActiveBlog();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog</div>;

  const { mutate: activeBlogMutate, isLoading: isMutating } = ActiveBlog();

  // Handle accept/deny actions
  const handleAccept = (decision) => {
    activeBlogMutate(
      { id: idBlog, decision },
      {
        onSuccess: () => {
          alert(`Blog ${decision ? "accepted" : "denied"} successfully!`);
        },
        onError: () => {
          alert("Failed to update blog status");
        },
      }
    );
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
        {/* Disable buttons while mutating */}
        <button onClick={() => handleAccept(true)} disabled={isMutating}>
          Accept
        </button>
        <button onClick={() => handleAccept(false)} disabled={isMutating}>
          Deny
        </button>
      </div>
    </div>
  );
}
