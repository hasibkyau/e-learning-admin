import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private refreshAdmin = new Subject<void>();
  private refreshUser = new Subject<void>();
  private refreshData = new Subject<void>();
  private refreshBrand = new Subject<void>();
  private refreshInstructor = new Subject<void>();
  private refreshPopup = new Subject<void>();
  private refresPlay = new Subject<boolean>();
  /**
   * REFRESH GLOBAL
   */
  get refreshBrand$() {
    return this.refreshBrand;
  }
  get refreshPopup$() {
    return this.refreshPopup;
  }
  needRefreshBrand$() {
    this.refreshBrand.next();
  }

  get refreshAutoplay$() {
    return this.refresPlay;
  }

  needRefreshAutoPlay$(a: any) {
    this.refresPlay.next(a);
  }

  /**
   * REFRESH GLOBAL
   */
    get refreshInstructor$() {
      return this.refreshBrand;
    }

    needRefreshInstructor$() {
      this.refreshBrand.next();
    }

  /**
   * REFRESH GLOBAL DATA
   */
  get refreshData$() {
    return this.refreshData;
  }
  needRefreshData$() {
    this.refreshData.next();
  }

  /**
   * REFRESH ADMIN DATA
   */

  get refreshAdmin$() {
    return this.refreshAdmin;
  }
  needRefreshAdmin$() {
    this.refreshAdmin.next();
  }

  /**
   * REFRESH USEr DATA
   */

  get refreshUser$() {
    return this.refreshUser;
  }
  needRefreshUser$() {
    this.refreshUser.next();
  }

}
