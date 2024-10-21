import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {ChildCategory} from '../../interfaces/common/child-category.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';


const API_SUB_CATEGORY = environment.apiBaseLink + '/api/childCategory/';


@Injectable({
  providedIn: 'root'
})
export class ChildCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addchildCategory
   * insertManychildCategory
   * getAllchildCategory
   * getchildCategoryById
   * updatechildCategoryById
   * updateMultiplechildCategoryById
   * deletechildCategoryById
   * deleteMultiplechildCategoryById
   */

  addChildCategory(data: ChildCategory):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'add', data);
  }

  getAllChildCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ChildCategory[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all/', filterData, {params});
  }

  getChildCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ChildCategory, message: string, success: boolean }>(API_SUB_CATEGORY + 'get-by/' + id, {params});
  }

  getChildCategoriesByCategoryId(categoryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ChildCategory[], message: string, success: boolean }>(API_SUB_CATEGORY + 'get-all-by-parent/' + categoryId, {params});
  }

  updateChildCategoryById(id: string, data: ChildCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SUB_CATEGORY + 'update/' + id, data);
  }


  deleteChildCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SUB_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleChildCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }


}
