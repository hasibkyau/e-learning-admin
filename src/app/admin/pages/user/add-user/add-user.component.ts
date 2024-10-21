import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../../services/core/utils.service';
import {User} from '../../../../interfaces/common/user.interface';
import {DATA_BOOLEAN, defaultUploadImage, GENDERS, PROJECT_SOURCES} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {Technology} from '../../../../interfaces/common/technology.interface';
import {UserType} from '../../../../interfaces/common/user-type.interface';
import {UserDataService} from '../../../../services/common/user-data.service';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  showReadOnlyField = false;
  genders: Select[] = GENDERS;
  booleanData: Select[] = DATA_BOOLEAN;
  sources: Select[] = PROJECT_SOURCES;

  // Store Data
  id?: string;
  user?: User;
  designations: any[] = [];
  technologies: Technology[] = [];
  userTypes: UserType[] = [];
  isLoading = false;

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserDataService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
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
        this.getUserById();
      }
    });


  }

  /**
   * ON SUBMIT FORM
   */
  onSubmit() {

    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }


    let mData = {
      ...this.dataForm.value,
      ...{
        username: this.dataForm.value.phoneNo,
        joinDate: this.dataForm.value.joinDate ? this.utilsService.getDateString(this.dataForm.value.joinDate) : null,
      }
    };


    if (this.user) {
      this.updateUserById(mData);
    } else {
      this.addUser(mData);

    }

  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      profileImg: [null],
      phone: [null, Validators.required],
      email: [null, Validators.email],
      password: [null],
      newPassword: [null],
      gender: [null],
      hasAccess: [null],
      registrationType: ['phone'],
      isPasswordLess: [false]
    });
  }

  /**
   * SET FORM DATA
   */

  private setFormValue() {
    this.dataForm.patchValue({...this.user});
    // const technologies = this.user.technologies.map(m => m._id);
    // this.dataForm.patchValue({
    //   designation: this.user.designation?._id,
    //   userType: this.user.userType?._id,
    //   technologies: technologies,
    // });

    if (this.user && this.user.profileImg) {
      this.pickedImage = this.user.profileImg;
    }


  }


  /**
   * HTTP REQ HANDLE
   * getUserById
   * addUser
   * updateUserById
   */

  private getUserById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.userService.getUserById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.user = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addUser(data: any) {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataOne = this.userService.addUser(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
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

  private updateUserById(data: any) {
    this.spinnerService.show();
    // Delete Bad Field
    const mData = this.dataForm.value;
    delete mData.password;
    this.isLoading = true;
    this.subDataThree = this.userService.updateUserById(this.user._id, data)
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
   * openGalleryDialog
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
          this.dataForm.patchValue({profileImg: image.url});
          this.pickedImage = image.url;
        }
      }
    });
  }

  /**
   * GENERATE USER NAME
   */
  public get generateUsername(): string {
    if (this.dataForm && this.dataForm.value.username) {
      // const rs = this.dataForm.value.username.replace(/[^a-zA-Z ]/g, '');
      const rs = this.dataForm.value.username.replace(/[^A-Za-z0-9]/g, '');
      return rs.trim().toLowerCase();
    } else {
      return '';
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
  }


}
