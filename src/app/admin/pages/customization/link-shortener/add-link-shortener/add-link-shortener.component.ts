import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Clipboard} from '@angular/cdk/clipboard';
import {Subscription} from 'rxjs';
import {defaultUploadImage} from 'src/app/core/utils/app-data';
import {Gallery} from 'src/app/interfaces/gallery/gallery.interface';
import {UiService} from 'src/app/services/core/ui.service';
import {AllImagesDialogComponent} from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {LinkShortenerService} from '../../../../../services/common/link-shortener.service';
import {LinkShortener} from '../../../../../interfaces/common/link-shortener.interface';

@Component({
  selector: 'app-add-link-shortener',
  templateUrl: './add-link-shortener.component.html',
  styleUrls: ['./add-link-shortener.component.scss']
})
export class AddLinkShortenerComponent implements OnInit {

/// Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

// Store Data
  id?: string;
  linkShortener?: LinkShortener;
  autoSlug = true;
  isLoading = false;


// Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;


// Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private linkShortenerService: LinkShortenerService,
    private dialog: MatDialog,
    private clipboard: Clipboard
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getLinkShortenerById();
      }
    });
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      url: [null, Validators.required],
      slug: [null],
      shortUrl: [null],
      websiteUrl: ['https://test.com.bd/'],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.linkShortener);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    const mData = {
      ...this.dataForm.value,
      ...{
        shortUrl: `${this.dataForm.value.websiteUrl}${this.dataForm.value.slug}`
      }
    }
    if (!this.linkShortener) {
      this.addLinkShortener(mData)
    } else {
      this.updateLinkShortenerById(mData)
    }
  }

  /**
   * HTTP REQ HANDLE
   * getLinkShortenerById()
   * addLinkShortener()
   * updateLinkShortenerById()
   * removeSingleFile()
   */

  private getLinkShortenerById() {
    this.spinnerService.show();
    this.subDataOne = this.linkShortenerService.getLinkShortenerById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.linkShortener = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addLinkShortener(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataTwo = this.linkShortenerService
      .addLinkShortener(data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.clipboard.copy(data.shortUrl);
            this.formElement.resetForm();
            this.isLoading = false;

          } else {
            this.uiService.warn(res.message);
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  private updateLinkShortenerById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.linkShortenerService
      .updateLinkShortenerById(this.linkShortener._id, data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.clipboard.copy(data.shortUrl);
            this.isLoading = false;
          } else {
            this.uiService.warn(res.message);
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
          this.isLoading = false;
        },
      });
  }


  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog(type: 'image' | 'mobileImage') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          if (type === 'mobileImage') {
            this.dataForm.patchValue({mobileImage: image.url});
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({image: image.url});
            this.pickedImage = image.url;
          }
        }
      }
    });
  }


  /**
   * ON DESTROY
   * ngOnDestroy()
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }
}
