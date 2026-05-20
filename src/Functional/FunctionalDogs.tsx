import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
type DogProps = {
  dogs: Dog[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onFavorite: (dog: Dog) => void;
}

export const FunctionalDogs = ({
  dogs,
  isLoading,
  onDelete,
  onFavorite,
}: DogProps) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
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
};
