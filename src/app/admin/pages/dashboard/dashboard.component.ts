import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {DashboardService} from '../../../services/common/dashboard.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {AdminDashboard} from '../../../interfaces/common/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Store Data
  adminDashboard: AdminDashboard = null;

  // Subscriptions
  private subDataOne: Subscription;


  constructor(
    private router: Router,
    private adminService: AdminService,
    private dashboardService: DashboardService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.getAdminDashboard()
  }

  /**
   * HTTP REQ HANDLE
   * getTaskById()
   */
  private getAdminDashboard() {
    // this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataOne = this.dashboardService.getAdminDashboard()
      .subscribe(res => {
        // this.spinnerService.hide();
        if (res.success) {
          this.adminDashboard = res.data;
        }
      }, error => {
        // this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
