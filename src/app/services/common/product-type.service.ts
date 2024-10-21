import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { ProductType } from 'src/app/interfaces/common/product-type.interface';

const API_BRAND = environment.apiBaseLink + '/api/productType/';


@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addProductType
   * insertManyProductType
   * getAllProductTypes
   * getProductTypeById
   * updateProductTypeById
   * updateMultipleProductTypeById
   * deleteProductTypeById
   * deleteMultipleProductTypeById
   */

  addProductType(data: ProductType):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllProductTypes(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ProductType[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getProductTypeById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ProductType, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateProductTypeById(id: string, data: ProductType) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteProductTypeById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleProductTypeById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
