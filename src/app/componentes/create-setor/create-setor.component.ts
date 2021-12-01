import { LoginService } from './../../services/login.service';
import { NgForm } from '@angular/forms';
import { SetorService } from './../../services/setor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Setor } from 'src/app/models/setor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-setor',
  templateUrl: './create-setor.component.html',
  styleUrls: ['./create-setor.component.css']
})
export class CreateSetorComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  setor: Setor = {
    nome:''
  }

  constructor(private service: SetorService, private router: Router,public login: LoginService) { }

  ngOnInit(): void {
  }

  create(): void {
    if(this.formulario.valid){
      this.service.create(this.setor).subscribe((resposta) => {
        this.service.message("Criado com sucesso!")
        this.router.navigate(['setores'])
      }, err => {
        this.router.navigate(['setores'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['setores'])
  }

}
