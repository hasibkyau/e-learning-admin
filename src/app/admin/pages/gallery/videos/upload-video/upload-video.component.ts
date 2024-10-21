import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileFolder} from '../../../../../interfaces/gallery/file-folder.interface';
import {FileUploadService} from '../../../../../services/gallery/file-upload.service';
import {GalleryService} from '../../../../../services/gallery/gallery.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {ReloadService} from '../../../../../services/core/reload.service';
import {UiService} from '../../../../../services/core/ui.service';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {FileTypes} from '../../../../../enum/file-types.enum';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError, map} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  // in app.component.ts
  files: File[] = [];
  folders: FileFolder[] = [];
  selectedFolder: string = 'Default';
  quality: string = null;
  width: string = null;
  height: string = null;

  progress: number = null;


  constructor(
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<UploadVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileFolder[],
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.folders = this.data;
    }
  }

  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  /**
   * ON IMAGE UPLOAD
   */
  onUploadImages() {
    if (!this.selectedFolder) {
      this.uiService.warn('No Folder name found!');
      return;
    }
    if (!this.files || this.files.length <= 0) {
      this.uiService.warn('No Video selected!');
      return;
    }
    this.spinnerService.show();

    this.progress = 0;

    this.fileUploadService.uploadSingleVideo(this.files[0])
      .subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            const res = event.body;
            this.progress = null;
            if (res) {
              const data: Gallery = {
                url: res.url,
                name: res.name,
                size: res.size,
                folder: this.selectedFolder,
                type: FileTypes.VIDEO
              }
              this.addGallery(data);
            }
        }

      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * HTTP REQ HANDLE
   */

  private addGallery(data: Gallery) {
    this.galleryService.addGallery(data)
      .subscribe(res => {
        this.spinnerService.hide();
        this.reloadService.needRefreshData$();
        this.dialogRef.close();
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }


  onClearFile(event: MouseEvent) {
    event.stopPropagation();
    this.files = [];
  }
}
