import React, { useState } from "react";
import {
  FilterBlogByName,
  FilterBlogByStatus,
  getAllBlog,
} from "../api/blogApi";
import "../css/blog.css";
import BlogFilter from "./BlogFilter";
import { useNavigate } from "react-router-dom"; // Use useNavigate
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null);
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const fiterByname = FilterBlogByName(title);
  const filterBlogByStatus = FilterBlogByStatus();
  const navigate = useNavigate(); // Initialize navigate

  const onClickBlog = (id) => {
    navigate(`/getblogbyid?id=${id}`); // Use navigate to redirect
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;
  // const hanldFilter = (status) => {
  //   filterBlogByStatus(status);
  // };
  return (
    <div>
      <div className="search-container">
        <label htmlFor="search">Search blog</label>
        <input
          type="text"
          id="search"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={() => setStatus(true)}>Accept</button>
        <button onClick={() => setStatus(false)}>Denied</button>
      </div>

      {/* {title && <BlogFilter title={title} />} */}

      {isSuccess && status == null && (
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
      {/* filter */}
      {(title !== "" && filterBlogByStatus.isSuccess) ||
        (status == null && fiterByname.isSuccess && (
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
        ))}
    </div>
  );
}
