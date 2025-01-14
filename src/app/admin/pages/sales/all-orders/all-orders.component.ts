import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, pluck, switchMap,} from 'rxjs/operators';
import {UpdateOrderStatusComponent} from '../update-order-status/update-order-status.component';
import * as XLSX from 'xlsx';


import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AdminService} from "../../../../services/admin/admin.service";
import {
  CITIES,
  MONTHS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_TYPES,
  REPORT_FILTER
} from "../../../../core/utils/app-data";
import {AdminPermissions} from "../../../../enum/admin-permission.enum";
import {DashboardService} from "../../../../services/common/dashboard.service";
import {Admin} from "../../../../interfaces/core/admin";
import {NgClassService} from "../../../../services/core/ng-class.service";
import {YEARS} from "../../../../core/utils/birthdate";
import {UiService} from "../../../../services/core/ui.service";
import {Pagination} from "../../../../interfaces/core/pagination";
import {ConfirmDialogComponent} from "../../../../shared/components/ui/confirm-dialog/confirm-dialog.component";
import {Select} from "../../../../interfaces/core/select";
import {UtilsService} from "../../../../services/core/utils.service";
import {FilterData} from "../../../../interfaces/core/filter-data";
import {ReloadService} from "../../../../services/core/reload.service";
import {Order} from "../../../../interfaces/common/procuct-order.interface";
import {ProductOrderService} from "../../../../services/common/product-order.service";


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];
  // orderDashboard: OrderDashboard = null;
  // Store Data
  admin?: Admin;
  // years: Select[] = YEARS;
  months: Select[] = MONTHS;
  calculation: any = null;
  count: any = null;
  showCalculation: boolean = false;
  // couriers: Courier[] = [];
  orders: Order[] = [];
  holdPrevData: Order[] = [];
  toggleMenu: boolean = false;
  showPerPageList = [
    { num: '25' },
    { num: '50' },
    { num: '100' },
    { num: '500' },
    { num: '1000' },
  ];

  // Pagination
  currentPage = 1;
  totalOrders = 0;
  ordersPerPage = 30;
  totalOrdersStore = 0;

  // SEARCH AREA
  searchOrders: any[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // FilterData
  cities: string[] = CITIES;
  paymentTypes: Select[] = PAYMENT_TYPES;
  paymentStatus: Select[] = PAYMENT_STATUS;
  orderStatus: Select[] = ORDER_STATUS;
  dateByReport: Select[] = REPORT_FILTER;

  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  dataFormDeliveryRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Sort
  sortQuery = { createdAt: -1 };
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeFilter3: number = null;
  activeFilter4: number = null;
  activeFilter5: number = null;
  activeFilter6: number = null;
  activeFilter7: number = null;
  activeFilter8: number = null;

  // FilterData
  filter: any = null;

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
    private orderService: ProductOrderService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dashboardService: DashboardService,
    public ngClassService: NgClassService
  ) {}

  ngOnInit(): void {
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllOrders();
    });

    // Base Admin Data
    this.getAdminBaseData();

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe((qParam) => {
      if (qParam && qParam['page']) {
        this.currentPage = qParam['page'];
      } else {
        this.currentPage = 1;
      }
      this.getAllOrders();
    });
    // this.getOrderDashboard();
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue
      .pipe(
        // map(t => t.searchTerm)
        // filter(() => this.searchForm.valid),
        pluck('searchTerm'),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((data) => {
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
            currentPage: Number(this.currentPage) - 1,
          };
          // Select
          const mSelect = {
            name: 1,
            orderId: 1,
            phoneNo: 1,
            city: 1,
            paymentType: 1,
            grandTotal: 1,
            checkoutDate: 1,
            orderStatus: 1,
            paymentStatus: 1,
            createdAt: 1,
            deliveryDate: 1,
            preferredDate: 1,
            preferredTime: 1,
            preferredDateString: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: this.sortQuery,
          };
          return this.orderService.getAllOrders(filterData, this.searchQuery);
        })
      )
      .subscribe(
        (res) => {
          this.searchOrders = res.data;
          this.orders = this.searchOrders;
          this.totalOrders = res.count;
          this.currentPage = 1;
          this.router.navigate([], { queryParams: { page: this.currentPage } });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * CHECK ADMIN PERMISSION
   * checkAddPermission()
   * checkDeletePermission()
   * checkEditPermission()
   * getAdminBaseData()
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
  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  /**
   * ON Select Check
   * onCheckChange()
   * onAllSelectChange()
   * checkSelectionData()
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex((f) => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.orders.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.orders.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.orders.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }
  private checkSelectionData() {
    let isAllSelect = true;
    this.orders.forEach((m) => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  // getOrderDashboard() {
  //   this.subDataOne = this.dashboardService.getOrderDashboard()
  //     .subscribe({
  //       next: (res) => {
  //         this.orderDashboard = res.data;
  //
  //       },
  //       error: (err) => {
  //         console.log(err)
  //       }
  //     })
  // }

  /**
   * FILTER DATA With Date Range
   * endChangeRegDateRange()
   * endChangeDeliveryDateRange()
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getNextDateString(
        this.dataFormDateRange.value.end,
        1
      );

      const qData = { checkoutDate: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };


      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllOrders();
      }
    }
  }

  endChangeDeliveryDateRange(event: MatDatepickerInputEvent<any>) {

    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDeliveryRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDeliveryRange.value.end
      );

      const qData = { preferredDateString: { $gte: startDate, $lte: endDate } };

      this.filter = { ...this.filter, ...qData };


      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllOrders();
      }
    }
  }

  onChangeShowCalculation(event: any) {
    this.showCalculation = event;
    localStorage.setItem('showCalculation', String(this.showCalculation));
  }
  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllOrders();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'paymentStatus': {
        this.filter = { ...this.filter, ...{ paymentStatus: value } };
        this.activeFilter1 = index;
        break;
      }
      case 'paymentType': {
        this.filter = { ...this.filter, ...{ paymentType: value } };
        this.activeFilter2 = index;
        break;
      }
      case 'orderStatus': {
        this.filter = { ...this.filter, ...{ orderStatus: value } };
        this.activeFilter3 = index;
        break;
      }
      case 'city': {
        this.filter = { ...this.filter, ...{ city: value } };
        this.activeFilter4 = index;
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
      this.getAllOrders();
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.activeFilter3 = null;
    this.activeFilter4 = null;
    this.sortQuery = { createdAt: -1 };
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllOrders();
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllOrders()
   * deleteMultipleOrderById()
   * changeOrderStatus()
   */

  private getAllOrders() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.ordersPerPage),
      currentPage: Number(this.currentPage) - 1,
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      orderId: 1,
      phoneNo: 1,
      city: 1,
      paymentType: 1,
      grandTotal: 1,
      courierLink: 1,
      orderedItems: 1,
      checkoutDate: 1,
      orderStatus: 1,
      paymentStatus: 1,
      createdAt: 1,
      deliveryDate: 1,
      preferredDate: 1,
      preferredTime: 1,
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subDataOne = this.orderService
      .getAllOrders(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.orders = res.data;
          this.count = res.count;
          if (this.orders && this.orders.length) {
            this.orders.forEach((m, i) => {
              const index = this.selectedIds.findIndex((f) => f === m._id);
              this.orders[i].select = index !== -1;
            });

            this.totalOrders = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalOrdersStore = res.count;
            }

            this.checkSelectionData();
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }


  private deleteMultipleOrderById() {
    this.spinner.show();
    this.subDataFour = this.orderService
      .deleteMultipleOrderById(this.selectedIds)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            if (this.currentPage > 1) {
              this.router.navigate([], { queryParams: { page: 1 } });
            } else {
              this.getAllOrders();
            }
          } else {
            this.uiService.warn(res.message);
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }

  private changeOrderStatus(id: string, data: any) {
    this.spinner.show();
    this.subDataThree = this.orderService.changeOrderStatus(id, data).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  private changeOrderMultiStatus(id: string, data: any) {
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
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   * openUpdateOrderStatusDialog()
   */
  public openConfirmDialog(type: string) {
    switch (type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.deleteMultipleOrderById();
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  public openUpdateOrderStatusDialog(order: Order) {
    const dialogRef = this.dialog.open(UpdateOrderStatusComponent, {
      width: '95%',
      maxWidth: '480px',
      data: order,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.data) {
          console.log('dialogResult.data',dialogResult.data);
          this.changeOrderStatus(order._id, dialogResult.data);
        }
      }
    });
  }


  // open  Update Multi Order Status Dialogs

  public openUpdateOrderStatusDialogs(order: Order) {
    const dialogRef = this.dialog.open(UpdateOrderStatusComponent, {
      width: '95%',
      maxWidth: '480px',
      data:  {order: order, orderStatus: this.orderStatus}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data) {
          this.changeOrderMultiStatus(order?._id, dialogResult.data);
        }
      }
    });

  }

  /**
   * EXPORTS TO EXCEL
   * exportToExcel()
   */
  exportToExcel() {
    this.spinner.show();
    // Select
    const mSelect = {
      name: 1,
      email: 1,
      orderId: 1,
      phoneNo: 1,
      city: 1,
      grandTotal: 1,
      checkoutDate: 1,
      orderStatus: 1,
      paymentStatus: 1,
      paymentType: 1,
      createdAt: 1,
      shippingAddress: 1,
      deliveryDate: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subDataOne = this.orderService
      .getAllOrders(filterData, this.searchQuery)
      .subscribe(
        (res) => {

          this.spinner.hide();
          const subscriptionReports = res.data;
          const date = this.utilsService.getDateString(new Date());
          const mData = subscriptionReports.map((m) => {
            return {
              orderId: m.orderId,
              phoneNo: m.phoneNo,
              name: m.name,
              email: m.email ? m.email : 'n/a',
              orderAt: m.checkoutDate,
              deliveryAt: m.deliveryDate ? m.deliveryDate : 'n/a',
              city: m.city,
              shippingAddress: m.shippingAddress,
              paymentType: m.paymentType,
              paymentStatus: m.paymentStatus,
              orderStatus: m.orderStatus,
              grandTotal: m.grandTotal,
              createdAt: this.utilsService.getDateString(m.createdAt),
            };
          });


          // EXPORT XLSX
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Data');
          XLSX.writeFile(wb, `Products_Reports_${date}.xlsx`);
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }



  /**
   * EXPORTS TO EXCEL
   * exportToExcel()
   */


  exportToAllExcel() {
    // let dataArray:any[] = [];
    const date = this.utilsService.getDateString(new Date());
    if (this.selectedIds.length) {
      const dataArray = [];
      this.selectedIds.forEach(id => {
        const data = this.orders.find(f => f._id === id);
        dataArray.push(data);
      })
      console.log('dataArray',dataArray)
      const mData = dataArray.map((m) => {
        return {
          'Order Id': m?.orderId ?? '-',
          'Customer': m?.name ?? '-',
          'Phone No': m?.phoneNo ?? '-',
          'Medicine': m?.orderedItems.map(p => p.name).join() ?? '-',
          // 'Quantity': m?.orderedItems.map(p => p.quantity).join() ?? '-',
          // 'MRP': m?.orderedItems.map(p => p.regularPrice).join() ?? '-',
          // 'Discount Type': m?.orderedItems.map(p => p.discountType).join() ?? '-',
          // 'Discount Amount': m?.orderedItems.map(p => p.discountAmount).join() ?? '-',
          // 'Sub Total': m?.subTotal ?? '-',
          // 'Products Discount': m?.productDiscount ?? '-',
          // 'Products Price': (m.subTotal - m.productDiscount - m.discount) ?? '-',
          'Grand Total': m?.grandTotal ?? '-',
          'Payment Type': m?.paymentType ?? '-',
          'Payment Status': m?.paymentStatus ?? '-',
          // 'Delivery Charge': m?.deliveryCharge ?? '-',
          // 'Delivery Type': m?.orderType ?? '-',
          'Delivery Status': m?.orderStatus ?? '-',
          // 'Admin Profit': m?.adminProfit ?? '-',
          'Created Date': this.utilsService.getDateString(m?.createdAt),
        };
      });

      // EXPORT XLSX
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `Transaction_Orders_${date}.xlsx`);

    } else {
      // Select
      const mSelect = {
        name: 1,
        orderId: 1,
        phoneNo: 1,
        city: 1,
        paymentType: 1,
        grandTotal: 1,
        checkoutDate: 1,
        orderStatus: 1,
        paymentStatus: 1,
        createdAt: 1,
        deliveryDate: 1,
        preferredDate: 1,
        preferredTime: 1,
        orderType: 1,
        orderedItems: 1,
        adminProfit: 1,
        pharmacyPayable: 1,
        discount: 1,
        deliveryCharge: 1,
        subTotal: 1,
        productDiscount: 1,
      };

      const filter: FilterData = {
        filter: this.filter,
        pagination: null,
        select: mSelect,
        sort: this.sortQuery,
      };

      this.orderService.getAllOrders(filter, null).subscribe({
        next: (res) => {
          if (res.success) {
            console.log('res',res.data);
            const mData = res.data.map((m) => {
              return {
                'Order Id': m?.orderId ?? '-',
                'Customer': m?.name ?? '-',
                'Phone No': m?.phoneNo ?? '-',
                'Medicine': m?.orderedItems.map(p => p.name).join() ?? '-',
                'Quantity': m?.orderedItems.map(p => p.quantity).join() ?? '-',
                // 'MRP': m?.orderedItems.map(p => p.regularPrice).join() ?? '-',
                // 'Discount Type': m?.orderedItems.map(p => p.discountType).join() ?? '-',
                // 'Discount Amount': m?.orderedItems.map(p => p.discountAmount).join() ?? '-',
                // 'Sub Total': m?.subTotal ?? '-',
                // 'Products Discount': m?.productDiscount ?? '-',
                // 'Products Price': (m.subTotal - m.productDiscount - m.discount) ?? '-',
                'Grand Total': m?.grandTotal ?? '-',
                'Payment Type': m?.paymentType ?? '-',
                'Payment Status': m?.paymentStatus ?? '-',
                'Delivery Charge': m?.deliveryCharge ?? '-',
                // 'Delivery Type': m?.orderType ?? '-',
                'Delivery Status': m?.orderStatus ?? '-',
                'Created Date': this.utilsService.getDateString(m?.createdAt),
              };
            });

            // EXPORT XLSX
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');
            XLSX.writeFile(wb, `Transaction_Orders_${date}.xlsx`);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  }

  /**
   *onSelectShowPerPage()
   */

  onSelectShowPerPage(val) {
    this.ordersPerPage = val;
    this.getAllOrders();
  }

  /**
   * UI Essentials
   * onToggle()
   */
  onToggle() {
    console.log('Click');
    this.toggleMenu = !this.toggleMenu;
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
    if (this.subDataEight) {
      this.subDataEight.unsubscribe();
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
  }
}
