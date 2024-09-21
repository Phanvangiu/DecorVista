import React, { useState } from "react";
import {
  FilterBlogByName,
  FilterBlogByStatus,
  getAllBlog,
} from "../api/blogApi";
import "../css/blog.css";
import { useNavigate } from "react-router-dom";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null); // Used for filtering by status
  const navigate = useNavigate();

  // Filter blogs by status (true for Accept, false for Denied) and title
  const filteredByStatus,
  = FilterBlogByStatus(status, title);

  const onClickBlog = (id) => {
    navigate(`/getblogbyid?id=${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      <div className="search-container">
        <label htmlFor="search">Search blog by title</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={() => setStatus(true)}>Accept</button>
        <button onClick={() => setStatus(false)}>Denied</button>
      </div>

      <div className="blog-grid">
        {filteredByStatus.isSuccess && filteredByStatus.data.data.length > 0 ? (
          <>
            {filteredByStatus.data.data.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => onClickBlog(blog.id)}
              >
                <h2>{blog.title}</h2>
                <img src={getFirebaseImageUrl(blog.images)} alt={blog.title} />
              </div>
            ))}
          </>
        ) : (
          <div>No blogs found</div>
        )}
      </div>
    </div>
  );
}
