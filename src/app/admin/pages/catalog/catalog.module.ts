import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {CatalogRoutingModule} from './catalog-routing.module';
import {AllTagsComponent} from './tag/all-tags/all-tags.component';
import {AddTagComponent} from './tag/add-tag/add-tag.component';

import {AllTechnologyComponent} from './technology/all-technology/all-technology.component';
import {AddTechnologyComponent} from './technology/add-technology/add-technology.component';
import { AllCategoryComponent } from './category/all-category/all-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AllSubCategoryComponent } from './sub-category/all-sub-category/all-sub-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AllUnitComponent } from './unit/all-unit/all-unit.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { AddInstructorComponent } from './instructor/add-instructor/add-instructor.component';
import { AllInstructorComponent } from './instructor/all-instructor/all-instructor.component';
import { AddChildCategoryComponent } from './child-category/add-child-category/add-child-category.component';
import { AllChildCategoryComponent } from './child-category/all-child-category/all-child-category.component';
import { AddProductCategoryComponent } from './product-category/add-product-category/add-product-category.component';
import { AllProductCategoryComponent } from './product-category/all-product-category/all-product-category.component';

@NgModule({
  declarations: [
    AllTagsComponent,
    AddTagComponent,
    AllCategoryComponent,
    AddCategoryComponent,
    AllTechnologyComponent,
    AddTechnologyComponent,
    AllSubCategoryComponent,
    AddSubCategoryComponent,
    AllUnitComponent,
    AddUnitComponent,
    AddInstructorComponent,
    AllInstructorComponent,
    AddChildCategoryComponent,
    AllChildCategoryComponent,
    AddProductCategoryComponent,
    AllProductCategoryComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxSpinnerModule
  ]
})
export class CatalogModule { }
