import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/types/tag';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.less']
})
export class CreateRecipeComponent implements OnInit {
  @Output() public closeWindow = new EventEmitter<boolean>();
  public recipeName!: string;
  public recipeShortDescription!: string;
  public recipeLongDescription!: string;
  public selectedTags: Set<number> = new Set(); 
  public mappedTags!: string[];

  private _tags!: Tag[];
  public set tags(val: Tag[]) {
    this._tags = val;
    this.mappedTags = val.map(t => t.name);
  }
  public get tags(): Tag[] {
    return this._tags;
  }

  constructor(
    private _recipeService: RecipeService,
    private _tagService: TagService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loadAllTags();
  }

  public async handleSubmit(ev: Event): Promise<void> {
    console.log(this.selectedTags);
    await this._recipeService.createRecipe(this.recipeName, this.recipeShortDescription, this.recipeLongDescription, this.selectedTags)
     .then(res => res.subscribe({
       next: data => console.log(data),
       error: err => console.error(err)
     }));
    this._clearForm();
    this.closeWindow.emit(true);
  }

  public handleMultiSelectEmitter(tags: boolean[]) {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i]) {
        this.selectedTags.add(this.tags[i].id);
      }
    }
  }

  public closeWindowPresed(): void {
    this.closeWindow.emit(true);
  }

  private _clearForm(): void {
    this.recipeName = '';
    this.recipeShortDescription = '';
    this.recipeLongDescription = '';
  }

  private async _loadAllTags(): Promise<void> {
    await this._tagService.getAllTags()
      .then(res => res.subscribe({
        next: tags => this.tags = tags,
        error: err => console.error(err)
      }));
  }
}
