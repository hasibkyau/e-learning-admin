import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCourseComponent} from './all-course/all-course.component';
import {AddCourseComponent} from './add-course/add-course.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-course'},
  {path: 'all-course', component: AllCourseComponent},
  {path: 'add-course', component: AddCourseComponent},
  {path: 'edit-course/:id', component: AddCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {
}
