import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'events/');
  }

  getEvent(id): Observable<Event> {
    return this.http.get<Event>(this.baseUrl + 'events/' + id);
  }

  updateEvent(id: number, event: Event) {
    return this.http.put(this.baseUrl + 'events/' + id, event);
  }

}
