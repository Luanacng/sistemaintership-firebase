import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username!: any
  password!: any

  constructor(private http:HttpClient) {}

  public login(username: string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(username+":"+password)})
    this.username = username
    this.password = password
    return this.http.get("https://apispring-firebase.herokuapp.com/",{headers,responseType:'text' as 'json'})
    //https://apispring-security.herokuapp.com/
  }


}
