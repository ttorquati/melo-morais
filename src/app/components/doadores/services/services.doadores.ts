import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { URLSearchParams } from 'url';

import { environment } from '../../../../environments/environment';
import { NovoDoador } from '../../cadastro-doador/model/novo-doador';
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

    salvaDoador(novoDoador: NovoDoador): Observable<any> {
        console.log(novoDoador);
        return this.httpClient.post(`${this.apiUrl}/doadores`, novoDoador);
    }

    deletaDoador(id: number): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/doadores/` + id);
    }

    getDoadoresSemanaArea(semanas: number[], areas: string[]): Observable<DoadoresGetModel[]> {
        let params = new HttpParams();
        params = params.append("semanas", semanas.join(","));
        params = params.append("areas", areas.join(","));
        let myhttpOptions = { 
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            params: params
        }

        return this.httpClient.get<DoadoresGetModel[]>(`${this.apiUrl}/doacoes/semana`, myhttpOptions);
    }

    gerarRota(doadoresIds: number[]): Observable<any> {
        let params = new HttpParams();
        params = params.append("doadoresIds", doadoresIds.join(","));
        let myhttpOptions = { 
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            params: params
        }

        return this.httpClient.get<DoadoresGetModel[]>(`${this.apiUrl}/doacoes/gera-rota`, myhttpOptions);
    }
}
