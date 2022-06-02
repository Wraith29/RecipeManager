import { Component, Input, OnInit } from '@angular/core';
import { TagService } from "../../services/tag.service";
import { Recipe } from "../../types/recipe";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  @Input() public recipe!: Recipe

  constructor(
    private _tagService: TagService
  ) { }

  ngOnInit(): void {}
}
