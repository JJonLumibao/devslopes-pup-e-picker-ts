import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

type FormProps = {
  createDog: (dog: Omit<Dog, "id" | "isFavorite">) => void;
  isLoading: boolean;
}

type State = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
}

export class ClassCreateDogForm extends Component<FormProps> {
  state: State = {
    nameInput: "",
    descriptionInput: "",
    imageInput: dogPictures.BlueHeeler,
  }
  render() {
    const { createDog, isLoading } = this.props;
    const { nameInput, descriptionInput, imageInput } = this.state;
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
          this.setState({
            nameInput: "", 
            descriptionInput: "", 
            imageInput: dogPictures.BlueHeeler
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input 
          type="text" 
          value={nameInput}
          onChange={(e) => this.setState({nameInput: e.target.value})} 
          disabled={isLoading} 
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          cols={80}
          rows={10}
          value={descriptionInput}
          onChange={(e) => this.setState({descriptionInput: e.target.value})}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select 
          value={imageInput}
          onChange={(e) => this.setState({imageInput: e.target.value})} 
          disabled={isLoading}>
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
