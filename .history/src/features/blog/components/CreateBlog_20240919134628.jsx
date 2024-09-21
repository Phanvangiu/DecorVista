import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";
const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
  text-align: justify;
`;
export default function CreateBlog() {
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const titleRef = useRef();
  const createBlogMutation = CreateBlogMutation();

  const handleSubmit = () => {
    let isError = false;
    const REQUIRED_REGEX = /^.{1,}$/;
    //check requied
    if (!REQUIRED_REGEX.test(titleRef.current.value)) {
      setTitleError(true);
      isError = true;
    } else {
      setTitleError(false);
    }

    if (isError === true) {
      return;
    } else {
      setTitleError(false);
    }

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("content", content);
    createBlogMutation.mutate(formData, {
      onSuccess: (response) => {
        alert("hachsvjd");
        document.getElementById("title").value = "";
        setContent("<p></p>");
      },
    });
  };
  return (
    <div>
      <StyledError>
        {titleError && <span>This field is required</span>}
      </StyledError>
      <div className="title-block">
        <label htmlFor="">
          <b>Input Blog Title</b>
        </label>
        <input type="text" name="title" id="title" ref={titleRef} />
      </div>
      <TextEditor
        state={content}
        setState={setContent}
        name="content"
        id="content"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
