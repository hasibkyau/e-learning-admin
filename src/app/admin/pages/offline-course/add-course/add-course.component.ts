import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {OfflineCourse} from "../../../../interfaces/common/offline-course.interface";
import {defaultUploadImage} from "../../../../core/utils/app-data";
import {Subscription} from "rxjs";
import {UiService} from "../../../../services/core/ui.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {OfflineCourseService} from "../../../../services/common/offline-course.service";
import {MatDialog} from "@angular/material/dialog";
import {AllImagesDialogComponent} from "../../gallery/images/all-images-dialog/all-images-dialog.component";
import {Gallery} from "../../../../interfaces/gallery/gallery.interface";
import {MatSelectChange} from "@angular/material/select";
import {CategoryService} from "../../../../services/common/course-category.service";
import {SubCategoryService} from "../../../../services/common/sub-category.service";
import {FilterData} from "../../../../interfaces/core/filter-data";
import {Category} from "../../../../interfaces/common/course-category.interface";
import {SubCategory} from "../../../../interfaces/common/sub-category.interface";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  modules:any = null;
/// Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  offlineCourse?: OfflineCourse;
  autoSlug = true;
  isLoading = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  // Image Picker
  pickedImage = defaultUploadImage;
  pickedBannerImage = defaultUploadImage;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private courseCategoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private offlineCourseService: OfflineCourseService,
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
        this.getOfflineCourseById();
      }
    });
    // Auto Slug
    this.autoGenerateSlug();
    this.getAllCourseCategories();
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null],
      slug: [null],
      image: [null],
      category: [null, Validators.required],
      subCategory: [null],
      bannerImage:[null],
      description: [null],
      shortDesc: [null],
      status: [null],
      priority: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.offlineCourse);
    if (this.offlineCourse && this.offlineCourse.image) {
      this.pickedImage = this.offlineCourse.image;
    }

    if (this.offlineCourse && this.offlineCourse.category) {
      this.dataForm.patchValue({
        category: this.offlineCourse.category._id
      });
      this.onSelectionChange({value: this.offlineCourse.category._id});
    }
    if (this.offlineCourse && this.offlineCourse.subCategory) {
      this.dataForm.patchValue({
        subCategory: this.offlineCourse.subCategory._id
      });

      // this.onSelectionChange2({value: this.offlineCourse.subCategory._id});
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    let mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: this.dataForm.value.category,
          name: this.categories.find(f => f._id === this.dataForm.value.category)?.name,
          slug: this.categories.find(f => f._id === this.dataForm.value.category)?.slug,
        },
      }
    };

    // If has Sub Category
    if (this.dataForm.value.subCategory) {
      mData = {
        ...mData, ...{
          subCategory: {
            _id: this.dataForm.value.subCategory,
            name: this.subCategories.find(f => f._id === this.dataForm.value.subCategory)?.name,
            slug: this.subCategories.find(f => f._id === this.dataForm.value.subCategory)?.slug,
          }
        }
      }
    }

    if (!this.offlineCourse) {
      this.addOfflineCourse(mData)
    } else {
      this.updateOfflineCourseById(mData)
    }
  }

  /**
   * HTTP REQ HANDLE
   * getOfflineCourseById()
   * addOfflineCourse()
   * updateOfflineCourseById()
   * removeSingleFile()
   */

  private getOfflineCourseById() {
    this.spinnerService.show();
    this.subDataOne = this.offlineCourseService.getOfflineCourseById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.offlineCourse = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addOfflineCourse(data:any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataTwo = this.offlineCourseService
      .addOfflineCourse(data)
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

  private updateOfflineCourseById(data:any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.offlineCourseService
      .updateOfflineCourseById(this.offlineCourse._id, data)
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

  public openGalleryDialog(type: 'image' | 'bannerImage') {
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
          if (type === 'bannerImage') {
            this.dataForm.patchValue({bannerImage: image.url});
            this.pickedBannerImage = image.url;
          } else {
            this.dataForm.patchValue({image: image.url});
            this.pickedImage = image.url;
          }
        }
      }
    });
  }

  private getAllCourseCategories() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    }

    // const ne = {readOnly: { $ne: true }}
    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }
    this.subDataFour = this.courseCategoryService.getAllCourseCategories(filterData, null)
      .subscribe(res => {
        if (res.success) {
          this.categories = res.data;

        }
      }, error => {
        console.log(error);
      });
  }

  private getAllSubCategories(id: string) {
    this.subDataFive = this.subCategoryService.getSubCategoriesByCategoryId(id).subscribe((res) => {
        if (res.success) {
          this.subCategories = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )

  }

  //Selection Change
  onSelectionChange(event: MatSelectChange | any) {
    this.getAllSubCategories(event.value);
    // this.getAllChildCategories(event.value);
  }

  // onSelectionChange2(event: MatSelectChange | any) {
  //   this.getAllChildCategories(event.value);
  // }


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
