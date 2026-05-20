// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import { Link } from "react-router-dom";
import { FunctionalCreateDogForm } from "../Functional/FunctionalCreateDogForm";
import { FunctionalDogs } from "../Functional/FunctionalDogs";
import toast from "react-hot-toast";

type State = {
  activeTab: ActiveTab | null;
  dogs: Dog[];
  isLoading: boolean;
}

export class ClassSection extends Component<Record<string,never>, State> {
  state: State = {
    activeTab: null,
    dogs: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    Requests.getAllDogs()
      .then(data => {
        this.setState({ dogs: data });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleDelete = async (id: number) => {
    Requests.deleteDog(id);
    this.setState({
      dogs: this.state.dogs.filter((dog) => dog.id !== id)
    })
  }

  handleFavorite = async (dog: Dog) => {
    const updatedDog = await Requests.updateDog(dog.id, {
      isFavorite: !dog.isFavorite
    });
    this.setState({
      dogs: this.state.dogs.map((currentDog) => 
        currentDog.id === dog.id ? updatedDog : currentDog
      )
    })
  }

  handleCreate = async (dog: Omit<Dog, "id" | "isFavorite">) => {
    this.setState({isLoading: true});
    try {
      const newDog = await Requests.postDog(dog);
      this.setState({
        dogs: [...this.state.dogs, newDog],
        isLoading: false
      });
      toast.success("Dog Created");
    } catch(e) {
      toast.error("Failed to create dog");
    }
  }

  
  render() {
    const { activeTab, dogs } = this.state;
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
              <Link to={"/functional"} className="btn">
                Change to Functional
              </Link>
              <div className="selectors">
                {/* This should display the favorited count */}
                <div className={`selector ${activeTab === "favorited" ? "active" : ""}`} onClick={() => {
                  this.setState({activeTab: activeTab === "favorited" ? null : "favorited"});
                }}>
                  favorited ( {favoriteCount} )
                </div>
      
                {/* This should display the unfavorited count */}
                <div className={`selector ${activeTab === "unfavorited" ? "active" : ""}`} onClick={() => {
                  this.setState({activeTab: activeTab === "unfavorited" ? null : "unfavorited"});
                }}>
                  unfavorited ( {unfavoriteCount} )
                </div>
                <div className={`selector ${activeTab === "create" ? "active" : ""}`} onClick={() => {
                  this.setState({activeTab: activeTab === "create" ? null : "create"});
                }}>
                  create dog
                </div>
              </div>
            </div>
            <div className="content-container">
              {activeTab === "create"
                ? <FunctionalCreateDogForm 
                    createDog={this.handleCreate}
                    isLoading={this.state.isLoading}
                  />
                : <FunctionalDogs 
                    dogs={displayedDogs}
                    isLoading={this.state.isLoading}
                    onDelete={this.handleDelete}
                    onFavorite={this.handleFavorite}
                  />
              }
            </div>
          </section>
    );
  }
}
