import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReviewService} from '../../../../services/common/review.service';
import {Review} from '../../../../interfaces/common/review.interface';
import {
  defaultUploadImage,
  DISCOUNT_TYPES,
  PROJECT_SOURCES,
  VARIATION_IMG_PLACEHOLDER
} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Course} from 'src/app/interfaces/common/course.interface';
import {CourseService} from 'src/app/services/common/course.service';
import {FilterData} from 'src/app/interfaces/core/filter-data';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  sources: Select[] = PROJECT_SOURCES;
  discountTypes: Select[] = DISCOUNT_TYPES;

  // Image Placeholder
  instructorImagePlaceholder = VARIATION_IMG_PLACEHOLDER;
  pickedImage = defaultUploadImage;

  // Store Data
  id?: string;
  review?: Review;
  courses: Course[] = [];
  isLoading = false;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getReviewById();
      }
    });

    this.getAllCourses();

  }

  /**
   * INIT FORM & Form Methods
   * initDataForm()
   * createStringElement()
   * createObjectElement()
   * onAddNewFormString()
   * addFormArrayObject()
   * removeFormArrayField()
   * removeFormArrayField()
   * setFormValue()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      user: this.fb.group({
        name: [null, Validators.required],
        username: [null],
        phoneNo: [null],
        email: [null],
        designation: [null],
        profileImg: [null],
      }),
      course: [null, Validators.required],
      review: [null],
      rating: [null],
      status: ['publish'],
      priority: [null]

    });

  }


  private setFormValue() {
    this.dataForm.patchValue({...this.review});

    if (this.review && this.review.course) {
      this.dataForm.patchValue({
        course: this.review.course._id
      });
    }


    if (this.review && this.review.user.profileImg) {
      this.pickedImage = this.review.user.profileImg;
    }
  }


  /**
   * ON SUBMIT FORM
   */
  onSubmit() {

    // Check Required Field
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    let mData = {
      ...this.dataForm.value,
      course: {
        _id: this.dataForm.value.course,
        name: this.courses.find((m) => m._id === this.dataForm.value.course)?.name,
        slug: this.courses.find((m) => m._id === this.dataForm.value.course)?.slug,
        bannerImage: this.courses.find((m) => m._id === this.dataForm.value.course)?.image,
      }
    };



    if (this.review) {
      this.updateReviewById(mData);
    } else {
      this.addReview(mData);
    }

  }


  /**
   * HTTP REQ HANDLE
   * getAllCourses()
   * getAllTechnologies()
   * getAllTags()
   * getReviewById()
   * addReview()
   * updateReviewById()
   */

  private getAllCourses() {
    const mSelect = {
      name: 1,
      image: 1,
      slug: 1,
    }

    const filterData: FilterData = {
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1},
      filter: null
    }

    this.subDataOne = this.courseService.getAllCourses(filterData, null).subscribe((res) => {
        if (res.success) {
          this.courses = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getReviewById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.reviewService.getReviewById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.review = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addReview(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataOne = this.reviewService.addReview(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.pickedImage = defaultUploadImage;
          this.isLoading = false;
        } else {
          this.uiService.warn(res.message);
          this.isLoading = false;
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
        this.isLoading = false;
      });
  }

  private updateReviewById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.reviewService.updateReviewById(this.review._id, data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoading = false;
        } else {
          this.uiService.warn(res.message);
          this.isLoading = false;
        }
      }, error => {
        this.spinnerService.hide();
        this.isLoading = false;
        console.log(error);
      });
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   * openInstructorImageGalleryDialog()
   * removeInputFormImage()
   */

  public openGalleryDialog() {
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
          this.dataForm.get('user').patchValue({profileImg: image.url});
          this.pickedImage = image.url;
        }
      }
    });
  }

  public openInstructorImageGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'multiple', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.dataForm.patchValue({instructorImage: dialogResult.data[0].url})
        }
      }
    });
  }

  removeInputFormImage() {
    this.dataForm.patchValue({instructorImage: null})
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
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
  }

}
