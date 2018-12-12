import { PaginatedResult } from './../models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { City } from '../models/city';
import { Venue } from '../models/venue';

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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories/');
  }

  getCategoriesLength(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'categories/counter');
  }

  getCategory(id): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + 'categories/' + id);
  }

  getSubcategories(id): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.baseUrl + 'categories/' + id + '/subcategories');
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl + 'cities/');
  }

  getCity(id): Observable<City> {
    return this.http.get<City>(this.baseUrl + 'cities/' + id);
  }

  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.baseUrl + 'venues/');
  }

}
