import {AddCouponComponent} from './coupon/add-coupon/add-coupon.component';
import {AllCouponComponent} from './coupon/all-coupon/all-coupon.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  { path: 'all-coupon', component: AllCouponComponent },
  { path: 'add-coupon', component: AddCouponComponent },
  { path: 'edit-coupon/:id', component: AddCouponComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
