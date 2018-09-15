import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {DrugFinderComponent} from '../../drug-finder/drug-finder.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'drugfinder',      component: DrugFinderComponent }
];
