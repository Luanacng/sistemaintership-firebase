import { EstagioService } from './../../services/estagio.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn= false
  public data: any

  constructor(private router:Router, public login: LoginService, private service: EstagioService) { 
 
  }

  ngOnInit(): void {
    this.check()
  }

  check(){
    if(this.login.username != null){
      this.data = this.login.username
    }
   
  }

  logout(){
    this.login.username=''
    this.service.message('Logout feito com sucesso!')
    this.router.navigate(['login'])
  }

}
