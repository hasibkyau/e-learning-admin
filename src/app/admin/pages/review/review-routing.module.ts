import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllReviewComponent} from './all-review/all-review.component';
import {AddReviewComponent} from './add-review/add-review.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-review'},

  {path: 'all-review', component: AllReviewComponent},
  {path: 'add-review', component: AddReviewComponent},
  {path: 'edit-review/:id', component: AddReviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {
}
