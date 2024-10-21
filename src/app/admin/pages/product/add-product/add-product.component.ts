import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {MatDialog} from '@angular/material/dialog';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AllFileDialogComponent} from "../../gallery/file/all-file-dialog/all-file-dialog.component";
import {Category} from "../../../../interfaces/common/course-category.interface";
import {TagService} from "../../../../services/common/tag.service";
import {Product} from "../../../../interfaces/common/product.interface";
import {AuthorService} from "../../../../services/common/author.service";
import {UiService} from "../../../../services/core/ui.service";
import {Pagination} from "../../../../interfaces/core/pagination";
import {
  COUNTRY,
  DISCOUNT_TYPES,
  EMI_MONTHS,
  Language,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  Version
} from "../../../../core/utils/app-data";
import {StringToSlugPipe} from "../../../../shared/pipes/string-to-slug.pipe";
import {ProductService} from "../../../../services/common/product.service";
import {Gallery} from "../../../../interfaces/gallery/gallery.interface";
import {Select} from "../../../../interfaces/core/select";
import {Author} from "../../../../interfaces/common/author.interface";
import {UtilsService} from "../../../../services/core/utils.service";
import {FilterData} from "../../../../interfaces/core/filter-data";
import {Tag} from "../../../../interfaces/common/tag.interface";
import {ProductCategoryService} from "../../../../services/common/product-category.service";
import {ProductCategory} from "../../../../interfaces/common/product-category.interface";
import {MatSelectChange} from "@angular/material/select";
import {ProductTypeService} from "../../../../services/common/product-type.service";
import {ProductType} from "../../../../interfaces/common/product-type.interface";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [StringToSlugPipe]
})
export class AddProductComponent implements OnInit {
  // Ngx Quill
  modules: any = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  category?: ProductCategory;
  categories: ProductCategory[] = [];
  countryData = COUNTRY;
  filterCountryData = [...this.countryData];
  languageData = Language;
  versionData = Version;
  productType = PRODUCT_TYPE;
  autoSlug = true;

  // Form Array
  specificationDataArray?: FormArray;
  featuresDataArray?: FormArray;

  // Infinity Select
  categoryCtrl: FormControl = new FormControl();
  subCategoryCtrl: FormControl = new FormControl();
  authorCtrl: FormControl = new FormControl();
  brandCtrl: FormControl = new FormControl();
  publisherCtrl: FormControl = new FormControl();
  authors: Author[] = [];
  translatorDataArray?: FormArray;
  // Store Data
  tags: Tag[] = [];
  id?: string;
  product?: Product;
  productTypes?: ProductType[] = [];
  selectedCategory: Category = null;
  // Pagination
  currentPage = 1;
  dataPerPage = 10;
  totalData = 0;
  // Image
  files: File[] = [];
  pickedImage: any[] = [];
  pickedFile: any;
  oldImages: string[] = [];
  removeImages: string[] = [];
  chooseImage?: string[] = [];
  public filteredAuthor: Author[] = [];
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;
  emiMonths: Select[] = EMI_MONTHS;
  discountTypes: Select[] = DISCOUNT_TYPES;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService,
    private authorService: AuthorService,
    private spinnerService: NgxSpinnerService,
    private tagService: TagService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private productCategoryService: ProductCategoryService,
    private stringToSlugPipe: StringToSlugPipe,
    private productTypeService: ProductTypeService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getProductById();
      }
    });

    this.getAllCategories();

    // Base Data
    // this.getAllTags();
     // Auto Slug
     this.autoGenerateSlug();

     this.getAllProductType();

     // this.getAllAuthorList();
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onAddNewSpecifications()
   * removeFormArrayField()
   * clearFormArray()
   * findInvalidControls()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug:[null, Validators.required],
      // tagline:[null],
      description: [null],
      shortDescription: [null],
      featureTitle: [null],
      costPrice: [null],
      salePrice: [null],
      hasTax: [null],
      tax: [null],
      // isbn: [null],
      nameEn: [null],
      cartLimit: [null],
      sku: [null],
      emiMonth: [null],
      edition: [null],
      discountType: [null],
      discountAmount: [null],
      images: [null],
      language: [null],
      country: [null],
      quantity: [null],
      totalPages:[null],
      pdfFile:[null],
      // translatorName:[null],
      publishedDate:[null],
      currentVersion:[null],
      trackQuantity: [null],
      seoTitle: [null],
      seoDescription: [null],
      seoKeywords: [null],
      productType: ['Book'],
      // category: this.categoryCtrl,
      category: [null],
      // subCategory: this.subCategoryCtrl,
      // publisher: this.publisherCtrl,
      publisher: [null],
      author: [null],
      // brand: this.brandCtrl,
      // tags: [null],
      earnPoint: [null],
      pointType: [null],
      pointValue: [null],
      threeMonth: [null],
      sixMonth: [null],
      emiAmount: [null],
      twelveMonth: [null],
      redeemPoint: [null],
      redeemType: [null],
      redeemValue: [null],
      status: [this.productStatus[1].value, Validators.required],
      videoUrl: [null],
      unit: [null],
      specifications: this.fb.array([]),
      features: this.fb.array([]),
      // Variations
      translatorName: this.fb.array([
        this.createStringElement()
      ]),
      hasVariations: [null],
    });

    this.translatorDataArray = this.dataForm.get('translatorName') as FormArray;

    this.specificationDataArray = this.dataForm.get(
      'specifications'
    ) as FormArray;
    this.featuresDataArray = this.dataForm.get(
      'features'
    ) as FormArray;
  }

  createStringElement() {
    return this.fb.control('');
  }

  onAddNewFormString(formControl: string) {
    (this.dataForm?.get(formControl) as FormArray).push(this.createStringElement());
  }

    /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
    autoGenerateSlug() {
      if (this.autoSlug === true) {
        this.subAutoSlug = this.dataForm.get('nameEn').valueChanges
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

  private setFormValue() {
    this.dataForm.patchValue(this.product);

    if (this.product && this.product.category) {
      this.dataForm.patchValue({
        category: this.product.category._id
      });
      this.onSelectionChange({value: this.product.category._id});
    }

    // Set Image
    if (this.product.images && this.product.images.length) {
      this.chooseImage = this.product.images;
    }
    if (this.product.pdfFile && this.product.pdfFile.length) {
      this.pickedFile = this.product.pdfFile;
    }

    // Tags
    // if (this.product.tags && this.product.tags.length) {
    //   this.dataForm.patchValue({
    //     tags: this.product.tags.map((m) => m._id)
    //   });
    // }

    // if (this.product && this.product.author) {
    //   this.dataForm.patchValue({
    //     author: this.product.author.map((m) => m._id)
    //   });
    // }

    // Form Array Specifications
    if (this.product.specifications && this.product.specifications.length) {
      this.product.specifications.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          value: [m.value],
          type: [m.type],
        });
        (this.dataForm?.get('specifications') as FormArray).push(f);
      });
    }

    this.translatorDataArray.removeAt(0);
    this.product.translatorName.forEach(f => {
      const ctrl = this.fb.control(f);
      (this.dataForm?.get('translatorName') as FormArray).push(ctrl);
    });

    // Form Array Features
    if (this.product.features && this.product.features.length) {
      this.product.features.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          value: [m.value],
        });
        (this.dataForm?.get('features') as FormArray).push(f);
      });
    }

  }

  onAddNewSpecifications() {
    const f = this.fb.group({
      name: [null],
      value: [null],
      type: [this.dataForm.value.specifications.length ? this.dataForm.value.specifications[this.dataForm.value.specifications.length - 1].type : null,],
    });
    (this.dataForm?.get('specifications') as FormArray).push(f);
  }

  onAddNewFeatures() {
    const f = this.fb.group({
      name: [null],
      value: [null],
    });
    (this.dataForm?.get('features') as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'specifications': {
        formDataArray = this.specificationDataArray;
        break;
      }
      case 'translatorName': {
        formDataArray = this.translatorDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

  removeFeaturesFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'features': {
        formDataArray = this.featuresDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }




  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    // const mData = {
    //   ...this.dataForm.value,
    //   ...{
    //     category: {
    //       _id: this.dataForm.value.category._id,
    //       name: this.dataForm.value.category.name,
    //       slug: this.dataForm.value.category.slug,
    //     },
    //     cartLimit: this.dataForm.value.cartLimit
    //       ? this.dataForm.value.cartLimit
    //       : 0,
    //   },
    // };


    let mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: this.dataForm.value.category,
          name: this.categories.find(f => f._id === this.dataForm.value.category)?.name,
          slug: this.categories.find(f => f._id === this.dataForm.value.category)?.slug,
        },
        cartLimit: this.dataForm.value.cartLimit
          ? this.dataForm.value.cartLimit
          : 0,
      }
    };

    // Sub Category
    if (this.dataForm.value.subCategory) {
      mData.subCategory = {
        _id: this.dataForm.value.subCategory._id,
        name: this.dataForm.value.subCategory.name,
        slug: this.dataForm.value.subCategory.slug,
      };
    }

    // Author
    // if (this.dataForm.value.author) {
    //   mData.author = {
    //     _id: this.dataForm.value.author._id,
    //     name: this.dataForm.value.author.name,
    //     slug: this.dataForm.value.author.slug,
    //   };
    // }

    // // Author
    // if (this.dataForm.value.author) {
    //   // mData.tags
    //   mData.author = []
    //   this.dataForm.value.author.map((m) => {
    //     mData.author.push(
    //       {
    //         _id: this.authors.find((f) => String(f._id) === m)._id,
    //         name: this.authors.find((f) => String(f._id) ===m)?.name,
    //         slug: this.authors.find((f) => String(f._id) === m)?.slug,
    //       }
    //     )
    //   })
    // }


    // // Publisher
    // if (this.dataForm.value.publisher) {
    //   mData.publisher = {
    //     _id: this.dataForm.value.publisher._id,
    //     name: this.dataForm.value.publisher.name,
    //     slug: this.dataForm.value.publisher.slug,
    //   };
    // }

    // // Tags
    // if (this.dataForm.value.tags) {
    //   // mData.tags
    //   mData.tags = []
    //   this.dataForm.value.tags.map((m) => {
    //     mData.tags.push(
    //       {
    //         _id: this.tags.find((f) => String(f._id) === m)._id,
    //         name: this.tags.find((f) => String(f._id) === m).name,
    //         slug: this.tags.find((f) => String(f._id) === m).slug,
    //       }
    //     )
    //   })
    // }


    // Main Function
    if (this.product) {

      this.updateProductById(mData);

    } else {

      this.addProduct(mData);

    }
  }


  /**
   * HTTP REQ HANDLE
   * getAllTags()
   getProductById()
   * addProduct()
   * updateProductById()
   * deleteMultipleFile()
   */

  // private getAllTags() {
  //   // Select
  //   const mSelect = {
  //     name: 1,
  //     slug: 1,
  //   };
  //
  //   const filterData: FilterData = {
  //     pagination: null,
  //     filter: null,
  //     select: mSelect,
  //     sort: {name: 1},
  //   };
  //
  //   this.subDataOne = this.tagService.getAllTags(filterData, null).subscribe({
  //     next: res => {
  //       this.tags = res.data;
  //
  //     },
  //     error: error => {
  //       console.log(error);
  //     }
  //   });
  // }


  /**
   * HTTP REQ HANDLE
   * getAllProductTypes()
   * deleteMultipleProductTypeById()
   */

  private getAllProductType() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      status: 1,
      priority: 1,
      createdAt: 1,
      description: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productTypeService.getAllProductTypes(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.productTypes = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  private getProductById() {
    this.spinnerService.show();
    this.subDataThree = this.productService.getProductById(this.id).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.product = res.data;
          this.setFormValue();
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }

    })

  }


  private getAllCategories() {
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
    this.subDataFour = this.productCategoryService.getAllCategory(filterData, null)
      .subscribe(res => {
        if (res.success) {
          this.categories = res.data;

        }
      }, error => {
        console.log(error);
      });
  }

  /**
   * HTTP REQ HANDLE
   * getAllAuthorList()
   */

  private getAllAuthorList() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const pagination: Pagination = {
      pageSize: this.dataPerPage,
      currentPage: this.currentPage - 1
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.authorService.getAllAuthor(filter, null)
      .subscribe({
        next: res => {
          this.authors = res.data;
          this.filteredAuthor = [...this.authors];
          // this.totalData = res.count;
        },
        error: error => {
          console.log(error);
        }
      })
  }



  private addProduct(data: any) {
    this.spinnerService.show();
    this.subDataTwo = this.productService.addProduct(data).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }
    });
  }

  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataFour = this.productService
      .updateProductById(this.product._id, data)
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();

            // Remove Old Image from Backend
            if (this.removeImages && this.removeImages.length) {
              this.deleteMultipleFile(this.removeImages);
            }
            this.files = [];
            this.oldImages = [];
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: error => {
          this.spinnerService.hide();
          console.log(error);
        }
      });

  }


  private deleteMultipleFile(data: string[]) {
    this.subDataFive = this.fileUploadService.deleteMultipleFile(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * IMAGE UPLOAD
   * onSelect()
   * patchPickedImagesUnique()
   * drop()
   * onRemove()
   * removeSelectImage()
   */

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }


  private patchPickedImagesUnique(images: Gallery[]) {
    if (this.chooseImage && this.chooseImage.length > 0) {
      const nImages = images.map(m => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(nImages, this.chooseImage);
    } else {
      this.chooseImage = images.map(m => m.url);
    }
    this.dataForm.patchValue(
      {images: this.chooseImage}
    );
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chooseImage, event.previousIndex, event.currentIndex);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  removeSelectImage(s: string) {
    const index = this.chooseImage.findIndex(x => x === s);
    this.chooseImage.splice(index, 1);
  }

  /**
   * ON CATEGORY SELECT
   * onCategorySelect()
   * getEmiInput()
   */
  onCategorySelect(data: Category) {
    if (data) {
      this.selectedCategory = data;
    }
  }

  private getAllSubCategories(id: string) {
    // this.subDataFive = this.subCategoryService.getSubCategoriesByCategoryId(id).subscribe((res) => {
    //     if (res.success) {
    //       this.subCategories = res.data;
    //     }
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   }
    // )

  }

  //Selection Change
  onSelectionChange(event: MatSelectChange | any) {
    this.getAllSubCategories(event.value);
    // this.getAllChildCategories(event.value);
  }

  getEmiInput(value: number) {
    if (this.dataForm.value.emiMonth && this.dataForm.value.emiMonth.length) {
      const fIndex = this.dataForm.value.emiMonth.findIndex(f => f == value)
      if (fIndex > -1) {
        return value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  /**
   * OPEN COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'multiple', count: this.chooseImage.length ? (10 - this.chooseImage.length) : 10},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.patchPickedImagesUnique(dialogResult.data);
        }
      }
    });
  }


  public openGalleryPdfDialog() {
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
          const pdfFile: Gallery = dialogResult.data[0] as Gallery;
          console.log('pdfFile',pdfFile)
          this.dataForm.patchValue({pdfFile: pdfFile.url});
          this.pickedFile = pdfFile.url;
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
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
