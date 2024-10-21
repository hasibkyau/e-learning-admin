import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Quiz } from 'src/app/interfaces/common/quiz.interface';
import {Category} from '../../interfaces/common/course-category.interface';

const API_QUIZ = environment.apiBaseLink + '/api/quiz/';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addQuiz
   * insertManyQuiz
   * getAllQuizs
   * getQuizById
   * updateQuizById
   * updateMultipleQuizById
   * deleteQuizById
   * deleteMultipleQuizById
   */

  addQuiz(data: Quiz):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_QUIZ + 'add', data);
  }

  getAllQuizs(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Quiz[], count: number, success: boolean }>(API_QUIZ + 'get-all/', filterData, {params});
  }

  getAllQuizsResult(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Quiz[], count: number, success: boolean }>(API_QUIZ + 'get-all-quiz-result/', filterData, {params});
  }

  getQuizResultById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Quiz, message: string, success: boolean }>(API_QUIZ + 'get-result-by/' + id, {params});
  }


  getQuizById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Quiz, message: string, success: boolean }>(API_QUIZ + 'get-by/' + id, {params});
  }

  updateQuizById(id: string, data: Quiz) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_QUIZ + 'update/' + id, data);
  }

  updateQuizResultById(id: string, data: any) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_QUIZ + 'update-result/' + id, data);
  }

  updateMultipleQuizById(ids: string[], data: Quiz) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_QUIZ + 'update-multiple', mData);
  }

  deleteQuizById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_QUIZ + 'delete/' + id, {params});
  }

  deleteMultipleQuizById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_QUIZ + 'delete-multiple', {ids: ids}, {params});
  }



}
