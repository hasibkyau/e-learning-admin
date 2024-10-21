import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AllProductComponent } from './all-product/all-product.component';
import { AddProductComponent } from './add-product/add-product.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DigitOnlyModule } from '@uiowa/digit-only';

import {QuillEditorComponent} from "ngx-quill";
import {MatSelectFilterModule} from "mat-select-filter";
import {DirectivesModule} from "../../../shared/directives/directives.module";
@NgModule({
    declarations: [
        AllProductComponent,
        AddProductComponent
    ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    PipesModule,
    FlexLayoutModule,
    DigitOnlyModule,
    MatSelectFilterModule,
    QuillEditorComponent,
  ]
})
export class ProductModule { }
