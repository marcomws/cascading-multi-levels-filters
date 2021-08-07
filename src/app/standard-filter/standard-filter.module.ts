import { NgModule } from '@angular/core';
import { StandardFilterComponent } from './standard-filter.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [ModalModule.forRoot()],
  declarations: [StandardFilterComponent],
  exports: [StandardFilterComponent],
  bootstrap: [StandardFilterComponent]
})
export class StandardFilterModule {}
