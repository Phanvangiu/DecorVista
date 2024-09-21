import React, { useState, useEffect } from "react";
import { FilterBlogByStatus } from "../api/blogApi";
import "../css/blog.css";
import { useNavigate } from "react-router-dom";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false); // Used for filtering by status
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    // Gọi API lọc blog theo status và title
    FilterBlogByStatus(status, title)
      .then((response) => {
        setFilteredBlogs(response.data); // Lưu lại kết quả lọc
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [status, title]); // Gọi lại khi status hoặc title thay đổi

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
        {filteredBlogs &&
          filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => onClickBlog(blog.id)}
            >
              <h2>{blog.title}</h2>
              <img src={getFirebaseImageUrl(blog.images)} alt={blog.title} />
            </div>
          ))}
      </div>
    </div>
  );
}
