import { Component } from '@angular/core';
import { StandardFilterService } from '../common/standard-filter.service';

@Component({
  selector: 'standard-filter',
  template: '',
  styles: [``]
})
export class StandardFilterComponent {
  constructor(private readonly filterService: StandardFilterService) {
    console.log(this.filterService.getFilters());
  }
}
