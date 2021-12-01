
import { Aluno } from './../models/aluno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  username="luana"
  password="admin"

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private snack: MatSnackBar) { }

  findById(id: any): Observable<Aluno> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/alunos/${id}`
    return this.http.get<Aluno>(url, {headers})
  }

  findAll(): Observable<Aluno[]> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/alunos/`
    return this.http.get<Aluno[]>(url, {headers:headers})
  }

  update(aluno: Aluno): Observable<Aluno> {
    const headerOptions = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/alunos/${aluno.id}`
    return this.http.put<Aluno>(url, aluno, {headers:headerOptions,responseType:'text' as 'json'})
  }

  delete(id: any): Observable<void> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/alunos/${id}`
    return this.http.delete<void>(url, {headers,responseType:'text' as 'json'})
  }

  create(aluno: Aluno): Observable<Aluno> {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    const url = `${this.baseUrl}/alunos/`
    return this.http.post<Aluno>(url,aluno, {headers,responseType:'text' as 'json'})
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
