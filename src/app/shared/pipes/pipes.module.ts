import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafeHtmlCustomPipe} from './safe-html.pipe';
import {SortPipe} from './sort.pipe';
import {NumberMinDigitPipe} from './number-min-digit.pipe';
import {SlugToNormalPipe} from './slug-to-normal.pipe';
import {ArrayStringPipe} from './array-string.pipe';
import {TextWrapPipe} from './text-wrap.pipe';
import {FormatBytesPipe} from './format-bytes.pipe';
import {MomentDatePipe} from './moment-date.pipe';
import {CharacterCountPipe} from './character-count.pipe';
import {CheckNullPipe} from './check-null.pipe';
import {SecToTimePipe} from './sec-to-time.pipe';
import {BnDatePipe} from './bn-date.pipe';
import {PricePipe} from './price.pipe';
import {ProductDiscountViewPipe} from './product-discount-view.pipe';
import {StringToSlugPipe} from "./string-to-slug.pipe";
import {PricesPipe} from "./prices.pipe";
import {OrderStatusPipe} from "./order-status.pipe";


@NgModule({
  declarations: [
    SafeHtmlCustomPipe,
    SortPipe,
    NumberMinDigitPipe,
    SlugToNormalPipe,
    ArrayStringPipe,
    TextWrapPipe,
    CheckNullPipe,
    FormatBytesPipe,
    MomentDatePipe,
    CharacterCountPipe,
    SecToTimePipe,
    BnDatePipe,
    PricePipe,
    ProductDiscountViewPipe,
    StringToSlugPipe,
    PricesPipe,
    OrderStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlCustomPipe,
    SortPipe,
    NumberMinDigitPipe,
    SlugToNormalPipe,
    TextWrapPipe,
    CheckNullPipe,
    FormatBytesPipe,
    MomentDatePipe,
    CharacterCountPipe,
    ArrayStringPipe,
    SecToTimePipe,
    BnDatePipe,
    PricePipe,
    ProductDiscountViewPipe,
    StringToSlugPipe,
    PricesPipe,
    OrderStatusPipe
  ]
})
export class PipesModule {
}
