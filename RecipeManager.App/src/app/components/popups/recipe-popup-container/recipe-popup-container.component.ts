import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-popup-container',
  templateUrl: './recipe-popup-container.component.html',
  styleUrls: ['./recipe-popup-container.component.less']
})
export class RecipePopupContainerComponent implements OnInit {
  public createRecipeHidden: boolean = true;
  
  constructor() { }

  ngOnInit(): void {}

  public toggleCreateRecipePopup(): void {
    this.createRecipeHidden = !this.createRecipeHidden;
  }
}
