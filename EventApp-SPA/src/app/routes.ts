import { UserListResolver } from './resolvers/user-list.resolver';
import { UserDetailResolver } from './resolvers/user-detail.resolver';
import { UploadTestComponent } from './components/admin/upload-test/upload-test.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';
import { CityListComponent } from './components/cities/city-list/city-list.component';
import { CityComponent } from './components/cities/city/city.component';
import { EventCategoryListComponent } from './components/events/event-category-list/event-category-list.component';
import { EventCategoryComponent } from './components/events/event-category/event-category.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { EventDetailResolver } from './resolvers/event-detail.resolver';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserEditResolver } from './resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes';
import { EventListResolver } from './resolvers/event-list.resolver';
import { CategoryListResolver } from './resolvers/category-list.resolver';
import { VenueListResolver } from './resolvers/venue-list.resolver';
import { PromoterPanelComponent } from './components/promoter/promoter-panel/promoter-panel.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            // { path: 'welcome', component: WelcomeComponent},
            { path: 'events', component: EventListComponent, resolve: {events: EventListResolver}},
            { path: 'events/:id', component: EventDetailComponent,  resolve: {event: EventDetailResolver}},
            { path: 'categories', component: EventCategoryListComponent},
            { path: 'categories/:id', component: EventCategoryComponent},
            { path: 'cities', component: CityListComponent},
            { path: 'cities/:id', component: CityComponent},
            // { path: 'users/:id', component: UserDetailComponent},
            // { path: 'user/edit', component: UserEditComponent,
            // { path: 'user/orders', component: UserOrderListComponent},
            { path: 'uploadtest', component: UploadTestComponent},
            { path: 'userlisttest', component: UserListComponent, resolve: {users: UserListResolver}},
            { path: 'users/:id', component: UserDetailComponent, resolve: {user: UserDetailResolver}},
            { path: 'user/edit', component: UserEditComponent,
                resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'admin', component: AdminPanelComponent, data: {roles: ['Administrator']},
                resolve: {categories: CategoryListResolver, venues: VenueListResolver}},
            { path: 'admin/:option', component: AdminPanelComponent, data: {roles: ['Administrator']}},
            { path: 'promoter', component: PromoterPanelComponent},
            { path: 'promoter/:option', component: PromoterPanelComponent}

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
