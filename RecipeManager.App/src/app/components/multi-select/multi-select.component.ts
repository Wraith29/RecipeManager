import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.less']
})
export class MultiSelectComponent<T> implements OnInit {
  @Input() public set options(val: T[]) {
    if (val === undefined) return;
    this._options = val;
    this.selectedOptions = new Array<boolean>(val.length).fill(false, 0, val.length);
  }
  public get options(): T[] {
    return this._options;
  }

  @Output() public multiSelectEmitter = new EventEmitter<boolean[]>();

  private _options!: T[];
  public selectedOptions!: boolean[];
  
  constructor() { }
  ngOnInit(): void {}

  public select(ev: Event) {
    this.multiSelectEmitter.emit(this.selectedOptions);
  }
}
