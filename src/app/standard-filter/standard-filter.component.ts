import { Component } from '@angular/core';
import { ItemSelectionValues } from '../common/models';

@Component({
  selector: 'standard-filter',
  template: '',
  styles: [``]
})
export class StandardFilterComponent {
  bbb: ItemSelectionValues<string, string>;

  constructor() {
    this.bbb.ngClass = { classy: true };
  }
}
