import  {Component, Input, OnInit } from '@angular/core';
import { TagService } from "../../services/tag.service";
import { Tag } from '../../types/tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.less']
})
export class TagListComponent implements OnInit {
  @Input() public recipeId!: number;
  public tags!: Tag[];

  constructor(
    private _tagService: TagService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._getTags();
  }

  private async _getTags(): Promise<void> {
    await this._tagService.getTagsByRecipeId(this.recipeId)
      .then(res => res.subscribe({
        next: tags => this.tags = tags,
        error: err => console.error(err),
      }));
  }
}
