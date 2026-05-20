// Add your own custom types in here
export type Dog = {
  id: number;
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
}

export type ActiveTab = 
  | "favorited"
  | "unfavorited"
  | "create"
  | null