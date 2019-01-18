import { Event } from 'src/app/models/event';
import { AddressForUpdate } from 'src/app/models/addressForUpdate';
import { ZipCode } from './../models/zipCode';
import { Address } from './../models/address';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { City } from '../models/city';
import { Venue } from '../models/venue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.username, roles);
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + 'admin/addCategory', category);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'admin/deleteCategory/' + id);
  }

  updateCategory(category: Category) {
    return this.http.put(this.baseUrl + 'admin/editCategory/' + category.id, category);
  }

  addSubcategory(subcategory: Subcategory) {
    return this.http.post(this.baseUrl + 'admin/addSubcategory', subcategory);
  }

  deleteSubcategory(id: number) {
    return this.http.delete(this.baseUrl + 'admin/deleteSubcategory/' + id);
  }

  updateSubcategory(subcategory: Subcategory) {
    return this.http.put(this.baseUrl + 'admin/editSubcategory/' + subcategory.id, subcategory);
  }

  addCity(city: City) {
    return this.http.post(this.baseUrl + 'admin/addCity', city);
  }

  deleteCity(id: number) {
    return this.http.delete(this.baseUrl + 'admin/deleteCity/' + id);
  }

  updateCity(city: City) {
    return this.http.put(this.baseUrl + 'admin/editCity/' + city.id, city);
  }

  deleteVenue(id: number) {
    return this.http.delete(this.baseUrl + 'admin/deleteVenue/' + id);
  }

  updateVenue(venue: Venue) {
    return this.http.put(this.baseUrl + 'admin/editVenue/' + venue.id, venue);
  }

  updateAddress(address: any) {
    return this.http.put(this.baseUrl + 'admin/editAddress/' + address.id, address);
  }

  addEvent(event: any) {
    return this.http.post(this.baseUrl + 'admin/addEvent', event);
  }

  addTicketCategory(ticketCategory: any) {
    return this.http.post(this.baseUrl + 'admin/addTicketCategory', ticketCategory);
  }

  setEventAsFinished(eventId: number) {
    return this.http.put(this.baseUrl + 'admin/setEventAsFinished/' + eventId, eventId);
  }

  rejectEvent(eventId: number) {
    return this.http.put(this.baseUrl + 'admin/rejectEvent/' + eventId, eventId);
  }

  approveEvent(eventId: number) {
    return this.http.put(this.baseUrl + 'admin/approveEvent/' + eventId, eventId);
  }


}
