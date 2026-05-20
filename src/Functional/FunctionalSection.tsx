// you can use this type for react children if you so choose
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import toast from "react-hot-toast";

export const FunctionalSection = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Requests.getAllDogs()
      .then(data => {
        setDogs(data);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const handleDelete = async (id: number) => {
    Requests.deleteDog(id);
    setDogs((prev) => 
      prev.filter((dog) => dog.id !== id)
    )
  }

  const handleFavorite = async (dog: Dog) => {
    const updatedDog = await Requests.updateDog(dog.id, {
      isFavorite: !dog.isFavorite
    });
    setDogs((prev) => 
      prev.map((currentDog) => currentDog.id === dog.id ? updatedDog : currentDog)
    )
  }

  const handleCreate = async (dog: Omit<Dog, "id" | "isFavorite">) => {
    setIsLoading(true);
    try {
      const newDog = await Requests.postDog(dog);
      setDogs((prev) => [...prev, newDog]);
      setIsLoading(false);
      toast.success("Dog Created");
    } catch (e) {
      toast.error("Failed to create dog")
    }
  }

  const favoriteCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteCount = dogs.filter((dog) => !dog.isFavorite).length;

  const displayedDogs = 
    activeTab === "favorited" 
      ? dogs.filter((dog) => dog.isFavorite)
      : activeTab === "unfavorited" 
      ? dogs.filter((dog) => !dog.isFavorite)
      : dogs
  

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector ${activeTab === "favorited" ? "active" : ""}`} onClick={() => {
            setActiveTab((prev) => prev === "favorited" ? null : "favorited");
          }}>
            favorited ( {favoriteCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector ${activeTab === "unfavorited" ? "active" : ""}`} onClick={() => {
            setActiveTab((prev) => prev === "unfavorited" ? null : "unfavorited");
          }}>
            unfavorited ( {unfavoriteCount} )
          </div>
          <div className={`selector ${activeTab === "create" ? "active" : ""}`} onClick={() => {
            setActiveTab((prev) => prev === "create" ? null : "create");
          }}>
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === "create"
          ? <FunctionalCreateDogForm 
              createDog={handleCreate}
              isLoading={isLoading}
            />
          : <FunctionalDogs 
              dogs={displayedDogs}
              isLoading={isLoading}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
            />
        }
      </div>
    </section>
  );
};
