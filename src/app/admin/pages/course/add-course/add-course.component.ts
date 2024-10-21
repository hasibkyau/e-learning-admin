import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CourseService} from '../../../../services/common/course.service';
import {Course} from '../../../../interfaces/common/course.interface';
import {
  COURSE_TYPES,
  DATA_BOOLEAN,
  defaultUploadImage,
  DISCOUNT_TYPES,
  PROJECT_SOURCES,
} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {Tag} from '../../../../interfaces/common/tag.interface';
import {TagService} from '../../../../services/common/tag.service';
import {Category} from '../../../../interfaces/common/course-category.interface';
import {CategoryService} from '../../../../services/common/course-category.service';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {MatSelectChange} from '@angular/material/select';
import {SubCategory} from 'src/app/interfaces/common/sub-category.interface';
import {SubCategoryService} from 'src/app/services/common/sub-category.service';
import {Instructor} from 'src/app/interfaces/common/instructor.interface';
import {InstructorService} from 'src/app/services/common/instructor.service';
import {Unit} from 'src/app/interfaces/common/unit.interface';
import {UnitService} from 'src/app/services/common/unit.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ChildCategory} from 'src/app/interfaces/common/child-category.interface';
import {ChildCategoryService} from 'src/app/services/common/child-category.service';
import {AllFileDialogComponent} from "../../gallery/file/all-file-dialog/all-file-dialog.component";
import {QuizService} from '../../../../services/common/quiz.service';
import {Quiz} from '../../../../interfaces/common/quiz.interface';
import {StringToSlugPipe} from "../../../../shared/pipes/string-to-slug.pipe";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [StringToSlugPipe]
})
export class AddCourseComponent implements OnInit, OnDestroy {

  // Ngx Quill
  modules: any = null;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;
  learningScopesDataArray?: FormArray;
  specificationDataArray?: FormArray;
  benefitsDataArray?: FormArray;
  opportunitiesDataArray?: FormArray;
  courseModulesDataArray?: FormArray;
  priceDataArray?: FormArray;


  public filteredQuiz: Quiz[] = [];
  public filteredInstructors: Instructor[] = [];

  // Static Data
  courseTypes: Select[] = COURSE_TYPES;
  sources: Select[] = PROJECT_SOURCES;
  discountTypes: Select[] = DISCOUNT_TYPES;
  dataBooleans: Select[] = DATA_BOOLEAN;

  pickedImage = defaultUploadImage;
  pickedBannerImage = defaultUploadImage;

  // Store Data
  id?: string;
  course?: Course;
  categories: Category[] = [];
  instructors: Instructor[] = [];
  subCategories: SubCategory[] = [];
  childCategories: ChildCategory[] = [];
  tags: Tag[] = [];
  unitTypes: Unit[] = [];
  quizs: Quiz[] = [];
  selectedUnitTypes?: Unit[] = [];
  public filteredUnitTypeList: Unit[];
  isLoading = false;
  autoSlug = true;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private courseCategoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private instructorService: InstructorService,
    private unitService: UnitService,
    private tagService: TagService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
    private childCategoryService: ChildCategoryService,
    private quizService: QuizService,
    private stringToSlugPipe: StringToSlugPipe,
  ) {
  }

  async ngOnInit() {


    // Init Data Form
    this.initDataForm();
    await this.getAllQuiz();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getCourseById();
      }
    });

    // Auto Slug
    this.autoGenerateSlug();

    // Base Data
    this.getAllCourseCategories();
    this.getAllTags();
    this.getAllInstructor();
    this.getAllUnitTypes();
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
      name: [null, Validators.required],
      slug: [null, Validators.required],
      type: [null],
      description: [null],
      bannerImage: [null],
      image: [null],
      introYoutubeVideo: [null],
      category: [null, Validators.required],
      subCategory: [null],
      childCategory: [null],
      tag: [null],
      instructor: [null],
      isLiveClass: [false],
      // groupLink: [null],
      isMultiplePrice: [false],

      salePrice: [null],
      discountType: [null],
      discountAmount: [null],
      totalDuration: [null],
      totalUsers: [null],
      totalExam: [null],
      totalClass: [null],
      isFeatured: [false],

      canSaleAttachment: [false],
      attachmentSalePrice: [null],
      attachmentDiscountType: [null],
      attachmentDiscountAmount: [null],
      status: ['publish'],
      priority: [null],
      totalSold: [null],
      seoTitle: [null],
      seoKeywords: [null],
      seoImage: [null],
      seoDescription: [null],
      specifications: this.fb.array([
        // this.createObjectElement()
      ]),
      courseModules: this.fb.array([
        this.createObjectElement()
      ]),
      learningScopes: this.fb.array([
        this.createStringElement()
      ]),
      benefits: this.fb.array([
        this.createStringElement()
      ]),
      opportunities: this.fb.array([
        this.createStringElement()
      ]),
      prices: this.fb.array([]),
    });
    this.learningScopesDataArray = this.dataForm.get('learningScopes') as FormArray;
    this.specificationDataArray = this.dataForm.get('specifications') as FormArray;
    this.benefitsDataArray = this.dataForm.get('benefits') as FormArray;
    this.opportunitiesDataArray = this.dataForm.get('opportunities') as FormArray;
    this.courseModulesDataArray = this.dataForm.get('courseModules') as FormArray;
    this.priceDataArray = this.dataForm.get('prices') as FormArray;

  }


  onAddNewSpecifications(formControl: string) {
    const f = this.fb.group({
      name: [null],
      value: [null]
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }


  createStringElement() {
    return this.fb.control('');
  }

  createObjectElement() {
    return this.fb.group({
      name: [null],
      description: [null],
      video: [null],
      attachment: [null],
      isFree: [false],
      quiz: [false],
      type: ['youtube'],
    });
  }

  onAddNewFormString(formControl: string) {
    (this.dataForm?.get(formControl) as FormArray).push(this.createStringElement());
  }

  addFormArrayObject(formControl: string) {
    const f = this.fb.group({
      name: [null],
      description: [null],
      video: [null],
      attachment: [null],
      isFree: [false],
      type: ['youtube'],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'courseModules': {
        formDataArray = this.courseModulesDataArray;
        break;
      }
      case 'learningScopes': {
        formDataArray = this.learningScopesDataArray;
        break;
      }
      case 'prices': {
        formDataArray = this.priceDataArray;
        break;
      }
      case 'benefits': {
        formDataArray = this.benefitsDataArray;
        break;
      }
      case 'opportunities': {
        formDataArray = this.opportunitiesDataArray;
        break;
      }

      case 'specifications': {
        formDataArray = this.specificationDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
    this.selectedUnitTypes.splice(index, 1);
  }

  //FORM PATCHING VALUE

  private setFormValue() {
    this.dataForm.patchValue({...this.course});


    if (this.course && this.course.category) {
      this.dataForm.patchValue({
        category: this.course.category._id
      });
      this.onSelectionChange({value: this.course.category._id});
    }

    if (this.course && this.course.subCategory) {
      this.dataForm.patchValue({
        subCategory: this.course.subCategory._id
      });

      this.onSelectionChange2({value: this.course.subCategory._id});
    }
    if (this.course && this.course.childCategory) {
      this.dataForm.patchValue({
        childCategory: this.course.childCategory._id
      });
    }

    // if (this.course && this.course.instructor) {
    //   this.dataForm.patchValue({
    //     instructor: this.course.instructor._id
    //   });
    // }

    if (this.course && this.course.instructor) {
      this.dataForm.patchValue({
        // instructor: this.course.instructor._id
        instructor: this.course.instructor.map((m) => m._id)
      });
    }

    if (this.course && this.course.tag) {
      this.dataForm.patchValue({
        tag: this.course.tag._id
      });
    }

    if (this.course && this.course.bannerImage) {
      this.pickedBannerImage = this.course.bannerImage;
    }

    if (this.course && this.course.image) {
      this.pickedImage = this.course.image;
    }

    this.removeFormArrayField('courseModules', 0)
    this.course.courseModules.map(m => {
      const f = this.fb.group({
        name: [m.name],
        description: [m.description],
        video: [m.video],
        attachment: [m.attachment],
        isFree: [m.isFree],
        type: [m.type],
        quiz: [this.quizs.find(f => f._id === m.quiz?._id)],
      });
      (this.dataForm?.get('courseModules') as FormArray).push(f);
    });

    this.learningScopesDataArray.removeAt(0);
    this.course.learningScopes.forEach(f => {
      const ctrl = this.fb.control(f);
      (this.dataForm?.get('learningScopes') as FormArray).push(ctrl);
    });

    this.benefitsDataArray.removeAt(0);
    this.course.benefits.forEach(f => {
      const ctrl = this.fb.control(f);
      (this.dataForm?.get('benefits') as FormArray).push(ctrl);
    });

    this.opportunitiesDataArray.removeAt(0);
    this.course.opportunities.forEach(f => {
      const ctrl = this.fb.control(f);
      (this.dataForm?.get('opportunities') as FormArray).push(ctrl);
    });

    // Form Array prices
    if (this.course.prices && this.course.prices.length) {
      this.course.prices.map((m) => {
        this.selectedUnitTypes.push({name: m.name, _id: m.unit});
        const f = this.fb.group({
          unit: [m.unit],
          name: [m.name],
          duration: [m.duration],
          costPrice: [m.costPrice],
          salePrice: [m.salePrice],
          discountType: [m.discountType],
          discountAmount: [m.discountAmount],
        });
        (this.dataForm?.get('prices') as FormArray).push(f);
      });
    }
    // specifications
    if (this.course.specifications && this.course.specifications.length) {
      this.course.specifications.map(m => {
        const f = this.fb.group({
          name: [m.name, Validators.required],
          value: [m.value, Validators.required],
        });
        (this.dataForm?.get('specifications') as FormArray).push(f);
      });
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

    if (this.dataForm.value.childCategory) {
      mData = {
        ...mData, ...{
          childCategory: {
            _id: this.dataForm.value.childCategory,
            name: this.childCategories.find(f => f._id === this.dataForm.value.childCategory)?.name,
            slug: this.childCategories.find(f => f._id === this.dataForm.value.childCategory)?.slug,
          }
        }
      }
    }

    // If has Tag
    if (this.dataForm.value.tag) {
      mData = {
        ...mData, ...{
          tag: {
            _id: this.dataForm.value.tag,
            name: this.tags.find(f => f._id === this.dataForm.value.tag)?.name,
            slug: this.tags.find(f => f._id === this.dataForm.value.tag)?.slug,
          }
        }
      }
    }

    // // If has instructor
    // if (this.dataForm.value.instructor) {
    //   mData = {
    //     ...mData, ...{
    //       instructor: {
    //         _id: this.dataForm.value.instructor,
    //         name: this.instructors.find(f => f._id === this.dataForm.value.instructor)?.name,
    //         slug: this.instructors.find(f => f._id === this.dataForm.value.instructor)?.slug,
    //         info: this.instructors.find(f => f._id === this.dataForm.value.instructor)?.info,
    //         image: this.instructors.find(f => f._id === this.dataForm.value.instructor)?.image,
    //       }
    //     }
    //   }
    // }


// instructor
    if (this.dataForm.value.instructor) {
      // mData.tags
      mData.instructor = []
      this.dataForm.value.instructor.map((m) => {
        mData.instructor.push(
          {
            _id: this.instructors.find((f) => String(f._id) === m)._id,
            name: this.instructors.find((f) => String(f._id) ===m)?.name,
            slug: this.instructors.find((f) => String(f._id) === m)?.slug,
            info: this.instructors.find((f) => String(f._id) === m)?.info,
            image: this.instructors.find((f) => String(f._id) === m)?.image,
          }
        )
      })
    }

    if (this.course) {
      this.updateCourseById(mData);
    } else {
      this.addCourse({
        ...mData,
        ...{
          totalSold: 500
        }
      });
    }

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
   * HTTP REQ HANDLE
   * getAllCourseCategories()
   * getAllInstructor()
   * getAllTags()
   * getCourseById()
   * addCourse()
   * updateCourseById()
   */

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

  private getAllChildCategories(id: string) {
    this.subDataFive = this.childCategoryService.getChildCategoriesByCategoryId(id).subscribe((res) => {
        if (res.success) {
          this.childCategories = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )

  }

  private getAllInstructor() {
    const mSelect = {
      name: 1,
      slug: 1,
      info: 1,
      image: 1,
    }
    let filterData: FilterData = {
      filter: null,
      select: mSelect,
      sort: {prirotiy: -1}
    }

    this.subDataSeven = this.instructorService.getAllInstructors(filterData).subscribe((res) => {
        if (res.success) {
          this.instructors = res.data;
          this.filteredInstructors = [...this.instructors];
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )

  }

  private getAllUnitTypes() {
    const mSelect = {
      name: 1,
      value: 1,
    }
    let filterData: FilterData = {
      filter: null,
      select: mSelect,
      sort: {priority: -1}
    }

    this.subDataOne = this.unitService.getAllUnits(filterData, null).subscribe({
      next: res => {
        this.unitTypes = res.data;
        this.filteredUnitTypeList = this.unitTypes.slice();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private async getAllQuiz() {

    return new Promise((resolve, reject) => {
      // Select
      const mSelect = {
        name: 1,
      };

      const filter: FilterData = {
        filter: null,
        pagination: null,
        select: mSelect,
        sort: {createdAt: 1},
      };

      this.subDataOne = this.quizService
        .getAllQuizs(filter, null)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.quizs = res.data;
              this.filteredQuiz = [...this.quizs];
            }
            resolve(this.quizs);
          },
          error: (err) => {
            console.log(err);
            reject(err)
          },
        });
    })


  }

  private getAllTags() {
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

    this.subDataSix = this.tagService.getAllTags(filterData, null)
      .subscribe(res => {
        if (res.success) {
          this.tags = res.data;
        }
      }, error => {
        console.log(error);
      });
  }

  private getCourseById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.courseService.getCourseById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.course = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addCourse(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataOne = this.courseService.addCourse(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.dataForm.patchValue({status: 'publish'});
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

  private updateCourseById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.courseService.updateCourseById(this.course._id, data)
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
        console.log(error);
        this.isLoading = false;
      });
  }

  //Selection Change
  onSelectionChange(event: MatSelectChange | any) {
    this.getAllSubCategories(event.value);
    this.getAllChildCategories(event.value);
  }

  onSelectionChange2(event: MatSelectChange | any) {
    this.getAllChildCategories(event.value);
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog()
   * openInstructorImageGalleryDialog()
   * openVideoDialog()
   * removeInputFormImage()
   */

  public openGalleryDialog(type: 'banner-image' | 'image') {
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
          if (type === 'banner-image') {
            const bannerImage: Gallery = dialogResult.data[0] as Gallery;
            this.dataForm.patchValue({bannerImage: bannerImage.url});
            this.pickedBannerImage = bannerImage.url;
            return;
          }
          if (type === 'image') {
            const image: Gallery = dialogResult.data[0] as Gallery;
            this.dataForm.patchValue({image: image.url});
            this.dataForm.patchValue({seoImage: image.url});
            this.pickedImage = image.url;
          }
        }
      }
    });
  }


  public openGalleryPdfDialog(index: number) {
    const dialogRef = this.dialog.open(AllFileDialogComponent, {
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
          this.courseModulesDataArray.at(index).patchValue({attachment: dialogResult.data[0].url})
        }
      }
    });
  }


  removeInputFormImage() {
    this.dataForm.patchValue({instructorImage: null})
  }

  dropItem(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;
    const from = event.previousIndex;
    const to = event.currentIndex;
    const temp = this.priceDataArray.at(from);
    const temp2 = this.selectedUnitTypes[from];
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.priceDataArray.at(i + dir);
      const current2 = this.selectedUnitTypes[i + dir];
      this.priceDataArray.setControl(i, current);
      this.selectedUnitTypes[i] = current2;
    }
    this.priceDataArray.setControl(to, temp);
    this.selectedUnitTypes[to] = temp2;
  }


  onSelectUnit(data: MatSelectChange) {
    const index = this.selectedUnitTypes.findIndex(x => x._id === data?.value._id);
    if (index === -1) {
      this.selectedUnitTypes.push(data?.value);
      const f = this.fb.group({
        unit: [data?.value._id],
        name: [data?.value.name],
        duration: [data.value.value],
        costPrice: [null],
        salePrice: [null],
        discountType: [null],
        discountAmount: [null],
      });
      (this.dataForm?.get('prices') as FormArray).push(f);
    }

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
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }

  onChangeCourseType(event: MatSelectChange) {
    this.dataForm.patchValue({
      isMultiplePrice: false,
    })
  }
}
