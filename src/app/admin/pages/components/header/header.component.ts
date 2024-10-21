import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminService} from '../../../../services/admin/admin.service';
import {Admin} from '../../../../interfaces/core/admin';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavNavToggle = new EventEmitter();

  // Store Data
  adminData: Admin = null;
  notifications: Notification[] = [];

  // Subscriptions
  private subDataOne: Subscription;


  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    this.getLoggedInAdminData();
    // this.getNotificationFromEvent();
  }


  onToggleSidenav() {
    this.sidenavNavToggle.emit();
  }

  adminLogOut() {
    this.adminService.adminLogOut();
  }

  /**
   * HTTP Req Handle
   * Get Logged In Admin Info
   */
  private getLoggedInAdminData() {
    const select = 'username profileImg'
    this.subDataOne = this.adminService.getLoggedInAdminData(select)
      .subscribe(res => {
        this.adminData = res.data;
      }, error => {
        console.log(error)
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
