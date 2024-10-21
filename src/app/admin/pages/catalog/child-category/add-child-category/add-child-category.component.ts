import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { defaultUploadImage } from 'src/app/core/utils/app-data';
import { ChildCategory } from 'src/app/interfaces/common/child-category.interface';
import { Category } from 'src/app/interfaces/common/course-category.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { ChildCategoryService } from 'src/app/services/common/child-category.service';
import { CategoryService } from 'src/app/services/common/course-category.service';
import { UiService } from 'src/app/services/core/ui.service';
import { AllImagesDialogComponent } from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import { SubCategory } from 'src/app/interfaces/common/sub-category.interface';
import { SubCategoryService } from 'src/app/services/common/sub-category.service';
import {StringToSlugPipe} from "../../../../../shared/pipes/string-to-slug.pipe";

@Component({
  selector: 'app-add-child-category',
  templateUrl: './add-child-category.component.html',
  styleUrls: ['./add-child-category.component.scss'],
  providers: [StringToSlugPipe]
})
export class AddChildCategoryComponent implements OnInit {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  childCategory?: ChildCategory;
  category: any[] = [];
  subCategory: SubCategory[] = [];
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
    private childCategoryService: ChildCategoryService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private subCategoryService:SubCategoryService,
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
        this.getChildCategoryById();
      }
    });

    // Auto Slug
    this.autoGenerateSlug();
    this.getAllCategory();
    this.getAllSubCategory();
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
      subCategory: [null, Validators.required],
      status: ['publish'],
      priority: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.childCategory);
    if (this.childCategory.category) {
      this.dataForm.patchValue({
        category: this.childCategory.category._id,
        subCategory: this.childCategory.subCategory._id
      })
    }
  }

  onSubmit() {
    let selectedCategory = this.category.find((c: Category) => c._id === this.dataForm.value.category);
    let selectedSubCategory = this.subCategory.find((sc: SubCategory) => sc._id === this.dataForm.value.subCategory);
    let mData = {
      ...this.dataForm.value,
      category: {
        _id: selectedCategory?._id,
        name: selectedCategory?.name,
        slug: selectedCategory?.slug
      },
      subCategory: {
        _id: selectedSubCategory?._id,
        name: selectedSubCategory?.name,
        slug: selectedSubCategory?.slug
      }
    }

    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (!this.childCategory) {
      this.addChildCategory(mData)
    } else {
      this.updateChildCategoryById(mData)
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllCategory()
   * getAllSubCategory()
   * getChildCategoryById()
   * addChildCategory()
   * updateChildCategoryById()
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
            this.category = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllSubCategory() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.subCategoryService
      .getAllSubCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.subCategory = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getChildCategoryById() {
    this.spinnerService.show();
    this.subDataOne = this.childCategoryService
      .getChildCategoryById(this.id)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.data) {
            this.childCategory = res.data;
            if(this.childCategory && this.childCategory.image){
                 this.pickedImage = this.childCategory.image;
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

  private addChildCategory(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataTwo = this.childCategoryService
      .addChildCategory(data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.dataForm.patchValue({ status: 'publish', type: 'course' });
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

  private updateChildCategoryById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.childCategoryService
      .updateChildCategoryById(this.childCategory._id, data)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {

            this.uiService.success(res.message);
            this.isLoading  = false;
          } else {
            this.uiService.warn(res.message);
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
          this.isLoading  = false;
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


