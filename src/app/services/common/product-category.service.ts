import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import {ProductCategory} from "../../interfaces/common/product-category.interface";
import {FilterData} from "../../interfaces/core/filter-data";

const API_CATEGORY = environment.apiBaseLink + '/api/productCategory/';


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCategory
   * insertManyCategory
   * getAllCategorys
   * getCategoryById
   * updateCategoryById
   * updateMultipleCategoryById
   * deleteCategoryById
   * deleteMultipleCategoryById
   */

  // getAllCategories(filterData: FilterData, searchQuery?: string) {
  //   let params = new HttpParams();
  //   if (searchQuery) {
  //     params = params.append('q', searchQuery);
  //   }
  //   return this.httpClient.post<{ data: Category[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  // }

  addCategory(data: ProductCategory):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'add', data);
  }

  getAllCategory(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ProductCategory[], count: number, success: boolean }>(API_CATEGORY + 'get-all/', filterData, {params});
  }

  getCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ProductCategory, message: string, success: boolean }>(API_CATEGORY + 'get-by/' + id, {params});
  }

  updateCategoryById(id: any, data: ProductCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }


  // deleteCategoryById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id);
  // }

  deleteCategoryById(id: any, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }

  // categoryGroupByField<T>(dataArray: T[], field: string): CategoryGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});
  //
  //   const final = [];
  //
  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //
  //   return final as CategoryGroup[];

  // }



}