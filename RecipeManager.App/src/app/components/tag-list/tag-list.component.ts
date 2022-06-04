import  {Component, Input } from '@angular/core';
import { Tag } from '../../types/tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.less']
})
export class TagListComponent {
  @Input() public tags!: Tag[];
  constructor( ) { }
}
