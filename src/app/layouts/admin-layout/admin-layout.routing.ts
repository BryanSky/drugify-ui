import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {DrugFinderComponent} from '../../drug-finder/drug-finder.component';
import {DrugScannerComponent} from '../../drug-scanner/drug-scanner.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'drugfinder', component: DrugFinderComponent},
    {path: 'drugscanner', component: DrugScannerComponent}
];
