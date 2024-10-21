import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import {LinkShortener} from '../../interfaces/common/link-shortener.interface';

const API_BRAND = environment.apiBaseLink + '/api/link-shortener/';


@Injectable({
  providedIn: 'root'
})
export class LinkShortenerService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addLinkShortener
   * insertManyLinkShortener
   * getAllLinkShorteners
   * getLinkShortenerById
   * updateLinkShortenerById
   * updateMultipleLinkShortenerById
   * deleteLinkShortenerById
   * deleteMultipleLinkShortenerById
   */

  addLinkShortener(data: LinkShortener):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllLinkShorteners(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: LinkShortener[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getLinkShortenerById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: LinkShortener, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateLinkShortenerById(id: string, data: LinkShortener) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteLinkShortenerById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleLinkShortenerById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
