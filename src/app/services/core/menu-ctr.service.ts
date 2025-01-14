import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {SideMenu} from '../../interfaces/core/side-menu';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class MenuCtrService {

  constructor(
    private location: Location,
    private utilsService: UtilsService,
  ) {
  }

  /**
   * ADMIN
   */
  public toggleMenuItemAdmin(menuId) {
    const menuItem = document.getElementById('menu-item-admin-' + menuId);
    const subMenu = document.getElementById('sub-menu-admin-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenusAdmin(menu: any[], menuId) {
    const currentMenuItem = menu.filter(item => item.id === menuId)[0];
    menu.forEach(item => {
      if (
        (item.id !== menuId && item.parentId === currentMenuItem.parentId) ||
        (currentMenuItem.parentId === null && item.id !== menuId)
      ) {
        const subMenu = document.getElementById('sub-menu-admin-' + item.id);
        const menuItem = document.getElementById('menu-item-admin-' + item.id);
        if (subMenu) {
          if (subMenu.classList.contains('show')) {
            subMenu.classList.remove('show');
            menuItem.classList.remove('expanded');
          }
        }
      }
    });
  }

  public expandActiveSubMenuAdmin(menu: SideMenu[]) {
    const url = this.utilsService.removeUrlQuery(this.location.path());
    const routerLink = decodeURIComponent(url);
    const activeMenuItem = menu.filter(item => {
      return `/admin/${item.routerLink}` === routerLink;
    });
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId !== null) {
        menuItem = menu.filter(item => item.id === menuItem.parentId)[0];
        this.toggleMenuItemAdmin(menuItem.id);
      }
    }
  }

  /**
   * USER
   */
  public toggleMenuItemUser(menuId) {
    const menuItem = document.getElementById('menu-item-user-' + menuId);
    const subMenu = document.getElementById('sub-menu-user-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenusUser(menu: any[], menuId) {
    const currentMenuItem = menu.filter(item => item.id === menuId)[0];
    menu.forEach(item => {
      if (
        (item.id !== menuId && item.parentId === currentMenuItem.parentId) ||
        (currentMenuItem.parentId === null && item.id !== menuId)
      ) {
        const subMenu = document.getElementById('sub-menu-user-' + item.id);
        const menuItem = document.getElementById('menu-item-user-' + item.id);
        if (subMenu) {
          if (subMenu.classList.contains('show')) {
            subMenu.classList.remove('show');
            menuItem.classList.remove('expanded');
          }
        }
      }
    });
  }


  public expandActiveSubMenuUser(menu: SideMenu[]) {
    const url = this.utilsService.removeUrlQuery(this.location.path());
    const routerLink = decodeURIComponent(url);
    const activeMenuItem = menu.filter(item => {
      return `/${item.routerLink}` === routerLink;
    });
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId !== null) {
        menuItem = menu.filter(item => item.id === menuItem.parentId)[0];
        this.toggleMenuItemUser(menuItem.id);
      }
    }
  }


}
