import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BarcodeScannerComponent } from '../../components/barcode-scanner/barcode-scanner.component';
import {DrugFinderComponent} from '../../drug-finder/drug-finder.component';
import {DrugsService} from '../../services/drugs/drugs.service';

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
      TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
      BarcodeScannerComponent
  ],
    providers: [
        DrugsService
    ],
})

export class AdminLayoutModule {}
