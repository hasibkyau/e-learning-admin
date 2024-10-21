import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { AllNoticeComponent } from './all-notice/all-notice.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxPaginationModule} from "ngx-pagination";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {NgxSpinnerModule} from "ngx-spinner";
import {QuillModule} from "ngx-quill";


@NgModule({
  declarations: [
    AddNoticeComponent,
    AllNoticeComponent
  ],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxSpinnerModule,
    QuillModule
  ]
})
export class NoticeModule { }
