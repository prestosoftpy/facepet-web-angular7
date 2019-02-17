import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, tap } from 'rxjs/operators';


import { Empresa } from '../modelos/empresa';
import { MessageService } from '../message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application-json' })
};

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    API_URI = 'https://facepet-api.herokuapp.com';
    selectedEmpresa: Empresa;
    constructor(private http: HttpClient) { }

    getEmpresas() {
        return this.http.get(`${this.API_URI}/empresas`);
    }

    getEmpresa(id: string) {
        return this.http.get(`${this.API_URI}/empresas/${id}`);
    }

    saveEmpresa(empresa: Empresa) {
        return this.http.post(`${this.API_URI}/empresas/`, empresa);
    }

    updateEmpresa(id: string | number, updateEmpresa: Empresa) {
        return this.http.put(`${this.API_URI}/empresas/${id}`, updateEmpresa);
    }

    deleteEmpresa(id: number) {
        return this.http.delete(`${this.API_URI}/empresas/${id}`);
    }
}
