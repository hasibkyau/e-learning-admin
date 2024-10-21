import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopInformationComponent} from './shop-information/shop-information.component';
import {AllBannerComponent} from './banner/all-banner/all-banner.component';
import {AddBannerComponent} from './banner/add-banner/add-banner.component';
import {AllCarouselComponent} from './carousel/all-carousel/all-carousel.component';
import {AddCarouselComponent} from './carousel/add-carousel/add-carousel.component';
import {AllPopupComponent} from './popup/all-popup/all-popup.component';
import {AddPopupComponent} from './popup/add-popup/add-popup.component';
import {AllFaqComponent} from "./faq/all-faq/all-faq.component";
import {AddFaqComponent} from "./faq/add-faq/add-faq.component";
import {AllLinkShortenerComponent} from './link-shortener/all-link-shortener/all-link-shortener.component';
import {AddLinkShortenerComponent} from './link-shortener/add-link-shortener/add-link-shortener.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-categories'},
  {path: 'shop-information', component: ShopInformationComponent},
  {path: 'all-banner', component: AllBannerComponent},
  {path: 'add-banner', component: AddBannerComponent},
  {path: 'edit-banner/:id', component: AddBannerComponent},
  {path: 'all-popup', component: AllPopupComponent},
  {path: 'add-popup', component: AddPopupComponent},
  {path: 'edit-popup/:id', component: AddPopupComponent},
  {path: 'all-carousel', component: AllCarouselComponent},
  {path: 'add-carousel', component: AddCarouselComponent},
  {path: 'edit-carousel/:id', component: AddCarouselComponent},
  {path: 'all-faq', component: AllFaqComponent},
  {path: 'add-faq', component: AddFaqComponent},
  {path: 'edit-faq/:id', component: AddFaqComponent},
  {path: 'all-link-shortener', component: AllLinkShortenerComponent},
  {path: 'add-link-shortener', component: AddLinkShortenerComponent},
  {path: 'edit-link-shortener/:id', component: AddLinkShortenerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizationRoutingModule {
}
