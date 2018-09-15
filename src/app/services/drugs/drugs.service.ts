import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Drug} from '../../models/drug';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'simple scent'
    })
};

@Injectable()
export class DrugsService {
    private readonly drugUrl = `${environment.drugServerBaseUrl}/hack/api/drugs`;
    private readonly drugHistoryUrl = `${environment.drugServerBaseUrl}/hack/api/drugs`;

    public constructor(private httpClient: HttpClient) {
    }

    public getDrugById(swissMedicId: string): Observable<Drug> {
        const url = `${this.drugUrl}/${swissMedicId}`;
        return this.httpClient.get<Drug>(url, httpOptions);
    }

    public getDrugHistoryByUserId(userId: string): Observable<Drug> {
        const url = `${this.drugHistoryUrl}/${userId}`;
        return this.httpClient.get<Drug>(url, httpOptions);
    }
}
