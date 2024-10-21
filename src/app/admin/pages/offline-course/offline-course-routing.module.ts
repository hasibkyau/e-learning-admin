import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllCourseComponent} from "./all-course/all-course.component";
import {AddCourseComponent} from "./add-course/add-course.component";

const routes: Routes = [
  {path: '', redirectTo: 'all-offline-course'},
  {path: 'all-offline-course', component:AllCourseComponent},
  {path: 'add-offline-course', component: AddCourseComponent},
  {path: 'edit-offline-course/:id', component: AddCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineCourseRoutingModule { }
