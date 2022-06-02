import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import {Observable} from "rxjs";
import {Tag} from "../types/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService
  ) { }

  public getAllTags(): Promise<Observable<Tag[]>> {
    return this._buildUrl("all")
      .then(url => this._http.get<Tag[]>(url));
  }

  public getTagsByRecipeId(recipeId: number): Promise<Observable<Tag[]>> {
    return this._buildUrl("recipes")
      .then(url => this._http.get<Tag[]>(url, {
        params: {
          "recipe-id": recipeId
        }
      }));
  }

  private async _buildUrl(endpoint: string): Promise<string> {
    return this._configService.getConfig()
      .then(config => `${config.api.baseUrl}/tag/${endpoint}`);
  }
}
