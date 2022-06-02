import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "../../types/recipe";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  @Input() public recipe!: Recipe

  constructor() { }
  ngOnInit(): void {}
}
