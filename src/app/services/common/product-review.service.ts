import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FilterData} from "../../interfaces/core/filter-data";
import {ProductReview} from "../../interfaces/common/product-review.interface";



const API_REVIEW_CONTROL = environment.apiBaseLink + '/api/product-review/';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Review Control
   */

  addReview(data: ProductReview) {
    return this.httpClient.post<{ message: string }>(API_REVIEW_CONTROL + 'add', data);
  }

  addReviewByAdmin(data: ProductReview) {
    return this.httpClient.post<{ message: string }>(API_REVIEW_CONTROL + 'add-by-admin', data);
  }


  getAllReviews() {
    return this.httpClient.get<{data: ProductReview[], message?: string}>(API_REVIEW_CONTROL + 'get-all-product-review');
  }

  // getReviewByReviewId(id: string) {
  //   return this.httpClient.get<{data: Review, message?: string}>(API_REVIEW_CONTROL + 'get-review-by-review-id/' + id);
  // }


  getReviewByReviewId(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ProductReview, message: string, success: boolean }>(API_REVIEW_CONTROL + id, {params});
  }

  editReview(data: ProductReview) {
    return this.httpClient.put<{ message: string }>(API_REVIEW_CONTROL + 'update', data);
  }

  updateReviewAndDelete(data: ProductReview) {
    return this.httpClient.put<{ message: string }>(API_REVIEW_CONTROL + 'update-and-product-review-remove', data);
  }

  deleteReviewByReviewId(id: string) {
    return this.httpClient.delete<{message?: string}>(API_REVIEW_CONTROL + 'delete/' + id);
  }

  getAllReviewsByQuery(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ProductReview[], count: number, success: boolean }>(API_REVIEW_CONTROL + 'get-all-product-review-by-query', filterData, {params});
  }

}
