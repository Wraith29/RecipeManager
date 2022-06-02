import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../types/recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  private _tagFilter!: number;
  @Input() public set tagFilter(tagId: number) {
    this._tagFilter = tagId;
    this._loadRecipesByFilter().then();
  }
  public recipes!: Recipe[];

  constructor(
    private _recipeService: RecipeService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._loadAllRecipes();
  }

  private async _loadAllRecipes(): Promise<void> {
    await this._recipeService.getAllRecipes()
      .then(res => res.subscribe({
        next: val => this.recipes = val,
        error: err => console.error(err),
      }));
  }

  private async _loadRecipesByFilter(): Promise<void> {
    await this._recipeService.getRecipesByTag(this._tagFilter)
      .then(res => res.subscribe({
        next: recipes => this.recipes = recipes,
        error: err => console.error(err)
      }))
  }
}
