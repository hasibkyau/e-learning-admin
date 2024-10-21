import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTypeRoutingModule } from './product-type-routing.module';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { AllProductTypeComponent } from './all-product-type/all-product-type.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxPaginationModule} from "ngx-pagination";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {QuillModule} from "ngx-quill";
import {ClipboardModule} from "@angular/cdk/clipboard";


@NgModule({
  declarations: [
    AddProductTypeComponent,
    AllProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    QuillModule,
    ClipboardModule,
  ]
})
export class ProductTypeModule { }
