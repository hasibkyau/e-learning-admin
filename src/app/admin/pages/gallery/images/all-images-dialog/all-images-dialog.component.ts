import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminPermissions} from '../../../../../enum/admin-permission.enum';
import {Select} from '../../../../../interfaces/core/select';
import {FILE_TYPES} from '../../../../../core/utils/app-data';
import {NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {ReloadService} from '../../../../../services/core/reload.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../../../services/core/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {FilterData} from '../../../../../interfaces/core/filter-data';
import {ConfirmDialogComponent} from '../../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {GalleryService} from '../../../../../services/gallery/gallery.service';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {FileFolder} from '../../../../../interfaces/gallery/file-folder.interface';
import {FileFolderService} from '../../../../../services/gallery/file-folder.service';
import {UploadImageComponent} from '../upload-image/upload-image.component';
import {FileUploadService} from '../../../../../services/gallery/file-upload.service';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import {EditGalleryInfoComponent} from '../../edit-gallery-info/edit-gallery-info.component';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'all-images-dialog',
  templateUrl: './all-images-dialog.component.html',
  styleUrls: ['./all-images-dialog.component.scss']
})
export class AllImagesDialogComponent implements OnInit, AfterViewInit, OnDestroy {


  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  galleries: Gallery[] = [];
  holdPrevData: Gallery[] = [];
  fileFolders: FileFolder[] = [];

  // Static Data
  fileTypes: Select[] = FILE_TYPES;

  // Pagination
  currentPage = 1;
  totalGalleries = 0;
  galleriesPerPage = 24;
  totalGalleriesStore = 0;

  // SEARCH AREA
  searchGalleries: Gallery[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  selectedImages: Gallery[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;


  // Sort
  sortQuery = {createdAt: -1};
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private galleryService: GalleryService,
    private fileFolderService: FileFolderService,
    private fileUploadService: FileUploadService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<AllImagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string, count?: number}
  ) {
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
          this.searchGalleries = [];
          this.galleries = this.holdPrevData;
          this.totalGalleries = this.totalGalleriesStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: any = {
          pageSize: Number(this.galleriesPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          url: 1,
          folder: 1,
          type: 1,
          size: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: {...this.filter, ...{type: 'image'}},
          select: mSelect,
          sort: this.sortQuery
        }
        return this.galleryService.getAllGalleries(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchGalleries = res.data;
        this.galleries = this.searchGalleries;
        this.totalGalleries = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
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
    const currentPageIds = this.galleries.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.galleries.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.galleries.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }


  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllGalleries();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'folder': {
        this.filter = {...this.filter, ...{folder: value}};
        this.activeFilter1 = index;
        break;
      }
      case 'type': {
        this.filter = {...this.filter, ...{type: value}};
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllGalleries();
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    this.selectedIds = [];
    this.selectedImages = [];
    this.searchForm.resetForm();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllGalleries();
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

  ngOnInit(): void {

    this.subReload = this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllGalleries();
      });

    // Base Admin Data
    this.getAdminBaseData();

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam['page']) {
        this.currentPage = qParam['page'];
      } else {
        this.currentPage = 1;
      }
      this.getAllGalleries();
    });

    // Base Data
    this.getAllFileFolders();
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openComponentDialog() {
    this.dialog.open(UploadImageComponent, {
      data: this.fileFolders,
      panelClass: ['theme-dialog', 'dialog-no-radius'],
      maxWidth: '1080px',
      maxHeight: '580px',
      height: '100%',
      width: '100%',
      autoFocus: false,
      disableClose: false,
    });
  }

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
          this.deleteMultipleGalleryById();
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
          this.updateMultipleGalleryById(data);
        }
      });

    }

  }

  /**
   * COMPONENT DIALOG VIEW
   */

  openAddNewFolderDialog() {
    const dialogRef = this.dialog.open(EditGalleryInfoComponent, {
      data: {
        gallery: this.selectedImages[0],
        folders: this.fileFolders
      },
      panelClass: ['theme-dialog'],
      width: '95%',
      maxWidth: '480px',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.selectedIds = [];
        this.selectedImages = [];
      }
    });
  }

  /**
   * HTTP REQ HANDLE
   */

  private getAllGalleries() {
    this.spinner.show();
    const pagination: any = {
      pageSize: Number(this.galleriesPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      url: 1,
      folder: 1,
      type: 1,
      size: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: {...{type: 'image'}, ...this.filter},
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.galleryService.getAllGalleries(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.galleries = res.data;
        if (this.galleries && this.galleries.length) {
          this.galleries.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.galleries[i].select = index !== -1;
          });

          this.totalGalleries = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalGalleriesStore = res.count;
          }

          // this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private getAllFileFolders() {
    // Select
    const mSelect = {
      name: 1,
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }

    this.subDataSix = this.fileFolderService.getAllFileFolders(filterData, null)
      .subscribe(res => {
        this.fileFolders = res.data;
      }, error => {
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
    this.galleries.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteGalleryById(id: string) {
    this.spinner.show();
    this.subDataFive = this.galleryService.deleteGalleryById(id)
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
   * onSelectImage
   * removeSelectImage
   */

  onSelectImage(image: Gallery) {

    const index = this.selectedImages.findIndex(x => x._id === image._id);

    if (index === -1) {

      if (this.data.type === 'single' && this.selectedImages.length === 1) {
        this.uiService.warn('Please select a single image');
        return;
      }

      if (this.data.type === 'multiple' && this.selectedImages.length === this.data.count) {
        this.uiService.warn(`You can select only ${ this.data.count} images.`);
        return;
      }

      this.selectedIds.push(image._id);
      this.selectedImages.push(image);

    } else {
      const i = this.selectedIds.findIndex(f => f === image._id);
      this.selectedIds.splice(i, 1);
      this.removeSelectImage(image);
    }
  }

  removeSelectImage(s: Gallery, event?: any) {
    if (event) {
      event.stopPropagation();
    }
    const index = this.selectedImages.findIndex(x => x._id === s._id);
    this.selectedImages.splice(index, 1);
  }

  checkSelected(data: Gallery) {
    const index = this.selectedImages.findIndex(x => x._id === data._id);
    return index === -1;
  }

  private updateMultipleGalleryById(data: any) {
    this.spinner.show();
    this.subDataThree = this.galleryService.updateMultipleGalleryById(this.selectedIds, data)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.selectedImages = [];
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

  private deleteMultipleGalleryById() {
    this.spinner.show();
    this.subDataFour = this.galleryService.deleteMultipleGalleryById(this.selectedIds)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          // Get Image Urls
          const urls = this.galleries.filter((item) => {
            return this.selectedIds.indexOf(item._id) != -1;
          }).map(m => m.url);
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllGalleries();
          }
          // Delete File Also
          this.selectedIds = [];
          this.selectedImages = [];
          this.deleteMultipleFile(urls);
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private deleteMultipleFile(data: string[]) {
    this.fileUploadService.deleteMultipleFile(data)
      .subscribe(res => {
        // TODO IF NEED HANDLE DELETE
      }, error => {
        console.log(error)
      })
  }

  /**
   * ON CLOSE DIALOG
   */
  onCloseDialog() {
    this.dialogRef.close({data: this.selectedImages});
    this.router.navigate([], {queryParams: null});
    this.spinner.hide();
  }

}
