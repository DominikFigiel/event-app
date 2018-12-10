import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';

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

}
