import React from "react";
import { getAllBlog } from "../api/blogApi";

export default function Blogs() {
  const getAllBlog = getAllBlog();

  return <div>{getAllBlog.isSuccess}</div>;
}
