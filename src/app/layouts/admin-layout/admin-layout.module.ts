import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BarcodeScannerComponent} from '../../components/barcode-scanner/barcode-scanner.component';
import {DrugFinderComponent} from '../../drug-finder/drug-finder.component';
import {DrugsService} from '../../services/drugs/drugs.service';
import {UserService} from '../../services/users/user.service';
import {DrugScannerComponent} from '../../drug-scanner/drug-scanner.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        DrugFinderComponent,
        DrugScannerComponent,
        BarcodeScannerComponent
    ],
    providers: [
        DrugsService,
        UserService
    ],
})

export class AdminLayoutModule {
}
