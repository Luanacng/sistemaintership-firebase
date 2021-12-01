import { EstagioService } from './../../services/estagio.service';
import { HeaderComponent } from './../header/header.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  username!:string;
  password!:string;
  message:any
  invalidLogin = false
  constructor(private loginService:LoginService, private router: Router,private service: EstagioService) { }

  ngOnInit(): void {
  }
  
  fazerLogin(){
    if(this.formulario.invalid){
      this.service.message('Preencha os campos!')
    }
    let resp = this.loginService.login(this.username,this.password)
    resp.subscribe((resposta)=>{
      this.message = resposta
      this.service.message('Logado com sucesso!')
      this.router.navigate(['estagios-abertos'])
    })
  }

  reset(){
    this.username=''
    this.password=''
  }
}
