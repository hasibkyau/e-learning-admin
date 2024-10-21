import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllTagsComponent} from './tag/all-tags/all-tags.component';
import {AddTagComponent} from './tag/add-tag/add-tag.component';
import {AllTechnologyComponent} from './technology/all-technology/all-technology.component';
import {AddTechnologyComponent} from './technology/add-technology/add-technology.component';
import { AllCategoryComponent } from './category/all-category/all-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AllSubCategoryComponent } from './sub-category/all-sub-category/all-sub-category.component';
import { AllUnitComponent } from './unit/all-unit/all-unit.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { AllInstructorComponent } from './instructor/all-instructor/all-instructor.component';
import { AddInstructorComponent } from './instructor/add-instructor/add-instructor.component';
import { AllChildCategoryComponent } from './child-category/all-child-category/all-child-category.component';
import { AddChildCategoryComponent } from './child-category/add-child-category/add-child-category.component';
import {AllProductComponent} from "../product/all-product/all-product.component";
import {AddProductComponent} from "../product/add-product/add-product.component";
import {AllProductCategoryComponent} from "./product-category/all-product-category/all-product-category.component";
import {AddProductCategoryComponent} from "./product-category/add-product-category/add-product-category.component";

const routes: Routes = [
  {path: '', redirectTo: 'all-tags'},
  {path: 'all-category', component: AllCategoryComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'edit-category/:id', component: AddCategoryComponent},
  {path: 'all-subCategories', component: AllSubCategoryComponent},
  {path: 'add-subCategory', component: AddSubCategoryComponent},
  {path: 'edit-subCategory/:id', component: AddSubCategoryComponent},

  {path: 'all-child-category', component: AllChildCategoryComponent},
  {path: 'add-child-category', component: AddChildCategoryComponent},
  {path: 'edit-child-category/:id', component: AddChildCategoryComponent},

  {path: 'all-tags', component: AllTagsComponent},
  {path: 'add-tag', component: AddTagComponent},
  {path: 'edit-tag/:id', component: AddTagComponent},

  {path: 'all-technology', component: AllTechnologyComponent},
  {path: 'add-technology', component: AddTechnologyComponent},
  {path: 'edit-technology/:id', component: AddTechnologyComponent},
  {path: 'all-unit', component: AllUnitComponent},
  {path: 'add-unit', component: AddUnitComponent},
  {path: 'edit-unit/:id', component: AddUnitComponent},
  {path: 'all-instructor', component: AllInstructorComponent},
  {path: 'add-instructor', component: AddInstructorComponent},
  {path: 'edit-instructor/:id', component: AddInstructorComponent},

  {path: 'all-product-category', component: AllProductCategoryComponent},
  {path: 'add-product-category', component: AddProductCategoryComponent},
  {path: 'edit-product-category/:id', component: AddProductCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
