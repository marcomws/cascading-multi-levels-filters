import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StandardFilterModule } from './standard-filter/standard-filter.module';

@NgModule({
  imports: [BrowserModule, FormsModule, StandardFilterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
