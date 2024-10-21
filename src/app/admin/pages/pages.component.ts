import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Meta} from '@angular/platform-browser';
import {MenuCtrService} from '../../services/core/menu-ctr.service';
import {NavigationEnd, Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';
import {SideMenu} from '../../interfaces/core/side-menu';
import {menuItemsEditorAdmin, menuItemsSuperAdmin} from '../../core/utils/admin-menu';
import {AdminRolesEnum} from '../../enum/admin.roles.enum';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {

  @Output() @ViewChild('sidenav', {static: true}) sidenav;
  @Input() isAdminMenu = false;
  @Input() sideNavMenuList: any[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        return result.matches;
      })
    );

  isMidDevice$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => {
        return result.matches;
      })
    );

  // Store Data
  menuList: SideMenu[] = [];

  // Socket IO Variables
  // notificationNs: SocketNamespace;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private meta: Meta,
    private menuCtrService: MenuCtrService,
    private router: Router,
    private adminService: AdminService,
    // private socketIoService: SocketIoService,
  ) {
    // Init Socket Namespace
    // this.socketIoService.initSocketConnection();
    // this.notificationNs = this.socketIoService.notificationNamespace;
  }

  ngOnInit() {
    // Google No Index
    this.googleNoIndex();

    // this.menuList = menuItemsSuperAdmin;

    const role = this.adminService.getAdminRole();
    switch (role) {
      case AdminRolesEnum.SUPER_ADMIN: {
        this.menuList = menuItemsSuperAdmin;
        break;
      }
      case AdminRolesEnum.ADMIN: {
        this.menuList = menuItemsSuperAdmin;
        break;
      }
      case AdminRolesEnum.EDITOR: {
        this.menuList = menuItemsEditorAdmin;
        break;
      }
      default: {
        this.menuList = [];
        break;
      }
    }

    // Join to Socket
    // this.joinNotificationRoom();
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth <= 599) {
          this.sidenav.close();
        }
      }
    });
    this.menuCtrService.expandActiveSubMenuAdmin(this.menuList);
  }


  /**
   * SEO TITLE
   * SEO META TAGS
   */

  private googleNoIndex() {
    this.meta.updateTag({name: 'robots', content: 'noindex'});
    this.meta.updateTag({name: 'googlebot', content: 'noindex'});
  }

  /**
   * SOCKET WITH NAMESPACE EVENTS
   * joinNotificationRoom()
   */

  joinNotificationRoom() {
    // this.notificationNs.emit(SOCKET_EVENT.joinNotificationRoom, 'admin');
  }


}
