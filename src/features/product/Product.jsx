import styled from "styled-components";
import { useRef, useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import TextInput from "@/shared/components/Input/TextInput";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import Button1 from "@/shared/components/Button/Button1";
import TextEditor from "./components/TextEditor/TextEditor";
import { BiImageAdd } from "react-icons/bi";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { AiOutlineClose } from "react-icons/ai";
import CreatableSelect from "react-select/creatable";
import useCreateProductReducer from "./hooks/useCreateProduct";
import { useEffect } from "react";
import cartesian from "./utils/cartesian";
import optionsFunction from "./data/optionsFunction";
import optionsBrand from "./data/optionsBrand";
import variantOptions from "./data/variantOptions";
import VariantDetailPopUp from "./components/PopUp/VariantDetailPopUp";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: white;
  margin-bottom: 5rem;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

const CatgoryContainer = styled.div``;

const SelectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SaveContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 2rem;

  > div {
    display: flex;
  }
`;

const ImageContainer = styled.div`
  > input {
    display: none;
  }

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 9rem;
  gap: 10px;

  > div:nth-of-type(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  > div {
    border: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ImageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 5px;

  > svg {
    display: none;
    font-size: 1.2rem;
    background-color: white;
    padding: none;
    border-radius: 5px;
  }

  > svg:nth-of-type(1) {
    width: 2rem;
    height: 2rem;
    margin-left: 30px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: 2px dotted rgba(255, 255, 255, 1);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:hover svg {
    display: block;
  }
`;

const ImageItem = styled.div`
  position: relative;
`;

const AddImageButton = styled.button`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 3rem 2rem;
  border: 1px dotted rgba(0, 0, 0, 0.2);

  > span {
    color: rgba(0, 0, 255, 0.5);
    font-size: 16px;
  }

  > svg {
    font-size: 45px;
    opacity: 0.3;
  }
`;

const VariantDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  > .createselect {
    flex: 1;
  }

  > .trash {
  }

  > svg {
    color: red;
    cursor: pointer;
  }
`;

const Input = styled(Select)`
  border-radius: 3px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 10rem;

  transition: all 0.3s;
  & * {
    cursor: pointer;
    outline: none !important;
    border: none !important;
  }
`;

const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;

  > button {
    color: #2962ff;
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    gap: 1rem;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
  }
`;

const VariantItem = styled.div`
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  display: flex;

  > span:nth-of-type(1) {
    flex: 1;
  }

  gap: 1rem;
  align-items: center;
`;

const VariantItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default function Product() {
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState();
  const [state, dispatch, ACTIONS] = useCreateProductReducer();
  const [variantDetailPopUp, setVariantDetailPopUp] = useState(false);
  const [chosenVariantDetail, setChosenVariantDetail] = useState(null);
  const [isAlert, setIsAlert] = useState("");
  const inputRef = useRef();

  const [inputValue, setInputValue] = useState(["", "", ""]);
  const [value, setValue] = useState([[], [], []]);

  const handleKeyDown = (event, index) => {
    if (!inputValue[index]) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => {
          const newValue = [...prev];
          const currentValue = Array.isArray(prev[index]) ? prev[index] : [];

          newValue[index] = [...currentValue, createOption(inputValue[index])];
          return newValue;
        });
        setInputValue((prev) => {
          const newInputValue = [...prev];
          newInputValue[index] = "";
          return newInputValue;
        });
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const onAddMoreVariant = () => {
    state.variants.push(0);
    dispatch({
      type: ACTIONS.CHANGE_VARIANTS,
      next: [...state.variants],
    });
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    const maxFileSize = 1 * 1024 * 1024;

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      const isValidFileSize = Array.from(ev.target.files).every((file) => file.size <= maxFileSize);

      if (!isValidFileType) {
        setImageError("Invalid file type. Please upload an image of type JPEG, PNG, GIF or JPG.");
        return;
      }

      if (!isValidFileSize) {
        setImageError("File size too large. Please upload an image smaller than 1 MB.");
        return;
      }

      dispatch({ type: ACTIONS.CHANGE_IMAGES, next: [...state.images, ...ev.target.files] });
      setImageError(null);
      ev.target.value = null;
    }
  };

  const onClickAddImage = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    let combinationArr = [];

    for (let i = 0; i < value.length; i++) {
      combinationArr.push(value[i].map((item) => item.value));
    }

    combinationArr = combinationArr.filter((item) => item.length != 0);

    if (combinationArr.length != 0) {
      const cartesianResult = cartesian(...combinationArr);

      const newCombination = [];

      for (let item of cartesianResult) {
        newCombination.push({
          variant: Array.isArray(item) ? item : [item],
          realPrice: 0,
          fakePrice: 0,
        });
      }

      dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: newCombination });
    }
  }, [value]);

  return (
    <>
      <Container>
        <FormContainer>
          <LeftContainer>
            <InputContainer>
              <label>Product Name</label>
              <TextInput
                state={state.productName}
                setState={(value) => dispatch({ type: ACTIONS.CHANGE_NAME, next: value })}
              />
            </InputContainer>

            <SelectContainer>
              <InputContainer>
                <label>Brand</label>
                <SelectInput
                  state={state.roomType}
                  setState={(value) => dispatch({ type: ACTIONS.CHANGE_ROOM_TYPE, next: value })}
                  options={optionsBrand}
                />
              </InputContainer>

              <InputContainer>
                <label>Room function</label>
                <SelectInput
                  state={state.roomFuncion}
                  setState={(value) => dispatch({ type: ACTIONS.CHANGE_FUNCTION, next: value })}
                  options={optionsFunction}
                />
              </InputContainer>
            </SelectContainer>

            <InputContainer>
              <label>Product Name</label>
              <TextEditor
                state={state.description}
                setState={(value) => dispatch({ type: ACTIONS.CHANGE_DESCRIPTION, next: value })}
              />
            </InputContainer>

            <ImageContainer>
              <p>Image container</p>
              {state.images.length > 0 && (
                <Images>
                  {state.images.map((item, index) => {
                    return (
                      <ImageItem key={index}>
                        <ImageLayout>
                          <AiOutlineClose
                            onClick={() => {
                              dispatch({
                                type: ACTIONS.CHANGE_IMAGES,
                                next: state.images.filter((image, position) => position != index),
                              });
                            }}
                          />
                        </ImageLayout>
                        <img src={URL.createObjectURL(item)} />
                      </ImageItem>
                    );
                  })}
                  <AddImageButton onClick={onClickAddImage}>
                    <BiImageAdd />
                  </AddImageButton>
                </Images>
              )}

              {state.images.length == 0 && (
                <AddImageButton onClick={onClickAddImage}>
                  <BiImageAdd />
                  <span>Add Image</span>
                </AddImageButton>
              )}
              <input ref={inputRef} onChange={handleImageChange} type="file" multiple />
            </ImageContainer>
            <VariantContainer>
              <p>Variants</p>
              {state.variants.map((item, index) => {
                return (
                  <VariantDetail key={index}>
                    <Input
                      value={variantOptions.find((i) => i.value == item)}
                      onChange={(options) => {
                        state.variants[index] = options.value;
                        dispatch({
                          type: ACTIONS.CHANGE_VARIANTS,
                          next: state.variants,
                        });
                      }}
                      options={variantOptions.filter(
                        (optionItem) => !state.variants.includes(optionItem.value)
                      )}
                      isSearchable
                    />
                    <FaTrash
                      className="trash"
                      onClick={() => {
                        if (state.variants.length == 1) {
                          setIsAlert("You need at least 1 variant ");
                          return;
                        }
                        state.variants = state.variants.filter((item, number) => index != number);
                        dispatch({
                          type: ACTIONS.CHANGE_VARIANTS,
                          next: state.variants,
                        });
                        setValue((prev) => {
                          prev[index] = [];
                          const newValue = [];
                          for (let item of prev) {
                            if (item.length == 0) {
                              continue;
                            }
                            newValue.push(item);
                          }
                          newValue.push([]);

                          return newValue;
                        });
                      }}
                    />
                    <CreatableSelect
                      className="createselect"
                      components={components}
                      inputValue={inputValue[index]}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={(newValue) => {
                        const newestValue = [...value];
                        newestValue[index] = newValue;
                        setValue(newestValue);
                      }}
                      onInputChange={(newValue) => {
                        const newestValue = [...inputValue];
                        newestValue[index] = newValue;
                        setInputValue(newestValue);
                      }}
                      onKeyDown={(ev) => handleKeyDown(ev, index)}
                      placeholder="Type something and press enter..."
                      value={value[index]}
                    />
                  </VariantDetail>
                );
              })}
              {state.variants.length < 3 && (
                <button onClick={onAddMoreVariant}>
                  <FaPlus />
                  Add more variant
                </button>
              )}
            </VariantContainer>
            <VariantItemContainer>
              {state.variant_detail.map((item) => {
                return (
                  <VariantItem
                    onClick={() => {
                      setChosenVariantDetail(item);
                      setVariantDetailPopUp(true);
                    }}
                  >
                    <span>
                      {item.variant.length != 1 ? item.variant.join("/") : item.variant[0]}
                    </span>
                    <span>${item.realPrice}</span>
                  </VariantItem>
                );
              })}
            </VariantItemContainer>
          </LeftContainer>
          <RightContainer></RightContainer>
        </FormContainer>
      </Container>
      {imageError && <ErrorPopUp message={imageError} action={() => setImageError("")} />}
      {variantDetailPopUp && (
        <VariantDetailPopUp
          state={chosenVariantDetail}
          action={() => setVariantDetailPopUp(false)}
          setState={() => {
            dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
          }}
        />
      )}
      {isAlert && <AlertPopUp message={isAlert} action={() => setIsAlert("")} />}
    </>
  );
}
