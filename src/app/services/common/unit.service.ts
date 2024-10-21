import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Unit} from '../../interfaces/common/unit.interface';
import {Observable} from "rxjs";
import { FilterData } from 'src/app/interfaces/core/filter-data';

const API_UNIT = environment.apiBaseLink + '/api/unit/';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addUnit
   * insertManyUnit
   * getAllUnits
   * getUnitById
   * updateUnitById
   * updateMultipleUnitById
   * deleteUnitById
   * deleteMultipleUnitById
   */

  addUnit(data: Unit):Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_UNIT + 'add', data);
  }

  getAllUnits(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Unit[], count: number, success: boolean }>(API_UNIT + 'get-all/', filterData, {params});
  }

  getUnitById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Unit, message: string, success: boolean }>(API_UNIT + 'get-by/' + id, {params});
  }

  updateUnitById(id: string, data: Unit) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_UNIT + 'update/' + id, data);
  }

  deleteUnitById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_UNIT + 'delete/' + id, {params});
  }

  deleteMultipleUnitById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_UNIT + 'delete-multiple', {ids: ids}, {params});
  }


}
