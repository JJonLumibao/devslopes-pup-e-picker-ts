import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type DogProps = {
  dogs: Dog[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onFavorite: (dog: Dog) => void;
}

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<DogProps> {
  render() {
    const {dogs, isLoading, onDelete, onFavorite} = this.props;
    return (
      <>
        {dogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            onDelete(dog.id);
          }}
          onHeartClick={() => {
            onFavorite(dog);
          }}
          onEmptyHeartClick={() => {
            onFavorite(dog);
          }}
          isLoading={isLoading}
        />
      ))}
      </>
    );
  }
}
