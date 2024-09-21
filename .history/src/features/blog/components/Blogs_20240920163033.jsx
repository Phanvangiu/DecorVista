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

  // Fetch all blogs
  const { data: allBlogs, isLoading, isError, isSuccess } = getAllBlog();

  // Filter by blog title if title is set
  const { data: filteredByName } = FilterBlogByName(title);

  // Filter by blog status if status is set (true for Accept, false for Denied)
  const { data: filteredByStatus } = FilterBlogByStatus(status);

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
        {/* Show blogs filtered by status if status is selected */}
        {status !== null && filteredByStatus?.data?.length > 0 && (
          <>
            {filteredByStatus.data.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => onClickBlog(blog.id)}
              >
                <h2>{blog.title}</h2>
                <img src={getFirebaseImageUrl(blog.images)} alt="" />
              </div>
            ))}
          </>
        )}

        {/* Show blogs filtered by title if a title is entered */}
        {title !== "" && filteredByName?.data?.length > 0 && (
          <>
            {filteredByName.data.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => onClickBlog(blog.id)}
              >
                <h2>{blog.title}</h2>
                <img src={getFirebaseImageUrl(blog.images)} alt="" />
              </div>
            ))}
          </>
        )}

        {/* Show all blogs if no filters are applied */}
        {status === null && title === "" && isSuccess && (
          <>
            {allBlogs.data.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => onClickBlog(blog.id)}
              >
                <h2>{blog.title}</h2>
                <img src={getFirebaseImageUrl(blog.images)} alt="" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
