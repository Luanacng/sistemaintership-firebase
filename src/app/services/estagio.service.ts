import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estagio } from '../models/estagio';

@Injectable({
  providedIn: 'root'
})
export class EstagioService {

  username="luana"
  password="admin"

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private snack: MatSnackBar) { }

  findById(id: any): Observable<Estagio> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/estagios/${id}`
    return this.http.get<Estagio>(url, {headers})
  }

  findAll(): Observable<Estagio[]> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/estagios/`
    return this.http.get<Estagio[]>(url, {headers})
  }

  update(estagio: Estagio): Observable<Estagio> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/estagios/${estagio.id}`
    return this.http.put<Estagio>(url, estagio, {headers,responseType:'text' as 'json'})
  }

  delete(id: any): Observable<void> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/estagios/${id}`
    return this.http.delete<void>(url, {headers,responseType:'text' as 'json'})
  }

  create(estagio: Estagio): Observable<Estagio> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/estagios/`
    return this.http.post<Estagio>(url,estagio, {headers,responseType:'text' as 'json'})
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
