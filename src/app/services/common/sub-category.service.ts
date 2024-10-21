import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {SubCategory} from '../../interfaces/common/sub-category.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';


const API_SUB_CATEGORY = environment.apiBaseLink + '/api/subCategory/';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  // getSubCategoriesByCategoryId(categoryId: string, select: string) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addsubCategory
   * insertManysubCategory
   * getAllsubCategory
   * getsubCategoryById
   * updatesubCategoryById
   * updateMultiplesubCategoryById
   * deletesubCategoryById
   * deleteMultiplesubCategoryById
   */

  addSubCategory(data: SubCategory):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'add', data);
  }

  getAllSubCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SubCategory[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all/', filterData, {params});
  }

  getSubCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory, message: string, success: boolean }>(API_SUB_CATEGORY + 'get-by/' + id, {params});
  }

  getSubCategoriesByCategoryId(categoryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_SUB_CATEGORY + 'get-all-by-parent/' + categoryId, {params});
  }

  updateSubCategoryById(id: string, data: SubCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SUB_CATEGORY + 'update/' + id, data);
  }


  deleteSubCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SUB_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleSubCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }


}
