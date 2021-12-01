import { LoginService } from './../../services/login.service';
import { Estagio } from './../../models/estagio';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-create-aluno',
  templateUrl: './create-aluno.component.html',
  styleUrls: ['./create-aluno.component.css']
})
export class CreateAlunoComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  aluno: Aluno = {
    nome:'',
    matricula:'',
    curso:''
  }

  constructor(private service: AlunoService, private router: Router,public login: LoginService) { }

  ngOnInit(): void {
  }

  create(): void {
    if(this.formulario.valid){
      this.service.create(this.aluno).subscribe((resposta) => {
        this.service.message("Criado com sucesso!")
        this.router.navigate(['alunos'])
      }, err => {
        this.service.message("Erro ao criar!")
        console.log(err);
        
        this.router.navigate(['alunos'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['alunos'])
  }

}
