import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { HomeComponent } from './home/home.component';
import { SelectRandomComponent } from './select-random/select-random.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    HomeComponent,
    SelectRandomComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
