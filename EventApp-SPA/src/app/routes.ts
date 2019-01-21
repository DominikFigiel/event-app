import { PromoterEventStatsComponent } from './components/promoter/promoter-event-stats/promoter-event-stats.component';
import { EventToCheckComponent } from './components/admin/event-to-check/event-to-check.component';
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
// tslint:disable-next-line:max-line-length
import { PromoterEventTicketsSettingsComponent } from './components/promoter/promoter-event-tickets-settings/promoter-event-tickets-settings.component';
import { EventTicketsComponent } from './components/events/event-tickets/event-tickets.component';
import { TicketCategoryResolver } from './resolvers/ticket-category.resolver';
import { UserOrderDetailComponent } from './components/users/user-order-detail/user-order-detail.component';
import { EventSubcategoryComponent } from './components/events/event-subcategory/event-subcategory.component';

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
            { path: 'events/tickets/:id', component: EventTicketsComponent,
                resolve: {ticketCategories: TicketCategoryResolver, event: EventDetailResolver}},
            { path: 'categories', component: EventCategoryListComponent},
            { path: 'categories/:id', component: EventCategoryComponent},
            { path: 'subcategories/:id', component: EventSubcategoryComponent},
            { path: 'cities', component: CityListComponent},
            { path: 'cities/:id', component: CityComponent},
            // { path: 'users/:id', component: UserDetailComponent},
            // { path: 'user/edit', component: UserEditComponent,
            // { path: 'user/orders', component: UserOrderListComponent},
            { path: 'uploadtest', component: UploadTestComponent},
            { path: 'userlisttest', component: UserListComponent, resolve: {users: UserListResolver}},
            { path: 'users/:id', component: UserDetailComponent, resolve: {user: UserDetailResolver}},
            { path: 'users/orders/:id', component: UserOrderDetailComponent},
            { path: 'user/edit', component: UserEditComponent,
                resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'admin', component: AdminPanelComponent, data: {roles: ['Administrator']},
                resolve: {categories: CategoryListResolver, venues: VenueListResolver}},
            { path: 'admin/:option', component: AdminPanelComponent, data: {roles: ['Administrator']}},
            { path: 'admin/approval/event/:eventId', component: EventToCheckComponent, data: {roles: ['Administrator']}},
            { path: 'promoter', component: PromoterPanelComponent},
            { path: 'promoter/:option', component: PromoterPanelComponent},
            { path: 'promoter/management/event/:eventId', component: PromoterEventTicketsSettingsComponent},
            { path: 'promoter/management/event/stats/:eventId', component: PromoterEventStatsComponent}

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
