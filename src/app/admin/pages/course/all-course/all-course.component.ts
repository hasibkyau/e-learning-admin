import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminPermissions } from '../../../../enum/admin-permission.enum';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { EMPTY, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../../services/admin/admin.service';
import { UiService } from '../../../../services/core/ui.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../../../services/core/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { Pagination } from '../../../../interfaces/core/pagination';
import { FilterData } from '../../../../interfaces/core/filter-data';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { CourseService } from '../../../../services/common/course.service';
import { Course } from '../../../../interfaces/common/course.interface';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Select } from '../../../../interfaces/core/select';
import {PAYMENT_STATUS, PROJECT_STATUS} from '../../../../core/utils/app-data';
import { Category } from '../../../../interfaces/common/course-category.interface';
import { CategoryService } from '../../../../services/common/course-category.service';
import { Tag } from '../../../../interfaces/common/tag.interface';
import { TagService } from '../../../../services/common/tag.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss']
})
export class AllCourseComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];
  selectedStatus = 'all';
  // Static Data
  courseStatus: Select[] = PROJECT_STATUS;
  paymentStatus: Select[] = PAYMENT_STATUS;
  // Store Data
  courses: Course[] = [];
  holdPrevData: Course[] = [];
  courseCategories: Category[] = [];
  tags: Tag[] = [];

  // Pagination
  currentPage = 1;
  totalCourses = 0;
  coursesPerPage = 10;
  totalCoursesStore = 0;

  // SEARCH AREA
  searchCourses: Course[] = [];
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

  activeFilter14: number = null;
  // FilterData
  filter: any = null;

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
    private courseService: CourseService,
    private adminService: AdminService,
    private courseCategoryService: CategoryService,
    private tagService: TagService,
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
        this.getAllCourses(this.filter);
      });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam['page']) {
        this.currentPage = qParam['page'];
      } else {
        this.currentPage = 1;
      }
      this.getAllCourses(this.filter);
    });

    // Base Admin Data
    this.getAdminBaseData();
    this.getAllCourseCategories();
    this.getAllTags();
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
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null) {
          this.searchCourses = [];
          this.courses = this.holdPrevData;
          this.totalCourses = this.totalCoursesStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.coursesPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          slug: 1,
          category: 1,
          subCategory: 1,
          childCategory: 1,
          tag: 1,
          price: 1,
          discountType: 1,
          discountAmount: 1,
          bannerImage: 1,
          status: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.courseService.getAllCourses(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchCourses = res.data;
        this.courses = this.searchCourses;
        this.totalCourses = res.count;
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
    const currentPageIds = this.courses.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.courses.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.courses.find(f => f._id === m).select = false;
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
    this.getAllCourses(this.filter);
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
      this.getAllCourses(this.filter);
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
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllCourses(this.filter);
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
          this.deleteMultipleCourseById();
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
          this.updateMultipleCourseById(data);
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
          this.cloneSingleCourse(data);
        }
      });
    }

  }

  /**
   * HTTP REQ HANDLE
   */

  private getAllCourseCategories() {
    // Select
    const mSelect = {
      name: 1,
    }

    // const ne = {readOnly: { $ne: true }}
    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: { name: 1 }
    }
    this.subDataSix = this.courseCategoryService.getAllCourseCategories(filterData, null)
      .subscribe(res => {
        if (res.success) {
          this.courseCategories = res.data;
        }
      }, error => {
        console.log(error);
      });
  }

  private getAllTags() {
    // Select
    const mSelect = {
      name: 1,
      color: 1,
    }

    // const ne = {readOnly: { $ne: true }}
    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: { name: 1 }
    }

    this.subDataSeven = this.tagService.getAllTags(filterData, null)
      .subscribe(res => {
        if (res.success) {
          this.tags = res.data;
        }
      }, error => {
        console.log(error);
      });
  }

  private getAllCourses(filter:any) {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.coursesPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      category: 1,
      subCategory: 1,
      childCategory: 1,
      tag: 1,
      price: 1,
      totalSold: 1,
      discountType: 1,
      discountAmount: 1,
      status: 1,
      bannerImage: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.courseService.getAllCourses(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.courses = res.data;
        if (this.courses && this.courses.length) {
          this.courses.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.courses[i].select = index !== -1;
          });

          this.totalCourses = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalCoursesStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private cloneSingleCourse(id: string) {
    this.spinner.show();
    this.subDataEight = this.courseService.cloneSingleCourse(id)
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
   * ADMIN BASE DATA
   */
  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.courses.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteCourseById(id: string) {
    this.spinner.show();
    this.subDataFive = this.courseService.deleteCourseById(id, false)
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

  private deleteMultipleCourseById() {
    this.spinner.show();
    this.subDataFour = this.courseService.deleteMultipleCourseById(this.selectedIds, true)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], { queryParams: { page: 1 } });
          } else {
            this.getAllCourses(this.filter);
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleCourseById(data: any) {
    this.spinner.show();
    this.subDataThree = this.courseService.updateMultipleCourseById(this.selectedIds, data)
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

      const qData = { createdAt: { $gte: startDate, $lte: endDate } };
      this.filter = { ...this.filter, ...qData };
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllCourses(this.filter);
      }
    }
  }

  filterCourseList(type: string, filter: any) {
    this.filter = filter;
    this.selectedStatus = type;
    this.getAllCourses(this.filter);
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
