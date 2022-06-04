import { Recipe } from "./recipe";
import { Tag } from './tag';

export interface RecipeTagMap {
  recipes: [
    recipe: Recipe,
    tags: Tag[]
  ]
}
