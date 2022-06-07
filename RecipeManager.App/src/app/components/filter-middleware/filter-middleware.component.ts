import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-middleware',
  templateUrl: './filter-middleware.component.html',
  styleUrls: ['./filter-middleware.component.less']
})
export class FilterMiddlewareComponent implements OnInit {
  public currentFilter!: number;

  constructor() { }

  ngOnInit(): void { }

  public catchFilterId(tagId: number): void {
    this.currentFilter = tagId;
  }
}
