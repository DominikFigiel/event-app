import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { CityComponent } from './components/cities/city/city.component';
import { CityListComponent } from './components/cities/city-list/city-list.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { EventComponent } from './components/events/event/event.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { appRoutes } from './routes';
import { EventCategoryComponent } from './components/events/event-category/event-category.component';
import { EventCategoryListComponent } from './components/events/event-category-list/event-category-list.component';
import { AuthGuard } from './guards/auth.guard';
import { FileUploaderService } from './services/fileUploader.service';
import { UploadTestComponent } from './components/admin/upload-test/upload-test.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    CityComponent,
    CityListComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EventComponent,
    EventListComponent,
    EventCategoryComponent,
    EventCategoryListComponent,
    UploadTestComponent,
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    FileUploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
