import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Notice } from 'src/app/interfaces/common/notice.interface';

const API_BRAND = environment.apiBaseLink + '/api/notice/';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNotice
   * insertManyNotice
   * getAllNotices
   * getNoticeById
   * updateNoticeById
   * updateMultipleNoticeById
   * deleteNoticeById
   * deleteMultipleNoticeById
   */

  addNotice(data: Notice):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllNotices(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Notice[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getNoticeById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Notice, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateNoticeById(id: string, data: Notice) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteNoticeById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleNoticeById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
