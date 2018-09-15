import {Component, OnInit} from '@angular/core';
import {DrugsService} from '../services/drugs/drugs.service';
import {Drug} from '../models/drug';

@Component({
    selector: 'app-drug-scanner',
    templateUrl: './drug-scanner.component.html',
    styleUrls: ['./drug-scanner.component.css']
})
export class DrugScannerComponent implements OnInit {

    drug: Drug;

    constructor(private drugService: DrugsService) {
    }

    ngOnInit() {
    }

}
