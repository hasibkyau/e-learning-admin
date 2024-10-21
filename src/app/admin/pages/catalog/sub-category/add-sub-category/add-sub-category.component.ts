import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SubCategory } from 'src/app/interfaces/common/sub-category.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { CategoryService } from 'src/app/services/common/course-category.service';
import { SubCategoryService } from 'src/app/services/common/sub-category.service';
import { UiService } from 'src/app/services/core/ui.service';
import { Category } from 'src/app/interfaces/common/course-category.interface';
import { defaultUploadImage } from 'src/app/core/utils/app-data';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {StringToSlugPipe} from "../../../../../shared/pipes/string-to-slug.pipe";

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss'],
  providers: [StringToSlugPipe]
})
export class AddSubCategoryComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  subCategory?: SubCategory;
  categoryCount: any;
  subCategoryy: any[] = [];
  holdPrevData: any;
  filter: any;
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
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private stringToSlugPipe: StringToSlugPipe,
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getSubCategoryById();
      }
    });

    // Auto Slug
    this.autoGenerateSlug();
    this.getAllCategory();
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug: [null],
      image: [null],
      category: [null, Validators.required],
      status: ['publish'],
      priority: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.subCategory);
    if (this.subCategory.category) {
      this.dataForm.patchValue({
        category: this.subCategory.category._id
      })
    }
  }

  onSubmit() {
    let selectedCategory = this.subCategoryy.find((c: Category) => c._id === this.dataForm.value.category);
    let mData = {
      ...this.dataForm.value,
      category: {
        _id: selectedCategory?._id,
        name: selectedCategory?.name,
        slug: selectedCategory?.slug
      }
    }

    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (!this.subCategory) {
      this.addSubCategory(mData)
    } else {
      this.updateSubCategoryById(mData)
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllCategory()
   * getSubCategoryById()
   * addSubCategory()
   * updateSubCategoryById()
   */

  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      slug: 1,
      createdAt: 1,
      serial: 1,
      status: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.categoryService
      .getAllCourseCategories(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.subCategoryy = res.data;
            this.categoryCount = res.count;
            this.holdPrevData = this.subCategoryy;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getSubCategoryById() {
    this.spinnerService.show();
    this.subDataOne = this.subCategoryService
      .getSubCategoryById(this.id)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.data) {
            this.subCategory = res.data;

            if (this.subCategory && this.subCategory.image) {
              this.pickedImage = this.subCategory.image;
            }
            this.setFormValue();
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
        },
      });
  }

  private addSubCategory(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataTwo = this.subCategoryService
      .addSubCategory(data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.isLoading = false;

            this.formElement.resetForm();
            this.dataForm.patchValue({ status: 'publish', type: 'course' })


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

  private updateSubCategoryById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.subCategoryService
      .updateSubCategoryById(this.subCategory._id, data)
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
          const res = this.stringToSlugPipe.transform(d, '-')
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
      data: { type: 'single', count: 1 },
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
            this.dataForm.patchValue({ mobileImage: image.url });
            this.pickedMobileImage = image.url;
          } else {
            this.dataForm.patchValue({ image: image.url });
            this.pickedImage = image.url;
          }
        }
      }
    });
  }


  /**
   * ON DESTROY
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
