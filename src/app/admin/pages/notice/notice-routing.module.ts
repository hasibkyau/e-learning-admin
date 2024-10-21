import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllNoticeComponent} from "../notice/all-notice/all-notice.component";
import {AddNoticeComponent} from "../notice/add-notice/add-notice.component";

const routes: Routes = [
  {path: 'all-notice', component:AllNoticeComponent},
  {path: 'add-notice', component: AddNoticeComponent},
  {path: 'edit-notice/:id', component: AddNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
