import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/types/tag';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  @Input() public recipeName!: string;
  @Input() public tags!: Tag[];

  constructor() { }
  ngOnInit(): void { }
}
