import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductReviewRoutingModule} from './product-review-routing.module';
import {ProductReviewComponent} from './product-review.component';
import {ReplyReviewComponent} from "./reply-review/reply-review.component";
import {FlexModule} from "@angular/flex-layout";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";


@NgModule({
  declarations: [
    ProductReviewComponent,
    ReplyReviewComponent
  ],
  imports: [
    CommonModule,
    ProductReviewRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class ProductReviewModule {
}
