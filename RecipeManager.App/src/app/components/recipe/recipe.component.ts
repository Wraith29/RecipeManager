import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/types/tag';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  @Input() public recipe!: Recipe;
  @Input() public tags!: Tag[];

  constructor() { }
  ngOnInit(): void { }
}
