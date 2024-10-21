import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrderComponent } from './all-order/all-order.component';
import {AddOrderComponent} from './add-order/add-order.component';

const routes: Routes = [
  {path: 'all-order', component: AllOrderComponent},
  {path: 'add-order', component: AddOrderComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
