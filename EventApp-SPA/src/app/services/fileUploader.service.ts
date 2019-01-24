import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadEventImage(files: any, eventId: number) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      const filename = eventId + '.jpg';
      formData.append(filename, file, filename);
    }

    return this.http.post(this.baseUrl + 'admin/addEventImage/' + eventId, formData).pipe(
      map((response: any) => {})
    );
  }

  upload(files: any) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      // const fileName = 'user_' + this.authService.decodedToken.nameid + '.jpg';
      formData.append(file.name, file);
    }

    return this.http.post(this.baseUrl + 'cities/upload', formData).pipe(
      map((response: any) => {})
    );
  }

}
