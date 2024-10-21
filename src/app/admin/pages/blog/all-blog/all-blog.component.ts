import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, EMPTY } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminPermissions } from 'src/app/enum/admin-permission.enum';
import { Blog } from 'src/app/interfaces/common/blog.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { AdminService } from 'src/app/services/admin/admin.service';
import { BlogService } from 'src/app/services/common/blog.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { UtilsService } from 'src/app/services/core/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.scss']
})
export class AllBlogComponent implements OnInit {

// Admin Base Data
adminId: string;
role: string;
permissions: AdminPermissions[];

// Store Data
toggleMenu: boolean = false;
blogs: Blog[] = [];
holdPrevData: Blog[] = [];
blogCount = 0;
id?: string;

// Selected Data
selectedIds: string[] = [];
@ViewChild('matCheckbox') matCheckbox: MatCheckbox;

// Date
today = new Date();
dataFormDateRange = new FormGroup({
  start: new FormControl(),
  end: new FormControl(),
});

// Search Area
@ViewChild('searchForm') searchForm: NgForm;
searchQuery = null;
searchBlog: Blog[] = [];


// Pagination
currentPage = 1;
totalBlogs = 0;
BlogsPerPage = 5;
totalBlogsStore = 0;

// FilterData
filter: any = null;
sortQuery: any = null;
activeFilter1: number = null;
activeFilter2: number = null;
activeSort: number;
number = [{ num: '10' }, { num: '25' }, { num: '50' }, { num: '100' }];



// Subscriptions
private subDataOne: Subscription;
private subDataTwo: Subscription;
private subDataThree: Subscription;
private subForm: Subscription;
private subRouteOne: Subscription;
private subReload: Subscription;

constructor(
  private adminService: AdminService,
  private blogService: BlogService,
  private uiService: UiService,
  private utilsService: UtilsService,
  private router: Router,
  private dialog: MatDialog,
  private spinner: NgxSpinnerService,
  private reloadService: ReloadService,
  private activatedRoute: ActivatedRoute,

) {}

ngOnInit(): void {
  // Reload Data
  this.subReload = this.reloadService.refreshData$.subscribe(() => {
    this.getAllBlog();
  });

  // GET PAGE FROM QUERY PARAM
  this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
    if (qParam && qParam.get('page')) {
      this.currentPage = Number(qParam.get('page'));
    } else {
      this.currentPage = 1;
    }
    this.getAllBlog();
  });
  // Base Data
  this.getAdminBaseData();


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
          this.searchBlog = [];
          this.blogs = this.holdPrevData;
          this.totalBlogs = this.totalBlogsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.BlogsPerPage),
          currentPage: Number(this.currentPage) - 1,
        };

        // Select
        const mSelect = {
          name: 1,
          image: 1,
          status: 1,
          priority: 1,
          info: 1,
          createdAt: 1,
        };

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: { createdAt: -1 },
        };

        return this.blogService.getAllBlogs(filterData, this.searchQuery);
      })
    )
    .subscribe({
      next: (res) => {
        this.searchBlog = res.data;
        this.blogs = this.searchBlog;
        this.totalBlogs = res.count;
        this.currentPage = 1;
        this.router.navigate([], { queryParams: { page: this.currentPage } });
      },
      error: (error) => {
        console.log(error);
      },
    });
}


/**
 * CHECK ADMIN PERMISSION
 * getAdminBaseData()
 * checkAddPermission()
 * checkDeletePermission()
 * checkEditPermission()
 */

private getAdminBaseData() {
  this.adminId = this.adminService.getAdminId();
  this.role = this.adminService.getAdminRole();
  this.permissions = this.adminService.getAdminPermissions();
}

get checkAddPermission(): boolean {
  return this.permissions.includes(AdminPermissions.CREATE);
}

get checkDeletePermission(): boolean {
  return this.permissions.includes(AdminPermissions.DELETE);
}

get checkEditPermission(): boolean {
  return this.permissions.includes(AdminPermissions.EDIT);
}


/**
 * UI Essentials & Pagination
 * onToggle()
 * onPageChanged()
 */
onToggle() {
  this.toggleMenu = !this.toggleMenu;
}

public onPageChanged(event: any) {
  this.router.navigate([], {queryParams: {page: event}});
}



/**
 * HTTP REQ HANDLE
 * getAllBlogs()
 * deleteMultipleBlogById()
 */

private getAllBlog() {
  // Select
  const mSelect = {
    image: 1,
    name: 1,
    status: 1,
    priority: 1,
    shortDesc: 1,
    createdAt: 1,
    description: 1,
  };

  const filter: FilterData = {
    filter: this.filter,
    pagination: null,
    select: mSelect,
    sort: { createdAt: -1 },
  };

  this.subDataOne = this.blogService.getAllBlogs(filter, null).subscribe({
    next: (res) => {
      if (res.success) {
        this.blogs = res.data;
        this.blogCount = res.count;
        this.holdPrevData = this.blogs;
        this.totalBlogsStore = this.blogCount;
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}


private deleteMultipleBlogById() {
  this.spinner.show();
  this.subDataTwo = this.blogService
    .deleteMultipleBlogById(this.selectedIds)
    .subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          // Get Data array
          const selectedBlog = [];
          this.selectedIds.forEach((id) => {
            const fData = this.blogs.find((data) => data._id === id);
            if (fData) {
              selectedBlog.push(fData);
            }
          });
          const images = selectedBlog.map((m) => m.image);


          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], { queryParams: { page: 1 } });
          } else {
            this.getAllBlog();
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

/**
 * ON Select Check
 * onCheckChange()
 * onAllSelectChange()
 * onSelectShowPerPage()
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
  const currentPageIds = this.blogs.map((m) => m._id);
  if (event.checked) {
    this.selectedIds = this.utilsService.mergeArrayString(
      this.selectedIds,
      currentPageIds
    );
    this.blogs.forEach((m) => {
      m.select = true;
    });
  } else {
    currentPageIds.forEach((m) => {
      this.blogs.find((f) => f._id === m).select = false;
      const i = this.selectedIds.findIndex((f) => f === m);
      this.selectedIds.splice(i, 1);
    });
  }
}

onSelectShowPerPage(val) {
  this.BlogsPerPage = val;
  this.getAllBlog();
}


/**
 * COMPONENT DIALOG VIEW
 * openConfirmDialog()
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
          this.deleteMultipleBlogById();
        }
      });
      break;
    }
    default: {
      break;
    }
  }
}


/**
 * FILTER DATA & Sorting
 * filterData()
 * endChangeRegDateRange()
 * sortData()
 * onRemoveAllQuery()
 */

filterData(value: any, index: number, type: string) {
  switch (type) {
    case 'blog': {
      this.filter = { ...this.filter, ...{ 'blog._id': value } };
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
    this.getAllBlog();
  }
}

endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
  if (event.value) {
    const startDate = this.utilsService.getDateString(
      this.dataFormDateRange.value.start
    );
    const endDate = this.utilsService.getDateString(
      this.dataFormDateRange.value.end
    );

    const qData = { dateString: { $gte: startDate, $lte: endDate } };
    this.filter = { ...this.filter, ...qData };
    // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllBlog();
    }
  }
}

sortData(query: any, type: number) {
  this.sortQuery = query;
  this.activeSort = type;
  this.getAllBlog();
}

onRemoveAllQuery() {
  this.activeSort = null;
  this.activeFilter1 = null;
  this.activeFilter2 = null;
  this.sortQuery = { createdAt: -1 };
  this.filter = null;
  this.dataFormDateRange.reset();
  // Re fetch Data
  if (this.currentPage > 1) {
    this.router.navigate([], { queryParams: { page: 1 } });
  } else {
    this.getAllBlog();
  }
}





/**
 * ON DESTROY
 * ngOnDestroy()
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

  if (this.subForm) {
    this.subForm.unsubscribe();
  }
  if (this.subRouteOne) {
    this.subRouteOne.unsubscribe();
  }
}

}
