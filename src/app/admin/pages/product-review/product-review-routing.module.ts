import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReplyReviewComponent} from "./reply-review/reply-review.component";
import {ProductReviewComponent} from "./product-review.component";

const routes: Routes = [
  {path: '', component: ProductReviewComponent},
  {path: 'reply-review/:id', component: ReplyReviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReviewRoutingModule { }
