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
        'Content-Type':  'text/plain'  // This fixes the issue with pre-flight requests (POST requests became OPTIONS requests)
    })
};
@Injectable()
export class UserService {
    private readonly userBaseUrl = `${environment.drugServerBaseUrl}/api/users`;

    public constructor(private httpClient: HttpClient) {
    }

    public getDrugHistoryByUserId(userId: string): Observable<DrugHistory> {
        const url = `${this.userBaseUrl}/${userId}/drugs`;
        return this.httpClient.get<DrugHistory>(url, httpOptions);
    }

    public saveDrugHistoryItem(userId: string, drugHistory: DrugHistory): Observable<any> {
        const url = `${this.userBaseUrl}/${userId}/drugs`;
        return this.httpClient.post<any>(url, drugHistory, httpOptions);
    }
}
