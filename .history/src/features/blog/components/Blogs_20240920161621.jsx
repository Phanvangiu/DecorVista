import React, { useState } from "react";
import { getAllBlog, FilterBlogByStatus } from "../api/blogApi"; // Assuming both APIs are in blogApi
import "../css/blog.css";
import BlogFilter from "./BlogFilter";
import { useNavigate } from "react-router-dom";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null); // For status filtering
  const navigate = useNavigate();

  // Fetch all blogs
  const { data, isLoading, isError, isSuccess } = getAllBlog();

  // Filter blogs by status
  const {
    data: filteredBlogs,
    isLoading: isFiltering,
    isError: isFilterError,
    isSuccess: isFilterSuccess,
  } = FilterBlogByStatus(status);

  const onClickBlog = (id) => {
    navigate(`/getblogbyid?id=${id}`);
  };

  // Handle status filter (Accept = true, Deny = false)
  const handleStatusFilter = (status) => {
    setStatus(status); // Trigger filter by status
  };

  if (isLoading || isFiltering) return <div>Loading...</div>;
  if (isError || isFilterError) return <div>Error loading blogs</div>;

  return (
    <div>
      <div className="search-container">
        <label htmlFor="search">Search blog</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={() => handleStatusFilter(true)}>Accept</button>
        <button onClick={() => handleStatusFilter(false)}>Denied</button>
      </div>

      {/* Display filtered blogs by title if a title is searched */}
      {title && <BlogFilter title={title} />}

      {/* Display filtered blogs by status */}
      {status !== null && isFilterSuccess && (
        <div className="blog-grid">
          {filteredBlogs.data.map((blog, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => onClickBlog(blog.id)}
            >
              <h2>{blog.title}</h2>
              <img src={getFirebaseImageUrl(blog.images)} alt="" />
            </div>
          ))}
        </div>
      )}

      {/* Display all blogs if no filters are applied */}
      {!title && status === null && isSuccess && (
        <div className="blog-grid">
          {data.data.map((blog, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => onClickBlog(blog.id)}
            >
              <h2>{blog.title}</h2>
              <img src={getFirebaseImageUrl(blog.images)} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
