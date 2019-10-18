import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageComponent } from './image/image.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinableDirective } from './spinable.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    SpinnerComponent,
    SpinableDirective,
    SpinableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [SpinnerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
