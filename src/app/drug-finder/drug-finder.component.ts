import {Component, OnInit} from '@angular/core';
import {DrugsService} from '../services/drugs/drugs.service';
import {Drug} from '../models/drug';

@Component({
    selector: 'app-drug-finder',
    templateUrl: './drug-finder.component.html',
    styleUrls: ['./drug-finder.component.css']
})
export class DrugFinderComponent implements OnInit {

    drug: Drug;

    constructor(private drugService: DrugsService) {
    }

    ngOnInit() {
        this.drugService.getDrugById('33124')
            .subscribe((data) => {
                this.drug = data;
            });
    }

}
