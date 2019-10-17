import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFreshChatModule } from 'ngx-freshchat-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFreshChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
