import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllProductTypeComponent} from "./all-product-type/all-product-type.component";
import {AddProductTypeComponent} from "./add-product-type/add-product-type.component";

const routes: Routes = [
  {path: 'all-product-type', component: AllProductTypeComponent},
  {path: 'add-product-type', component: AddProductTypeComponent},
  {path: 'edit-product-type/:id', component: AddProductTypeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTypeRoutingModule { }
