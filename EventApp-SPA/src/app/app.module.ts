import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule,
  ButtonsModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
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
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';
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
import { UserDetailResolver } from './resolvers/user-detail.resolver';
import { EventDetailResolver } from './resolvers/event-detail.resolver';
import { EventCardComponent } from './components/events/event-card/event-card.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserListResolver } from './resolvers/user-list.resolver';
import { UserEditResolver } from './resolvers/user-edit.resolver';
import { EventListResolver } from './resolvers/event-list.resolver';
import { HasRoleDirective } from './directives/hasRole.directive';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { AdminService } from './services/admin.service';
import { RolesModalComponent } from './components/admin/roles-modal/roles-modal.component';
import { CityManagementComponent } from './components/admin/city-management/city-management.component';
import { VenueManagementComponent } from './components/admin/venue-management/venue-management.component';
import { EventCategoryCardComponent } from './components/events/event-category-card/event-category-card.component';
import { CategoryManagementComponent } from './components/admin/category-management/category-management.component';
import { CategoryAddNewComponent } from './components/admin/category-add-new/category-add-new.component';
import { CategoryEditModalComponent } from './components/admin/category-edit-modal/category-edit-modal.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { SubcategoryListComponent } from './components/admin/subcategory-list/subcategory-list.component';

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
    EventDetailComponent,
    EventListComponent,
    EventCategoryComponent,
    EventCategoryCardComponent,
    EventCategoryListComponent,
    UploadTestComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    EventCardComponent,
    HasRoleDirective,
    UserManagementComponent,
    RolesModalComponent,
    CategoryEditModalComponent,
    CategoryManagementComponent,
    CategoryAddNewComponent,
    CategoryListComponent,
    SubcategoryListComponent,
    VenueManagementComponent,
    CityManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
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
    FileUploaderService,
    UserDetailResolver,
    UserListResolver,
    UserEditResolver,
    EventListResolver,
    EventDetailResolver,
    AdminService
  ],
  entryComponents: [
     RolesModalComponent,
     CategoryEditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
