import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { defaultUploadImage } from 'src/app/core/utils/app-data';
import { Banner } from 'src/app/interfaces/common/banner.interface';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { BannerService } from 'src/app/services/common/banner.service';
import { UiService } from 'src/app/services/core/ui.service';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

/// Data Form
@ViewChild('formElement') formElement: NgForm;
dataForm?: FormGroup;

// Store Data
id?: string;
banner?: Banner;
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
  private bannerService: BannerService,
  private dialog: MatDialog,
) {
}

ngOnInit(): void {
  // Init Form
  this.initDataForm();

  // GET ID FORM PARAM
  this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
    this.id = param.get('id');

    if (this.id) {
      this.getBannerById();
    }
  });
  // Auto Slug
  this.autoGenerateSlug();
}

/**
 * FORM METHODS
 * initDataForm()
 * setFormValue()
 * onSubmit()
 */

private initDataForm() {
  this.dataForm = this.fb.group({
    name: [null,Validators.required],
    title: [null],
    title2: [null],
    image: [null],
    type: [null,Validators.required],
    url:[null],
    urlType:[null],
    status: ['publish'],
    priority: [null],
  });
}

private setFormValue() {
  this.dataForm.patchValue(this.banner);
  if (this.banner && this.banner.image) {
    this.pickedImage = this.banner.image;
  }
}

onSubmit() {
  if (this.dataForm.invalid) {
    this.uiService.warn('Please filed all the required field');
    return;
  }
  if (!this.banner) {
    this.addBanner()
  } else {
    this.updateBannerById()
  }
}

/**
 * HTTP REQ HANDLE
 * getBannerById()
 * addBanner()
 * updateBannerById()
 * removeSingleFile()
 */

private getBannerById() {
  this.spinnerService.show();
  this.subDataOne = this.bannerService.getBannerById(this.id).subscribe({
    next: (res) => {
      this.spinnerService.hide();
      if (res.data) {
        this.banner = res.data;
        this.setFormValue();
      }
    },
    error: (error) => {
      this.spinnerService.hide();
      console.log(error);
    },
  });
}

private addBanner() {
  this.spinnerService.show();
  this.isLoading = true;
  this.subDataTwo = this.bannerService
    .addBanner(this.dataForm.value)
    .subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
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

private updateBannerById() {
  this.spinnerService.show();
  this.isLoading = true;
  this.subDataThree = this.bannerService
    .updateBannerById(this.banner._id, this.dataForm.value)
    .subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
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
 * LOGICAL PART
 * autoGenerateSlug()
 */
autoGenerateSlug() {
  if (this.autoSlug === true) {
    this.subAutoSlug = this.dataForm.get('name').valueChanges
      .pipe(
        // debounceTime(200),
        // distinctUntilChanged()
      ).subscribe(d => {
        const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
        this.dataForm.patchValue({
          slug: res
        });
      });
  } else {
    if (!this.subAutoSlug) {
      return;
    }
    this.subAutoSlug?.unsubscribe();
  }
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
