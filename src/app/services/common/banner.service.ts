import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Banner } from 'src/app/interfaces/common/banner.interface';

const API_BRAND = environment.apiBaseLink + '/api/banner/';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addBanner
   * insertManyBanner
   * getAllBanners
   * getBannerById
   * updateBannerById
   * updateMultipleBannerById
   * deleteBannerById
   * deleteMultipleBannerById
   */

  addBanner(data: Banner):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllBanners(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Banner[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getBannerById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Banner, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateBannerById(id: string, data: Banner) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteBannerById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleBannerById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
