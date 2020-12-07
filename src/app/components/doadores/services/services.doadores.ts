import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DoadoresGetModel } from '../models/doadores-get';

@Injectable({
    providedIn: 'root',
})
export class DoadoresService {
    apiUrl = environment.apiUrl;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private httpClient: HttpClient) {}

    getDoadores(): Observable<DoadoresGetModel[]> {
        return this.httpClient.get<DoadoresGetModel[]>(`${this.apiUrl}/doadores`, this.httpOptions);
    }
}
