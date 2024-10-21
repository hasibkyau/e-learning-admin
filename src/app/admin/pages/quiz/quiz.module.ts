import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AllQuizComponent } from './all-quiz/all-quiz.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxPaginationModule} from "ngx-pagination";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {NgxSpinnerModule} from "ngx-spinner";
import {QuillModule} from "ngx-quill";
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { ManualQuizComponent } from './manual-quiz/manual-quiz.component';
import { ManualQuizViewComponent } from './manual-quiz-view/manual-quiz-view.component';
import {GalleryComponent} from "./gallery/gallery.component";


@NgModule({
  declarations: [
    AddQuizComponent,
    AllQuizComponent,
    QuizResultComponent,
    ManualQuizComponent,
    ManualQuizViewComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxSpinnerModule,
    QuillModule,
  ]
})
export class QuizModule { }
