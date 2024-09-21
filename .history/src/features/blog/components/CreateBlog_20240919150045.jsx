import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";
import CIcon from "@coreui/icons-react";
import { cilCloudUpload } from "@coreui/icons";
const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
  text-align: justify;
`;
const StyledImgField = styled.div`
  display: flex;
  flex-direction: column;

  & input {
    display: none;
  }

  & .upload-icon {
    width: 30px;
    margin-right: 5px;
  }

  & button {
    background-color: blue;
    color: white;
    padding: 10px 0px;
    border: 0;
  }

  & img {
    height: 8rem;
    width: max-content;
    margin-bottom: 10px;
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }
`;
export default function CreateBlog() {
  const imgUploadRef = useRef();
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const DefaultImg =
    "https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?w=299&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  const [imgSrc, setImgSrc] = useState(DefaultImg);
  const titleRef = useRef();
  const createBlogMutation = CreateBlogMutation(DefaultImg);

  const onUploadImg = (ev) => {
    ev.preventDefault();
    imgUploadRef.current.click();
  };
  const checkChange = () => {
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (imgUploadRef.current.files.length != 0) {
      const isValidFileType = Array.from(imgUploadRef.current.files).every(
        (file) => allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        alert("Invalid file type! Please select a valid image file.");
        imgUploadRef.current.files = null;
        setImgSrc(DefaultImg);
        return;
      }

      setImgSrc(URL.createObjectURL(imgUploadRef.current.files[0]));
      console.log(imgSrc);
    }
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
        formData.append("images", file);

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

  const handleSubmit = () => {
    const file = imgUploadRef.current.files[0];
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
    formData.append("images", file);
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        //page reload again
        window.location.reload();
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
      <StyledImgField>
        <label>
          <b>Blog Cover Image</b>
        </label>
        <input
          ref={imgUploadRef}
          accept="image/*"
          onChange={checkChange}
          type="file"
          id="image"
        />
        <img src={imgSrc} alt="img" width={200} />
        <button onClick={onUploadImg}>
          <CIcon icon={cilCloudUpload} customClassName="upload-icon" />
          Image Upload Here
        </button>
      </StyledImgField>
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
