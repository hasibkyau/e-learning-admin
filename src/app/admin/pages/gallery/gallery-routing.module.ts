import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllFoldersComponent} from './folder/all-folders/all-folders.component';
import {AllImagesComponent} from './images/all-images/all-images.component';
import {AllVideosComponent} from './videos/all-videos/all-videos.component';
import {AllFileComponent} from "./file/all-file/all-file.component";

const routes: Routes = [
  {path: '', redirectTo: 'all-folders'},
  {path: 'all-folders', component: AllFoldersComponent},
  {path: 'all-images', component: AllImagesComponent},
  {path: 'all-videos', component: AllVideosComponent},
  {path: 'all-file', component: AllFileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
