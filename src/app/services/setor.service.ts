import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Setor } from '../models/setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  username="luana"
  password="admin"

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private snack: MatSnackBar) { }

  findById(id: any): Observable<Setor> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/setores/${id}`
    return this.http.get<Setor>(url, {headers})
  }

  findAll(): Observable<Setor[]> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/setores/`
    return this.http.get<Setor[]>(url, {headers})
  }

  update(setor: Setor): Observable<Setor> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/setores/${setor.id}`
    return this.http.put<Setor>(url, setor, {headers,responseType:'text' as 'json'})
  }

  delete(id: any): Observable<void> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/setores/${id}`
    return this.http.delete<void>(url, {headers,responseType:'text' as 'json'})
  }

  create(setor: Setor): Observable<Setor> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/setores/`
    return this.http.post<Setor>(url,setor, {headers,responseType:'text' as 'json'})
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
