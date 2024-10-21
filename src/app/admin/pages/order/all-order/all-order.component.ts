
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, pluck, debounceTime, distinctUntilChanged, switchMap, EMPTY } from 'rxjs';
import {PAYMENT_STATUS, PROJECT_STATUS} from 'src/app/core/utils/app-data';
import { AdminPermissions } from 'src/app/enum/admin-permission.enum';
import { Order } from 'src/app/interfaces/common/order.interface';
import { Tag } from 'src/app/interfaces/common/tag.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { Select } from 'src/app/interfaces/core/select';
import { AdminService } from 'src/app/services/admin/admin.service';
import { OrderService } from 'src/app/services/common/order.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { UtilsService } from 'src/app/services/core/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.scss']
})
export class AllOrderComponent implements OnInit {

  // Admin Base Data
  adminId: string;
  isLoading: boolean = false;
  role: string;
  permissions: AdminPermissions[];
  paymentStatus: Select[] = PAYMENT_STATUS;
  // Static Data
  orderStatus: Select[] = PROJECT_STATUS;
  selectedStatus = 'all';

  // Store Data
  orders: Order[] = [];
  holdPrevData: Order[] = [];
  tags: Tag[] = [];

  // Pagination
  currentPage = 1;
  totalOrders = 0;
  ordersPerPage = 10;
  totalOrdersStore = 0;

  // SEARCH AREA
  searchOrders: Order[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Sort
  sortQuery = { createdAt: -1 };
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;

  // FilterData
  filter: any = null;
  isFilterForPayment: string = null;

  // Date Range
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subDataEight: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.subReload = this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllOrders(this.filter);
      });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam['page']) {
        this.currentPage = qParam['page'];
      } else {
        this.currentPage = 1;
      }
      this.getAllOrders(this.filter);
    });

    // Base Admin Data
    this.getAdminBaseData();
  }

  /**
   * CHECK ADMIN PERMISSION
   */
  get checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  get checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue.pipe(
      // map(t => t.searchTerm)
      // filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null) {
          this.searchOrders = [];
          this.orders = this.holdPrevData;
          this.totalOrders = this.totalOrdersStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.ordersPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          orderItem: 1,
          orderType: 1,
          name: 1,
          phone: 1,
          phoneNo: 1,
          grandTotal: 1,
          paidAmount: 1,
          totalSold: 1,
          liveCourseCode: 1,
          paymentStatus: 1,
          orderStatus: 1,
          status: 1,
          priority: 1,
          createdAt: 1,
          isPartialPaymentOrder:1,
          isFreeOrder:1,
          checkoutDate:1,
          email:1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: null,
          select: mSelect,
          sort: this.sortQuery
        }
        console.log('this.searchQuery', this.searchQuery)
        return this.orderService.getAllOrders(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        console.log('res', res)
        this.searchOrders = res.data;
        this.orders = this.searchOrders;
        this.totalOrders = res.count;
        this.currentPage = 1;
        this.router.navigate([], { queryParams: { page: this.currentPage } });
      }, error => {
        console.log(error)
      });
  }

  /**
   * ON Select Check
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex(f => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.orders.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.orders.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.orders.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllOrders(this.filter);
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'status': {
        this.filter = { ...this.filter, ...{ status: value } };
        this.activeFilter1 = index;
        break;
      }
      case 'paymentStatus': {
        if (value === 'free') {
          this.filter = {...this.filter, ...{isFreeOrder: true}};
        } else {
          this.filter = {...this.filter, ...{paymentStatus: value}};
        }
        this.activeFilter1 = index;
        this.isFilterForPayment = value;
        break;
      }
      case 'category': {
        this.filter = { ...this.filter, ...{ 'category._id': value } };
        this.activeFilter2 = index;
        break;
      }
      case 'tag': {
        this.filter = { ...this.filter, ...{ 'tag._id': value } };
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllOrders(this.filter);
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = { createdAt: -1 };
    this.filter = null;
    this.isFilterForPayment = null;
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllOrders(this.filter);
    }
  }


  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(type: string, data?: any) {
    if (type === 'delete') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want delete this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteMultipleOrderById();
        }
      });
    } else if (type === 'edit') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Edit',
          message: 'Are you sure you want edit this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.updateMultipleOrderById(data);
        }
      });

    } else if ('clone') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Clone',
          message: 'Are you sure you want clone this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.cloneSingleOrder(data);
        }
      });
    }

  }

  /**
   * HTTP REQ HANDLE
   */




  private getAllOrders(filter: any) {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.ordersPerPage),
      currentPage: Number(this.currentPage) - 1
    };


    // Select
    const mSelect = {
      orderItem: 1,
      orderType: 1,
      name: 1,
      phone: 1,
      phoneNo: 1,
      grandTotal: 1,
      paidAmount: 1,
      totalSold: 1,
      liveCourseCode: 1,
      approveStatus: 1,
      paymentStatus: 1,
      orderStatus: 1,
      status: 1,
      priority: 1,
      createdAt: 1,
      isPartialPaymentOrder:1,
      isFreeOrder:1,
      checkoutDate:1,
      email:1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.orderService.getAllOrders(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.orders = res.data;
        if (this.orders && this.orders.length) {
          this.orders.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.orders[i].select = index !== -1;
          });

          this.totalOrders = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalOrdersStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private cloneSingleOrder(id: string) {
    this.spinner.show();
    this.subDataEight = this.orderService.cloneSingleOrder(id)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  /**
   * HTTP REQUEST HANDLE
   * deleteProductByUser()
   */

  statusChange(id:string, approved: string) {
    const data = {
      approveStatus: approved
    }
    this.updateOrderById(id,data)
  }

  private updateOrderById(id: string, data: any) {
    this.isLoading = true;
    this.subDataOne = this.orderService.updateOrderStatusById(id, data).subscribe(
      (res) => {
        if (res.success) {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    )
  }


  /**
   * ADMIN BASE DATA
   */
  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.orders.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteOrderById(id: string) {
    this.spinner.show();
    this.subDataFive = this.orderService.deleteOrderById(id, false)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteMultipleOrderById() {
    this.spinner.show();
    this.subDataFour = this.orderService.deleteMultipleOrderById(this.selectedIds, true)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], { queryParams: { page: 1 } });
          } else {
            this.getAllOrders(this.filter);
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleOrderById(data: any) {
    this.spinner.show();
    this.subDataThree = this.orderService.updateMultipleOrderById(this.selectedIds, data)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message)
        }
      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  /**
   * FILTER DATA With Date Range
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(this.dataFormDateRange.value.start);
      const endDate = this.utilsService.getDateString(this.dataFormDateRange.value.end);

      const qData = { checkoutDate: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllOrders(this.filter);
      }
    }
  }



  filterOrderList(type: string, filter: any) {
    this.filter = filter;
    this.selectedStatus = type;
    this.getAllOrders(this.filter);
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
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
  }


}
