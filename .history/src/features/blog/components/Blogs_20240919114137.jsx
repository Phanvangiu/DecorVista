import React from "react";
import { getAllBlog } from "../api/blogApi";

export default function Blogs() {
  const { data, isLoading, isError, isSuccess } = getAllBlog();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      {/* {isSuccess && data?.map((blog, index) => (
        <div key={index}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))} */}
    </div>
  );
}
