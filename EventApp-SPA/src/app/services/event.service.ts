import { PaginatedResult } from './../models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvents(page?, itemsPerPage?, eventParams?): Observable<PaginatedResult<Event[]>> {
    const paginatedResult: PaginatedResult<Event[]> = new PaginatedResult<Event[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (eventParams != null) {
      params = params.append('orderBy', eventParams.orderBy);
    }

    return this.http.get<Event[]>(this.baseUrl + 'events', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getEvent(id): Observable<Event> {
    return this.http.get<Event>(this.baseUrl + 'events/' + id);
  }

  updateEvent(id: number, event: Event) {
    return this.http.put(this.baseUrl + 'events/' + id, event);
  }

}
