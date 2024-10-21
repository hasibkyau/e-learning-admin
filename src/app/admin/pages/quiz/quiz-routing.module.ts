import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllQuizComponent} from "./all-quiz/all-quiz.component";
import {AddQuizComponent} from "./add-quiz/add-quiz.component";
import {QuizResultComponent} from './quiz-result/quiz-result.component';
import {ManualQuizComponent} from "./manual-quiz/manual-quiz.component";
import {ManualQuizViewComponent} from "./manual-quiz-view/manual-quiz-view.component";

const routes: Routes = [
  {path: 'all-quiz', component:AllQuizComponent},
  {path: 'all-quiz-result', component:QuizResultComponent},
  {path: 'manual-quiz-result', component:ManualQuizComponent},
  {path: 'manual-quiz-view/:id', component:ManualQuizViewComponent},
  {path: 'add-quiz', component: AddQuizComponent},
  {path: 'edit-quiz/:id', component: AddQuizComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
