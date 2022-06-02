import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TagService } from "../../services/tag.service";
import { Tag } from "../../types/tag";

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.less']
})
export class TagFilterComponent implements OnInit {
  @Output() public selectedFilter = new EventEmitter<number>();
  public tags!: Tag[];
  public NO_FILTER: number = -1;
  public selectedId: number = this.NO_FILTER;

  constructor(
    private _tagService: TagService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._loadTags();
  }

  public updateFilter(ev: Event): void {
    this.selectedFilter.emit(this.selectedId);
  }

  private async _loadTags(): Promise<void> {
    await this._tagService.getAllTags()
      .then(res => res.subscribe({
        next: tags => this.tags = tags,
        error: err => console.error(err)
      }));
  }
}
