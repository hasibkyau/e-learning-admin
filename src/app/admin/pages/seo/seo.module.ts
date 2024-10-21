import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SeoRoutingModule} from './seo-routing.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {GalleryModule} from '../gallery/gallery.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {AllSeoComponent} from './all-seo/all-seo.component';
import {AddSeoComponent} from './add-seo/add-seo.component';


@NgModule({
  declarations: [
    AllSeoComponent,
    AddSeoComponent,
  ],
  imports: [
    CommonModule,
    SeoRoutingModule,
    GalleryModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ClipboardModule,
  ]
})
export class SeoModule {
}
