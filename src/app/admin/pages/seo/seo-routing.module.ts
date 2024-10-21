import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSeoComponent} from './all-seo/all-seo.component';
import {AddSeoComponent} from './add-seo/add-seo.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-seo'},

  {path: 'all-seo', component: AllSeoComponent},
  {path: 'add-seo', component: AddSeoComponent},
  {path: 'edit-seo/:id', component: AddSeoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeoRoutingModule {
}
