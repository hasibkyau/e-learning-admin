import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Notification} from '../../interfaces/common/notification.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_TAG = environment.apiBaseLink + '/api/notification/';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNotification
   * insertManyNotification
   * getAllNotifications
   * getNotificationById
   * updateNotificationById
   * updateMultipleNotificationById
   * deleteNotificationById
   * deleteMultipleNotificationById
   */

  addNotification(data: Notification) {
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'add', data);
  }

  insertManyNotification(data: Notification, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'insert-many', mData);
  }

  getAllNotifications(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Notification[], count: number, success: boolean }>(API_TAG + 'get-all', filterData, {params});
  }

  getNotificationById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Notification, message: string, success: boolean }>(API_TAG + id, {params});
  }

  updateNotificationById(id: string, data: Notification) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_TAG + 'update-data/' + id, data);
  }

  updateMultipleNotificationById(ids: string[], data: Notification) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_TAG + 'update-multiple-data-by-id', mData);
  }

  deleteNotificationById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_TAG + 'delete-data/' + id, {params});
  }

  deleteMultipleNotificationById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_TAG + 'delete-multiple-data-by-id', {ids: ids}, {params});
  }


}
