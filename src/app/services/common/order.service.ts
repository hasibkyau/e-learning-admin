import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Order} from '../../interfaces/common/order.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_COURSE= environment.apiBaseLink + '/api/order/';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addOrder
   * insertManyOrder
   * getAllOrders
   * getOrderById
   * updateOrderById
   * updateMultipleOrderById
   * deleteOrderById
   * deleteMultipleOrderById
   */

  addOrder(data: Order) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'add', data);
  }

  insertManyOrder(data: Order, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'insert-many', mData);
  }

  cloneSingleOrder(id: string) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE + 'clone', {id});
  }

  getAllOrders(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Order[], count: number, success: boolean }>(API_COURSE+ 'get-all', filterData, {params});
  }

  getOrderById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Order, message: string, success: boolean }>(API_COURSE + 'get-by/' +id, {params});
  }

  updateOrderById(id: string, data: Order) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE+ 'update/' + id, data);
  }


  updateOrderStatusById(id: string, approveStatus: any) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE+ 'update/' + id, approveStatus);
  }

  updateMultipleOrderById(ids: string[], data: Order) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_COURSE+ 'update-multiple', mData);
  }

  deleteOrderById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_COURSE+ 'delete/' + id, {params});
  }

  deleteMultipleOrderById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_COURSE+ 'delete-multiple', {ids: ids}, {params});
  }


}
