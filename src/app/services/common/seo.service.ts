import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import { Seo } from 'src/app/interfaces/common/seo.interface';

const API_COURSE= environment.apiBaseLink + '/api/seo/';


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSeo
   * insertManySeo
   * getAllSeos
   * getSeoById
   * updateSeoById
   * updateMultipleSeoById
   * deleteSeoById
   * deleteMultipleSeoById
   */

  addSeo(data: Seo) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'add', data);
  }

  insertManySeo(data: Seo, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'insert-many', mData);
  }

  cloneSingleSeo(id: string) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE + 'clone', {id});
  }

  getAllSeos(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    // if (searchQuery) {
    //   params = params.append('q', searchQuery);
    // }
    return this.httpClient.post<{ data: Seo[], count: number, success: boolean }>(API_COURSE+ 'get-all', filterData, {params});
  }

  getSeoById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Seo, message: string, success: boolean }>(API_COURSE+ id, {params});
  }

  updateSeoById(id: string, data: Seo) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE+ 'update-data/' + id, data);
  }

  updateMultipleSeoById(ids: string[], data: Seo) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_COURSE+ 'update-multiple-data-by-id', mData);
  }

  deleteSeoById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_COURSE+ 'delete-data/' + id, {params});
  }

  deleteMultipleSeoById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_COURSE+ 'delete-multiple-data-by-id', {ids: ids}, {params});
  }


}
