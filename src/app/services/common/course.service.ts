import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Course} from '../../interfaces/common/course.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_COURSE= environment.apiBaseLink + '/api/course/';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCourse
   * insertManyCourse
   * getAllCourses
   * getCourseById
   * updateCourseById
   * updateMultipleCourseById
   * deleteCourseById
   * deleteMultipleCourseById
   */

  addCourse(data: Course) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'add', data);
  }

  insertManyCourse(data: Course, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'insert-many', mData);
  }

  cloneSingleCourse(id: string) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE + 'clone', {id});
  }

  getAllCourses(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Course[], count: number, success: boolean }>(API_COURSE+ 'get-all', filterData, {params});
  }

  getCourseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Course, message: string, success: boolean }>(API_COURSE + 'get-by/' + id, {params});
  }

  updateCourseById(id: string, data: Course) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE+ 'update/' + id, data);
  }

  updateMultipleCourseById(ids: string[], data: Course) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_COURSE+ 'update-multiple', mData);
  }

  deleteCourseById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_COURSE+ 'delete/' + id, {params});
  }

  deleteMultipleCourseById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_COURSE+ 'delete-multiple', {ids: ids}, {params});
  }


}
