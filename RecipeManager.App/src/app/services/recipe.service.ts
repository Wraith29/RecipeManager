import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Recipe } from "../types/recipe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService
  ) {}

  public async getAllRecipes(): Promise<Observable<Recipe[]>> {
    return await this._buildUrl("all")
      .then(url => this._http.get<Recipe[]>(url)
    );
  }

  public async getRecipeById(recipeId: number): Promise<Observable<Recipe>> {
    return await this._buildUrl("by-id")
      .then(url => this._http.get<Recipe>(url, {
        params: {
          "recipe-id": recipeId
        }
      })
    );
  }

  public async getRecipesByTag(tagId: number): Promise<Observable<Recipe[]>> {
    return await this._buildUrl("by-tag")
      .then(url => this._http.get<Recipe[]>(url, {
        params: {
          'tag-id': tagId
        }
      }));
  }

  public async createRecipe(name: string, shortDescription: string, longDescription: string): Promise<void> {
    await this._buildUrl("create")
      .then(url => {
        let params = {
          'name': name,
          'short-description': shortDescription,
          'long-description': longDescription
        }

        this._http.post(url, {
          params: params
        }
      )});
  }

  private async _buildUrl(endpoint: string): Promise<string> {
    return this._configService.getConfig()
      .then(config => `${config.api.baseUrl}/recipe/${endpoint}`);
  }
}
