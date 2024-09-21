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
  const imgUploadRef = useRef();
  const handleSubmit = () => {
    let isError = false;
    const file = imgUploadRef.current.files[0];
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
      onSuccess: () => {
        //page reload again
        window.location.reload();
      },
    });
  };
  const onUploadImg = (ev) => {
    ev.preventDefault();
    imgUploadRef.current.click();
  };
  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    input.onchange = () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];

        if (file) {
          const isValidFileType = allowedFileTypes.includes(file.type);
          if (!isValidFileType) {
            alert("Invalid file type! Please select a valid image file.");
            return;
          }
        }

        const formData = new FormData();
        formData.append("image", file);

        uploadMutation.mutate(formData, {
          onSuccess: (data) => {
            const quillEditor = qillRef.current.getEditor();
            const range = quillEditor.getSelection(true); //lấy vị trí hiện tại của con trỏ
            quillEditor.insertEmbed(range.index, "image", data.url);
          },
        });
      }
    };
  }, []);

  //fetch date BlogCategory from database

  const { data, isLoading } = CategoryValueQuery();
  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: { image: imageHandler },
        container: "#toolbar",
      },
    }),
    []
  );

  const handleChange = (content) => {
    setValue(content);
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
