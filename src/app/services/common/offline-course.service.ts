import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { OfflineCourse } from 'src/app/interfaces/common/offline-course.interface';

const API_BRAND = environment.apiBaseLink + '/api/offlineCourse/';


@Injectable({
  providedIn: 'root'
})
export class OfflineCourseService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addOfflineCourse
   * insertManyOfflineCourse
   * getAllOfflineCourses
   * getOfflineCourseById
   * updateOfflineCourseById
   * updateMultipleOfflineCourseById
   * deleteOfflineCourseById
   * deleteMultipleOfflineCourseById
   */

  addOfflineCourse(data: OfflineCourse):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllOfflineCourses(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: OfflineCourse[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getOfflineCourseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: OfflineCourse, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateOfflineCourseById(id: string, data: OfflineCourse) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteOfflineCourseById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleOfflineCourseById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
