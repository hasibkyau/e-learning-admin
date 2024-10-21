import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Instructor } from 'src/app/interfaces/common/instructor.interface';

const API_BRAND = environment.apiBaseLink + '/api/instructor/';


@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addInstructor
   * insertManyInstructor
   * getAllInstructors
   * getInstructorById
   * updateInstructorById
   * updateMultipleInstructorById
   * deleteInstructorById
   * deleteMultipleInstructorById
   */

  addInstructor(data: Instructor):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'add', data);
  }

  getAllInstructors(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Instructor[], count: number, success: boolean }>(API_BRAND + 'get-all/', filterData, {params});
  }

  getInstructorById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Instructor, message: string, success: boolean }>(API_BRAND + 'get-by/' + id, {params});
  }

  updateInstructorById(id: string, data: Instructor) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  deleteInstructorById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleInstructorById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }



}
