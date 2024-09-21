import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";

export default function CreateBlog() {
  const StyledError = styled.div`
    color: red;
    font-size: 14px;
    height: 2.5rem;
    padding: 5px 0;
    text-align: justify;
  `;
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const titleRef = useRef();

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
    formData.append("content", value);
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        document.getElementById("title").value = "";
        document
          .querySelectorAll('input[name="category"]:checked')
          .forEach((checkbox) => {
            checkbox.checked = false;
          });
        setValue("");
        setImgSrc(DefaultImg);
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
      <TextEditor state={content} setState={setContent} name="content" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
