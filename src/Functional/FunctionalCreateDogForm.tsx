import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog, 
  isLoading,
}: {
  createDog: (dog: Omit<Dog, "id" | "isFavorite">) => void;
  isLoading: boolean;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState(defaultSelectedImage);

  return (
    <form
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
            name: nameInput,
            description: descriptionInput,
            image: imageInput,
        })
        setNameInput("");
        setDescriptionInput("");
        setImageInput(defaultSelectedImage);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input 
        type="text" 
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        disabled={isLoading} 
      />
      <label htmlFor="description">Dog Description</label>
      <textarea 
        cols={80} 
        rows={10} 
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select 
        value={imageInput}
        onChange={(e) => {
          setImageInput(e.target.value)
        }}
        disabled={isLoading}
        >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
