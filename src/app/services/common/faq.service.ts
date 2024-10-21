import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Faq } from 'src/app/interfaces/common/faq.interface';

const API_FAQ = environment.apiBaseLink + '/api/faq/';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addFaq
   * insertManyFaq
   * getAllFaqs
   * getFaqById
   * updateFaqById
   * updateMultipleFaqById
   * deleteFaqById
   * deleteMultipleFaqById
   */

  addFaq(data: Faq):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_FAQ + 'add', data);
  }

  getAllFaqs(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Faq[], count: number, success: boolean }>(API_FAQ + 'get-all/', filterData, {params});
  }

  getFaqById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Faq, message: string, success: boolean }>(API_FAQ + 'get-by/' + id, {params});
  }

  updateFaqById(id: string, data: Faq) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_FAQ + 'update/' + id, data);
  }

  deleteFaqById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_FAQ + 'delete/' + id, {params});
  }

  deleteMultipleFaqById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_FAQ + 'delete-multiple', {ids: ids}, {params});
  }



}
