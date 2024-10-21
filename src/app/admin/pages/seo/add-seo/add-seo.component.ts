import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SeoService} from '../../../../services/common/seo.service';
import {UtilsService} from '../../../../services/core/utils.service';
import {
  DATA_PAGES,
  defaultUploadImage,
  DISCOUNT_TYPES,
  PROJECT_SOURCES,
  VARIATION_IMG_PLACEHOLDER
} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {Tag} from '../../../../interfaces/common/tag.interface';
import {TagService} from '../../../../services/common/tag.service';
import {UserDataService} from '../../../../services/common/user-data.service';
import {Technology} from '../../../../interfaces/common/technology.interface';
import {TechnologyService} from '../../../../services/common/technology.service';
import {Seo} from 'src/app/interfaces/common/seo.interface';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-seo',
  templateUrl: './add-seo.component.html',
  styleUrls: ['./add-seo.component.scss']
})
export class AddSeoComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  sources: Select[] = PROJECT_SOURCES;
  discountTypes: Select[] = DISCOUNT_TYPES;
  pageName: Select[] = DATA_PAGES;

  // Image Placeholder
  instructorImagePlaceholder = VARIATION_IMG_PLACEHOLDER;
  pickedImage = defaultUploadImage;

  // Store Data
  id?: string;
  seo?: Seo;
  technologies: Technology[] = [];
  tags: Tag[] = [];
  tests: any[] = ['1', '2', '3', '4', '5'];
  isLoading = false

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
    private seoService: SeoService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getSeoById();
      }
    });


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
      title: [null, Validators.required],
      pageName: [null, Validators.required],
      description: [null],
      keywords: [null],
      image: [null],
    });

  }

  createStringElement() {
    return this.fb.control('', Validators.required);
  }

  private setFormValue() {
    this.dataForm.patchValue({...this.seo});

    if (this.seo && this.seo.image) {
      this.pickedImage = this.seo.image;
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
    };

    if (this.seo) {
      this.updateSeoById(mData);
    } else {
      this.addSeo(mData);


    }

  }


  /**
   * HTTP REQ HANDLE
   * getAllSeoCategories()
   * getAllTechnologies()
   * getAllTags()
   * getSeoById()
   * addSeo()
   * updateSeoById()
   */

  private getSeoById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.seoService.getSeoById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.seo = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addSeo(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataOne = this.seoService.addSeo(data)
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

  private updateSeoById(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.seoService.updateSeoById(this.seo._id, data)
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
          this.dataForm.patchValue({image: image.url});
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
