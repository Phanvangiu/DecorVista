import React, { useState } from "react";
import { FilterBlogByStatus } from "../api/blogApi";
import "../css/blog.css";
import { useNavigate } from "react-router-dom";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false); // Used for filtering by status
  const navigate = useNavigate();

  const filteredByStatus = FilterBlogByStatus(status, title);

  const onClickBlog = (id) => {
    navigate(`/getblogbyid?id=${id}`);
  };

  if (filteredByStatus.isLoading) return <div>Loading...</div>;
  if (filteredByStatus.isError) return <div>Error loading blogs</div>;

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
        {filteredByStatus.isSuccess &&
          filteredByStatus.data.data.map((blog, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => onClickBlog(blog.id)}
            >
              <h2>{blog.title}</h2>
              <h3>
                Post by:{" "}
                {blog.interior_designer_id
                  ? blog.interior_designer.first_name +
                    " " +
                    blog.interior_designer.last_name
                  : "admin"}
              </h3>
              <h5>Created at : {blog.created_at}</h5>
              <div>
                <img src={getFirebaseImageUrl(blog.images)} alt={blog.title} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
