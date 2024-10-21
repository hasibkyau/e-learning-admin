import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OfferRoutingModule} from './offer-routing.module';
import {AddCouponComponent} from './coupon/add-coupon/add-coupon.component';
import {AllCouponComponent} from './coupon/all-coupon/all-coupon.component';

import {FormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {NgxPaginationModule} from 'ngx-pagination';
import {MaterialModule} from 'src/app/material/material.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {QuillModule} from 'ngx-quill';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {MatSelectFilterModule} from "mat-select-filter";

@NgModule({
  declarations: [
    AddCouponComponent,
    AllCouponComponent,
  ],
    imports: [
        CommonModule,
        OfferRoutingModule,

        NgxDropzoneModule,
        FormsModule,
        NgxPaginationModule,
        MaterialModule,
        DirectivesModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        QuillModule,
        PipesModule,
        MatSelectFilterModule
    ]
})
export class OfferModule { }
