import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Recipe } from "../types/recipe";
import { Config } from "../types/config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService
  ) {}

  public getAllRecipes(): Promise<Observable<Recipe[]>> {
    return this._buildUrl("all")
      .then(url => this._http.get<Recipe[]>(url)
    );
  }

  public getRecipeById(recipeId: number): Promise<Observable<Recipe>> {
    return this._buildUrl("by-id")
      .then(url => this._http.get<Recipe>(url, {
        params: {
          "recipe-id": recipeId
        }
      })
    );
  }

  public getRecipesByTag(tagId: number): Promise<Observable<Recipe[]>> {
    return this._buildUrl("by-tag")
      .then(url => this._http.get<Recipe[]>(url, {
        params: {
          'tag-id': tagId
        }
      }));
  }

  private async _buildUrl(endpoint: string): Promise<string> {
    return this._configService.getConfig()
      .then(config => `${config.api.baseUrl}/recipe/${endpoint}`);
  }
}
