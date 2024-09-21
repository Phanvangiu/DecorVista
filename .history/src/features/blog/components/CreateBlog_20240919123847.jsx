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

    if (!REQUIRED_REGEX.test(qillRef.current.value)) {
      setQillError(true);
      isError = true;
    } else {
      setQillError(false);
    }

    if (imgSrc == DefaultImg) {
      setImgError(true);
      isError = true;
    } else {
      setImgError(false);
    }

    const arrCate = Array.from(
      document.querySelectorAll('input[name="category"]:checked')
    ).map((checkbox) => checkbox.value);

    if (arrCate.length == 0) {
      setCateError(true);
      isError = true;
    } else {
      setCateError(false);
    }

    if (isError === true) {
      return;
    } else {
      setTitleError(false);
      setQillError(false);
      setImgError(false);
    }

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    arrCate.forEach((cate) => {
      formData.append("category[]", cate);
    });
    formData.append("content", value);
    formData.append("image", file);

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
      <TextEditor state={content} setState={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
