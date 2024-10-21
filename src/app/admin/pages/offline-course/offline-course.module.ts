import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineCourseRoutingModule } from './offline-course-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
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
    AddCourseComponent,
    AllCourseComponent
  ],
  imports: [
    CommonModule,
    OfflineCourseRoutingModule,
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
export class OfflineCourseModule { }
