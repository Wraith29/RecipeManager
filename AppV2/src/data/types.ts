export interface IRecipe {
    id: number;
    name: string;
    shortDescription: string;
    longDescription: string;
}

export interface ITag {
    id: number;
    name: string;
}

export interface RecipeTagMap {
    recipes: {
        recipe: IRecipe,
        tags: ITag[]
    }[]
}

export interface RecipeTagLinker {
    recipeId: number;
    tagId: number;
}