/* Search Recipes Response */

export interface SearchRecipesResponse {
  results: Result[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Result {
  id: number;
  title: string;
  image: string;
  imageType: ImageType;
}

export enum ImageType {
  Jpg = 'jpg',
}

export interface MappedRecipe {
  readonly recipeId: number;
  recipeTitle: string;
  recipeImage: string;
}
