import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Author} from '../../interfaces/common/author.interface';
import {Observable} from 'rxjs';
import {FilterData} from "../../interfaces/core/filter-data";

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/author/';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * addAuthor
   * insertManyAuthor
   * getAllAuthors
   * getAuthorById
   * updateAuthorById
   * updateMultipleAuthorById
   * deleteAuthorById
   * deleteMultipleAuthorById
   */

  addAuthor(data: Author): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  }

  getAllAuthor(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: Author[];
      count: number;
      success: boolean;
      calculation: any;
    }>(API_NEW_EXPENSE + 'get-all/', filterData, {params});
  }

  getAuthorById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: Author;
      message: string;
      success: boolean;
    }>(API_NEW_EXPENSE + id, {params});
  }

  updateAuthorById(id: string, data: Author) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_NEW_EXPENSE + 'update/' + id,
      data
    );
  }

  // deleteAuthorById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteAuthorById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(
      API_NEW_EXPENSE + 'delete/' + id,
      {params}
    );
  }

  deleteMultipleAuthorById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(
      API_NEW_EXPENSE + 'delete-multiple',
      {ids: ids},
      {params}
    );
  }

  //  authorGroupByField<T>(dataArray: T[], field: string): AuthorGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});
  //
  //   const final = [];
  //
  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //
  //   return final as AuthorGroup[];

  // }
}
