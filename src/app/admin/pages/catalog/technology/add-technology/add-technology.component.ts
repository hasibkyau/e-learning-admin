import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TechnologyService} from '../../../../../services/common/technology.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Technology} from '../../../../../interfaces/common/technology.interface';
import {Select} from '../../../../../interfaces/core/select';
import {DATA_BOOLEAN} from '../../../../../core/utils/app-data';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  showReadOnlyField = false;
  readOnlyData: Select[] = DATA_BOOLEAN;

  // Store Data
  id?: string;
  technology?: Technology;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private technologyService: TechnologyService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getTechnologyById();
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

    if (this.technology) {
      this.updateTechnologyById();
    } else {
      this.addTechnology();

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
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      // readOnly: [null],
    });
  }

  /**
   * SET FORM DATA
   */

  private setFormValue() {
    this.dataForm.patchValue({...this.technology});
  }


  /**
   * HTTP REQ HANDLE
   * getTechnologyById
   * addTechnology
   * updateTechnologyById
   */
  private getTechnologyById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.technologyService.getTechnologyById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.technology = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addTechnology() {
    this.spinnerService.show();
    this.subDataOne = this.technologyService.addTechnology(this.dataForm.value)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateTechnologyById() {
    this.spinnerService.show();
    this.subDataThree = this.technologyService.updateTechnologyById(this.technology._id, this.dataForm.value)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }


}
