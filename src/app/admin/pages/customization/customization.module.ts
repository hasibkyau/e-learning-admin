import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizationRoutingModule } from './customization-routing.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { AllBannerComponent } from './banner/all-banner/all-banner.component';
import { AddCarouselComponent } from './carousel/add-carousel/add-carousel.component';
import { AllCarouselComponent } from './carousel/all-carousel/all-carousel.component';
import { AddPopupComponent } from './popup/add-popup/add-popup.component';
import { AllPopupComponent } from './popup/all-popup/all-popup.component';
import { AddFaqComponent } from './faq/add-faq/add-faq.component';
import { AllFaqComponent } from './faq/all-faq/all-faq.component';
import {QuillModule} from "ngx-quill";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {AddLinkShortenerComponent} from './link-shortener/add-link-shortener/add-link-shortener.component';
import {AllLinkShortenerComponent} from './link-shortener/all-link-shortener/all-link-shortener.component';


@NgModule({
  declarations: [
    ShopInformationComponent,
    AddBannerComponent,
    AllBannerComponent,
    AddCarouselComponent,
    AllCarouselComponent,
    AddPopupComponent,
    AllPopupComponent,
    AddFaqComponent,
    AllFaqComponent,
    AddLinkShortenerComponent,
    AllLinkShortenerComponent,
  ],
  imports: [
    CommonModule,
    CustomizationRoutingModule,
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
export class CustomizationModule { }
