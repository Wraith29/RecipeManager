import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.less']
})
export class CreateRecipeComponent implements OnInit {
  public recipeName!: string;
  public recipeShortDescription!: string;
  public recipeLongDescription!: string;

  constructor(
    private _recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  public async handleSubmit(ev: Event): Promise<void> {
    await this._recipeService.createRecipe(this.recipeName, this.recipeShortDescription, this.recipeLongDescription)
     .then(res => res.subscribe({
       next: data => console.log(data),
       error: err => console.error(err)
     }));
    this._clearForm();
  }

  private _clearForm(): void {
    this.recipeName = '';
    this.recipeShortDescription = '';
    this.recipeLongDescription = '';
  }
}
