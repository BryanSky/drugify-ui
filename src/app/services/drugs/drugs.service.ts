import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Drug} from '../../models/drug';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'text/plain'  // This fixes the issue with pre-flight requests (POST requests became OPTIONS requests)
    })
};

@Injectable()
export class DrugsService {
    private readonly drugUrl = `${environment.drugServerBaseUrl}/api/drugs`;

    public constructor(private httpClient: HttpClient) {
    }

    public getDrugById(swissMedicId: string): Observable<Drug> {
        const url = `${this.drugUrl}/${swissMedicId}`;
        return this.httpClient.get<Drug>(url, httpOptions);
    }
}
