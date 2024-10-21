import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Review} from '../../interfaces/common/review.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_COURSE= environment.apiBaseLink + '/api/review/';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addReview
   * insertManyReview
   * getAllReviews
   * getReviewById
   * updateReviewById
   * updateMultipleReviewById
   * deleteReviewById
   * deleteMultipleReviewById
   */

  addReview(data: Review) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'add', data);
  }

  insertManyReview(data: Review, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_COURSE+ 'insert-many', mData);
  }

  cloneSingleReview(id: string) {
    return this.httpClient.post<ResponsePayload>
    (API_COURSE + 'clone', {id});
  }

  getAllReviews(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    // if (searchQuery) {
    //   params = params.append('q', searchQuery);
    // }
    return this.httpClient.post<{ data: Review[], count: number, success: boolean }>(API_COURSE+ 'get-all', filterData, {params});
  }

  getReviewById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Review, message: string, success: boolean }>(API_COURSE + 'get-by/' +id, {params});
  }

  updateReviewById(id: string, data: Review) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_COURSE+ 'update/' + id, data);
  }

  updateMultipleReviewById(ids: string[], data: Review) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_COURSE+ 'update-multiple', mData);
  }

  deleteReviewById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_COURSE+ 'delete/' + id, {params});
  }

  deleteMultipleReviewById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_COURSE+ 'delete-multiple', {ids: ids}, {params});
  }


}
