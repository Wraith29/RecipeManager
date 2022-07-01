import { getBaseUrl } from './config';
import type { IRecipe, ITag, RecipeTagMap } from './types';

abstract class Client {
    protected _baseUrl: string = getBaseUrl();

    protected async _get<TResponse>(url: string): Promise<TResponse> {
        return await fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => data as TResponse);
    }
}

export class RecipeClient extends Client {
    public async getAllRecipes(): Promise<IRecipe[]> {
        const url = `${this._baseUrl}/recipe/all`;
        return this._get<IRecipe[]>(url);
    }

    public async getRecipeTagMap(): Promise<RecipeTagMap> {
        const url = `${this._baseUrl}/recipe/tag-map`
        return this._get<RecipeTagMap>(url);
    }
}

export class TagClient extends Client {
    public async getAllTags(): Promise<ITag[]> {
        const url = `${this._baseUrl}/tag/all`;
        return this._get<ITag[]>(url);
    }
}