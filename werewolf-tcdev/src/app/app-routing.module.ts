import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { HomeComponent } from './home/home.component';
import { SelectRandomComponent } from './select-random/select-random.component';

const routes: Routes = [
  {
    path: 'character/:slug',
    component: CharacterComponent,
  },
  {
    path: 'select-random',
    component: SelectRandomComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
