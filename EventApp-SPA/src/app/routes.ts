import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventComponent } from './components/events/event/event.component';
import { CityListComponent } from './components/cities/city-list/city-list.component';
import { CityComponent } from './components/cities/city/city.component';
import { EventCategoryListComponent } from './components/events/event-category-list/event-category-list.component';
import { EventCategoryComponent } from './components/events/event-category/event-category.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            // { path: 'welcome', component: WelcomeComponent},
            { path: 'events', component: EventListComponent},
            { path: 'events/:id', component: EventComponent},
            { path: 'categories', component: EventCategoryListComponent},
            { path: 'categories/:id', component: EventCategoryComponent},
            { path: 'cities', component: CityListComponent},
            { path: 'cities/:id', component: CityComponent},
            // { path: 'users/:id', component: UserDetailComponent},
            // { path: 'user/edit', component: UserEditComponent,
            // { path: 'user/orders', component: UserOrderListComponent},
            { path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Instructor']}}

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
