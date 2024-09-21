import React, { useState, useCallback } from "react";
import {
  FilterBlogByName,
  FilterBlogByStatus,
  getAllBlog,
} from "../api/blogApi";
import "../css/blog.css";
import { useNavigate } from "react-router-dom";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { debounce } from "lodash";

// Memoized Blogs component
const Blogs = React.memo(() => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const debouncedSetTitle = useCallback(
    debounce((value) => {
      setTitle(value);
    }, 5),
    []
  );

  const filteredByStatus = FilterBlogByStatus(status, title);

  const onClickBlog = useCallback(
    (id) => {
      navigate(`/getblogbyid?id=${id}`);
    },
    [navigate]
  );

  if (filteredByStatus.isLoading) return <div>Loading...</div>;
  if (filteredByStatus.isError) return <div>Error loading blogs</div>;

  return (
    <div>
      <div className="search-container">
        <label htmlFor="search">Search blog by title</label>
        <input
          type="text"
          id="search"
          onChange={(e) => debouncedSetTitle(e.target.value)}
          defaultValue={title}
        />
        <button onClick={() => setStatus(true)}>Accept</button>
        <button onClick={() => setStatus(false)}>Denied</button>
      </div>

      <div className="blog-grid">
        {filteredByStatus.isSuccess &&
          filteredByStatus.data.data.map((blog, index) => (
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
});

export default Blogs;
