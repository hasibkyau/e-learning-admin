import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import { Category } from 'src/app/interfaces/common/course-category.interface';
const API_COURSE_CATEGORY = environment.apiBaseLink + '/api/category/';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCourseCategory
   * insertManyCourseCategory
   * getAllCourseCategories
   * getCourseCategoryById
   * updateCourseCategoryById
   * updateMultipleCourseCategoryById
   * deleteCourseCategoryById
   * deleteMultipleCourseCategoryById
   */

  addCourseCategory(data: Category) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE_CATEGORY + 'add', data);
  }

  insertManyCourseCategory(data: Category, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_COURSE_CATEGORY + 'insert-many', mData);
  }

  getAllCourseCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Category[], count: number, success: boolean }>(API_COURSE_CATEGORY + 'get-all', filterData, {params});
  }

  getCourseCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Category, message: string, success: boolean }>(API_COURSE_CATEGORY + 'get-by/'+ id, {params});
  }

  updateCourseCategoryById(id: string, data: Category) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE_CATEGORY + 'update/' + id, data);
  }

  updateMultipleCourseCategoryById(ids: string[], data: Category) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_COURSE_CATEGORY + 'update-multiple', mData);
  }

  deleteCourseCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_COURSE_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleCourseCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_COURSE_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }


}
