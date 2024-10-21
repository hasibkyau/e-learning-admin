import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AdminDashboard} from '../../interfaces/common/dashboard.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {User} from '../../interfaces/common/user.interface';

const API_DASHBOARD = environment.apiBaseLink + '/api/dashboard/';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  getAdminDashboard() {
    return this.httpClient.get<{ data: AdminDashboard, message: string, success: boolean }>(API_DASHBOARD + 'admin-dashboard');
  }

  getResources(isFree: string, filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (isFree !== null) {
      params = params.append('isFree', isFree);
    }
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: User[], count: number, success: boolean }>(API_DASHBOARD + 'resources', filterData, {params});
  }

  /**
   * USER AREA
   */
  getUserDashboard() {
    return this.httpClient.get<{ data: any, message: string, success: boolean }>(API_DASHBOARD + 'user-dashboard');
  }

  getUserProjects(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: any[], count: number, success: boolean }>(API_DASHBOARD + 'project-by-logged-in-user', filterData, {params});
  }

}
