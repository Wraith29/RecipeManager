import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../types/recipe";
import { RecipeTagMap } from "../../types/recipe-tag-map";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  @Input() public set tagFilter(tagId: number) {
    this._tagFilter = tagId;
    this._loadRecipesByFilter();
  }

  private _tagFilter: number = -1;
  public recipeTagMap!: RecipeTagMap;

  constructor(
    private _recipeService: RecipeService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._loadAllRecipes();
  }

  private async _loadAllRecipes(): Promise<void> {
    await this._recipeService.getRecipeTagMap()
      .then(res => res.subscribe({
        next: val => this.recipeTagMap = val,
        error: err => console.error(err)
      }));
  }

  private async _loadRecipesByFilter(): Promise<void> {
    if (this._tagFilter == -1 || this._tagFilter === undefined) {
      return await this._loadAllRecipes();
    }

    await this._recipeService.getFilteredRecipeTagMap(this._tagFilter)
      .then(res => res.subscribe({
        next: val => this.recipeTagMap = val,
        error: err => console.error(err)
      }))
  }
}
