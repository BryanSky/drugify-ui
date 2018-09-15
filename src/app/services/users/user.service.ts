import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DrugHistory} from '../../models/drugHistory';
import {Drug} from '../../models/drug';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'text/plain'  // This fixes the issue with pre-flight requests (POST requests became OPTIONS requests)
    })
};

@Injectable()
export class UserService {
    private readonly userBaseUrl = `${environment.drugServerBaseUrl}/api/users`;
    private readonly username = environment.username;

    public constructor(private httpClient: HttpClient) {
    }

    public createDrugHistory(userId: string, drug: Drug, fromDate: string, toDate: string): Observable<DrugHistory> {
        const url = `${this.userBaseUrl}/${userId}/drugs`;
        const drugHistory: DrugHistory = {
            atcCode: drug.atcCode,
            authHolder: drug.authHolder,
            substances: drug.substances,
            title: drug.title,
            username: this.username,
            authNrs: drug.authNrs,
            fromDate: fromDate,
            toDate: toDate
        };
        return this.httpClient.post<DrugHistory>(url, drugHistory, httpOptions);
    }

    public hasConflict(userId: string, swissMedicId: string): Observable<any> {
        const url = `${this.userBaseUrl}/${userId}/drugs/${swissMedicId}`;
        return this.httpClient.get<any>(url, httpOptions);
    }

    public getDrugHistoryByUserId(userId: string): Observable<DrugHistory[]> {
        const url = `${this.userBaseUrl}/${userId}/drugs`;
        return this.httpClient.get<DrugHistory[]>(url, httpOptions);
    }
}
