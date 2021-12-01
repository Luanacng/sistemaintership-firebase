import { Aluno } from './../models/aluno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  username="luana"
  password="admin"

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private snack: MatSnackBar) { }

  findById(id: any): Observable<Grupo> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/grupos/${id}`
    return this.http.get<Grupo>(url, {headers})
  }

  findAll(): Observable<Grupo[]> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/grupos/`
    return this.http.get<Grupo[]>(url, {headers})
  }

  update(grupo: Grupo): Observable<Grupo> {
    const headerOptions = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/grupos/${grupo.id}`
    return this.http.put<Grupo>(url, grupo, {headers:headerOptions,responseType:'text' as 'json'})
  }

  delete(id: any): Observable<void> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/grupos/${id}`
    return this.http.delete<void>(url, {headers,responseType:'text' as 'json'})
  }

  create(grupo: Grupo): Observable<Grupo> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/grupos/`
    return this.http.post<Grupo>(url,grupo, {headers,responseType:'text' as 'json'})
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
