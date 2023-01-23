import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NameDetailComponent } from './name-detail/name-detail.component';
import { NameListComponent } from './name-list/name-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'name-list', pathMatch: 'full' },
  { path: '', component: NameListComponent },
  { path: 'name-detail/:id', component: NameDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
