import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TagService} from '../../../../../services/common/tag.service';
import {Tag} from '../../../../../interfaces/common/tag.interface';
import {DATA_BOOLEAN} from '../../../../../core/utils/app-data';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Static Data
  showReadOnlyField = false;
  readOnlyData: Select[] = DATA_BOOLEAN;

  // Store Data
  id?: string;
  tag?: Tag;
  autoSlug = true;
  isLoading = false;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private tagService: TagService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {


    this.initDataForm();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getTagById();
      }
    });

        // Auto Slug
        this.autoGenerateSlug();
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.tag) {
      this.updateTagById();
    } else {
      this.addTag();

    }

  }


  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug: [null],
      status:['publish'],
      priority:[null]
    });
  }

  /**
   * SET FORM DATA
   */

  private setFormValue() {
    this.dataForm.patchValue({...this.tag});
  }


  /**
   * HTTP REQ HANDLE
   * getTagById
   * addTag
   * updateTagById
   */
  private getTagById() {
    this.spinnerService.show();
    this.subDataTwo = this.tagService.getTagById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.tag = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addTag() {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataOne = this.tagService.addTag(this.dataForm.value)
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

  private updateTagById() {
    this.spinnerService.show();
    this.isLoading = true;
    this.subDataThree = this.tagService.updateTagById(this.tag._id, this.dataForm.value)
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
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }

}
