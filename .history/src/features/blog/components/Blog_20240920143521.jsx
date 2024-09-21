import React, { useEffect, useState } from "react";
import { useActiveBlog, useGetBlogById } from "../api/blogApi";
import { useLocation } from "react-router-dom";
import "../css/blog.css";

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idBlog = queryParams.get("id");

  // Fetch blog details by ID
  const {
    data: blogData,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useGetBlogById(idBlog);

  // Use mutation to handle blog activation/deactivation
  const { mutate: activeBlogMutate, isLoading: isMutating } = useActiveBlog();

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

  if (isBlogLoading) return <div>Loading...</div>;
  if (isBlogError) return <div>Error loading blog</div>;

  return (
    <div>
      {blogData && (
        <div className="blog-content">
          <h2>{blogData.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
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
