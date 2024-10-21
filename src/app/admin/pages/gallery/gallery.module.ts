import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {AllFoldersComponent} from './folder/all-folders/all-folders.component';
import {AddFolderComponent} from './folder/add-folder/add-folder.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {SwiperModule} from 'swiper/angular';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AllVideosDialogComponent} from './videos/all-videos-dialog/all-videos-dialog.component';
import {AllImagesDialogComponent} from './images/all-images-dialog/all-images-dialog.component';
import {AllImagesComponent} from './images/all-images/all-images.component';
import {UploadVideoComponent} from './videos/upload-video/upload-video.component';
import {UploadImageComponent} from './images/upload-image/upload-image.component';
import {AllVideosComponent} from './videos/all-videos/all-videos.component';
import {EditGalleryInfoComponent} from './edit-gallery-info/edit-gallery-info.component';
import { AllFileComponent } from './file/all-file/all-file.component';
import { UploadFileComponent } from './file/upload-file/upload-file.component';
import { AllFileDialogComponent } from './file/all-file-dialog/all-file-dialog.component';
import {SafeUrlPipe} from "../../../shared/pipes/safe-url.pipe";


@NgModule({
    declarations: [
        AllFoldersComponent,
        AddFolderComponent,
        EditGalleryInfoComponent,
        AllVideosComponent,
        AllImagesComponent,
        UploadImageComponent,
        AllImagesDialogComponent,
        UploadVideoComponent,
        AllVideosDialogComponent,
        AllFileComponent,
        UploadFileComponent,
        AllFileDialogComponent,
        SafeUrlPipe,
    ],
    exports: [
        SafeUrlPipe
    ],
    imports: [
        CommonModule,
        GalleryRoutingModule,
        FormsModule,
        MaterialModule,
        NgxPaginationModule,
        PipesModule,
        FlexLayoutModule,
        DirectivesModule,
        DigitOnlyModule,
        NgxDropzoneModule,
        SwiperModule,
        MatProgressBarModule
    ]
})
export class GalleryModule {
}
