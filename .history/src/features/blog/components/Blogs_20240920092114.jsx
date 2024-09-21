import React, { useState } from "react";
import { getAllBlog } from "../api/blogApi";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
export default function Blogs() {
  const { data, isLoading, isError, isSuccess } = getAllBlog();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;
  // const [content, setContent] = useState(false);
  return (
    <div>
      <div>
        {isSuccess &&
          data.data.map((blog, index) => (
            <div key={index}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
