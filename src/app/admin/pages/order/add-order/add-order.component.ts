import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Course, Price} from '../../../../interfaces/common/course.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../../../services/core/ui.service';
import {CourseService} from '../../../../services/common/course.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {User} from '../../../../interfaces/common/user.interface';
import {UserDataService} from '../../../../services/common/user-data.service';
import {MatSelectChange} from '@angular/material/select';
import {UtilsService} from '../../../../services/core/utils.service';
import {PricePipe} from '../../../../shared/pipes/price.pipe';
import {OrderService} from '../../../../services/common/order.service';
import {environment} from '../../../../../environments/environment';
import {MatCheckboxChange} from '@angular/material/checkbox';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [PricePipe]
})
export class AddOrderComponent implements OnInit, OnDestroy {

  readonly domainUrl = environment.domain

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  order_id: string;
  // Store Data
  userId?: string;
  courses: Course[] = [];
  user: User = null;
  isAddedOrder: boolean = false;

  // Selected Data
  selectedCourseData: Course;
  selectedPriceData: Price;



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
    private uiService: UiService,
    private courseService: CourseService,
    private orderService: OrderService,
    private userDataService: UserDataService,
    private utilService: UtilsService,
    private pricePipe: PricePipe,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.queryParamMap.subscribe((qParam) => {
      this.userId = qParam.get('user');

      if (this.userId) {
        this.getUserById();
      }
    });

    // Base Data
    this.getAllCourses();

  }

  /**
   * INIT FORM & Form Methods
   * initDataForm()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      course: [null, Validators.required],
      unit: [null],
      isPartialPaymentOrder: [null],
      isFreeOrder: [null],
      partialAmount: [null],
      note: [null],
    });

  }

  onSubmit() {
    // Check Required Field
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    let mData: any = {
      user: this.user?._id,
      name: this.user?.name,
      email: this.user?.email,
      phone: this.user?.phone,
      paymentStatus: 'unpaid',
      orderStatus: 'Pending',
      subTotal:
        this.selectedCourseData.isMultiplePrice
          ? this.pricePipe.transform(this.selectedCourseData.prices[0], 'salePrice')
          : this.pricePipe.transform(this.selectedCourseData, 'salePrice'),
      discount: this.selectedCourseData.isMultiplePrice
        ? this.pricePipe.transform(this.selectedCourseData.prices[0], 'discountAmount')
        : this.pricePipe.transform(this.selectedCourseData, 'discountAmount'),
      grandTotal:  this.selectedCourseData.isMultiplePrice
        ? this.pricePipe.transform(this.selectedCourseData.prices[0], 'salePrice')
        : this.pricePipe.transform(this.selectedCourseData, 'salePrice'),
      checkoutDate: this.utilService.getDateString(new Date()),
      note: this.dataForm.value.note,
      orderType: this.selectedCourseData?.type,
      orderItem: {
        _id: this.selectedCourseData._id,
        name: this.selectedCourseData?.name,
        slug: this.selectedCourseData?.slug,
        image: this.selectedCourseData?.bannerImage ? this.selectedCourseData?.bannerImage : this.selectedCourseData?.image,
        category: this.selectedCourseData?.category,
        subCategory: this.selectedCourseData?.subCategory,
        childCategory: this.selectedCourseData?.childCategory,
        type: this.selectedCourseData?.type,
        salePrice: this.selectedCourseData.isMultiplePrice ? this.selectedPriceData.salePrice : this.selectedCourseData?.salePrice,
        discountType: this.selectedCourseData.isMultiplePrice ? this.selectedPriceData.discountType : this.selectedCourseData?.discountType,
        discountAmount: this.selectedCourseData.isMultiplePrice ? this.selectedPriceData.discountAmount : this.selectedCourseData?.discountAmount,
        unit: this.selectedCourseData.isMultiplePrice ? {
          name: this.selectedPriceData?.name,
          duration: this.selectedPriceData?.duration,
        } : null,
      },
    }

    if (this.dataForm.value.isPartialPaymentOrder) {
      mData = {
        ...mData,
        ...{
          isPartialPaymentOrder: this.dataForm.value.isPartialPaymentOrder,
          partialAmount: this.dataForm.value.partialAmount,
        }
      }
    } else if (this.dataForm.value.isFreeOrder) {
      mData = {
        ...mData,
        ...{
          isFreeOrder: this.dataForm.value.isFreeOrder,
          partialAmount: 0,
        }
      }
    } else {
      this.uiService.warn('You can only add partial or free order. Please select one.');
      return;
    }

    this.addOrder(mData);

  }


  /**
   * HTTP REQ HANDLE
   * getAllCourses()
   * getUserById()
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

  private getUserById() {
    this.subDataTwo = this.userDataService.getUserById(this.userId).subscribe((res) => {
        if (res.success) {
          this.user = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getCourseById(id: string) {
    this.subDataTwo = this.courseService.getCourseById(id)
      .subscribe(res => {
        if (res.success) {
          this.selectedCourseData = res.data;
        }
      }, error => {
        console.log(error);
      });
  }

  private addOrder(data: any) {
    this.subDataThree = this.orderService.addOrder(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        if (res.success) {
          this.order_id = res.data?._id;
          this.isAddedOrder = true;
        }
      }, error => {
        console.log(error);
      });
  }

  /**
   * Selection Methods
   * onCourseSelect()
   * onPriceSelect()
   */

  onCourseSelect(event: MatSelectChange) {
    this.getCourseById(event.value);
  }

  onPriceSelect(event: MatSelectChange) {
    this.selectedPriceData = this.selectedCourseData.prices.find(f => f._id === event.value);
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


  onCopyUrl(event: boolean) {
    this.uiService.success('Order payment link copied.')
  }

  protected readonly onchange = onchange;

  onFreeOrderCheckChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.dataForm.patchValue({isPartialPaymentOrder: false, partialAmount: null})
    }
  }

  onPartialOrderCheckChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.dataForm.patchValue({isFreeOrder: false})
    }
  }
}
