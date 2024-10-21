import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import { Regestration } from 'src/app/interfaces/common/regestration.interface';

const API_CONTACT = environment.apiBaseLink + '/api/regestration/';


@Injectable({
  providedIn: 'root'
})
export class RegestrationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addRegestration
   * insertManyRegestration
   * getAllRegestrations
   * getRegestrationById
   * updateRegestrationById
   * updateMultipleRegestrationById
   * deleteRegestrationById
   * deleteMultipleRegestrationById
   */

  addRegestration(data: Regestration) {
    return this.httpClient.post<ResponsePayload>
    (API_CONTACT + 'add', data);
  }

  insertManyRegestration(data: Regestration, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_CONTACT + 'insert-many', mData);
  }

  getAllRegestrations(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Regestration[], count: number, success: boolean }>(API_CONTACT + 'get-all-reg', filterData, {params});
  }

  getRegestrationById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Regestration, message: string, success: boolean }>(API_CONTACT + id, {params});
  }

  updateRegestrationById(id: string, data: Regestration) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CONTACT + 'update/' + id, data);
  }

  updateMultipleRegestrationById(ids: string[], data: Regestration) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CONTACT + 'update-multiple', mData);
  }

  deleteRegestrationById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CONTACT + 'delete/' + id, {params});
  }

  deleteMultipleRegestrationById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CONTACT + 'delete-multiple', {ids: ids}, {params});
  }


}
