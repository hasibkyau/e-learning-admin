import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { defaultUploadImage } from 'src/app/core/utils/app-data';
import { Carousel } from 'src/app/interfaces/common/carousel.interface';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { CarouselService } from 'src/app/services/common/carousel.service';
import { UiService } from 'src/app/services/core/ui.service';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.scss']
})
export class AddCarouselComponent implements OnInit {
/// Data Form
@ViewChild('formElement') formElement: NgForm;
dataForm?: FormGroup;

// Store Data
id?: string;
carousel?: Carousel;
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
  private carouselService: CarouselService,
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
      this.getCarouselById();
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
    image: [null],
    type: [null,Validators.required],
    url:[null],
    urlType:[null],
    status: ['publish'],
    priority: [null],
  });
}

private setFormValue() {
  this.dataForm.patchValue(this.carousel);
  if (this.carousel && this.carousel.image) {
    this.pickedImage = this.carousel.image;
  }
}

onSubmit() {
  if (this.dataForm.invalid) {
    this.uiService.warn('Please filed all the required field');
    return;
  }
  if (!this.carousel) {
    this.addCarousel()
  } else {
    this.updateCarouselById()
  }
}

/**
 * HTTP REQ HANDLE
 * getCarouselById()
 * addCarousel()
 * updateCarouselById()
 * removeSingleFile()
 */

private getCarouselById() {
  this.spinnerService.show();
  this.subDataOne = this.carouselService.getCarouselById(this.id).subscribe({
    next: (res) => {
      this.spinnerService.hide();
      if (res.data) {
        this.carousel = res.data;
        this.setFormValue();
      }
    },
    error: (error) => {
      this.spinnerService.hide();
      console.log(error);
    },
  });
}

private addCarousel() {
  this.spinnerService.show();
  this.isLoading = true;
  this.subDataTwo = this.carouselService
    .addCarousel(this.dataForm.value)
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

private updateCarouselById() {
  this.spinnerService.show();
  this.isLoading = true;
  this.subDataThree = this.carouselService
    .updateCarouselById(this.carousel._id, this.dataForm.value)
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
