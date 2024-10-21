import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseRoutingModule} from './course-routing.module';
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
import {AllCourseComponent} from './all-course/all-course.component';
import {AddCourseComponent} from './add-course/add-course.component';
import { QuillModule } from 'ngx-quill';
import {MatSelectFilterModule} from "mat-select-filter";
@NgModule({
  declarations: [
    AllCourseComponent,
    AddCourseComponent,
  ],
    imports: [
        CommonModule,
        CourseRoutingModule,
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
        QuillModule,
        MatSelectFilterModule,
    ]
})
export class CourseModule {
}
