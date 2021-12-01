import { LoginService } from './../../services/login.service';
import { SetorService } from './../../services/setor.service';
import { Setor } from 'src/app/models/setor';
import { GrupoService } from './../../services/grupo.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/models/aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Grupo } from 'src/app/models/grupo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-grupo',
  templateUrl: './create-grupo.component.html',
  styleUrls: ['./create-grupo.component.css']
})
export class CreateGrupoComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  listaAlunos: Aluno[] = []
  listaSetor: Setor[] = []
  selected: Aluno[] = []

  grupo: Grupo = {
    nome:'',
    instituicao:'',
    setor:'',
    alunos: [],
    estagio: []
  }

  aluno: Aluno = {
    nome:'',
    matricula:'',
    curso:'',

  }
  constructor(
    private serviceAluno: AlunoService, 
    private serviceGrupo: GrupoService, 
    private router:Router,
    private serviceSetor: SetorService,
    public login: LoginService) { }

  ngOnInit(): void {
    this.findAlunos()
    this.findSetores()
  }

  findAlunos(): void {
    this.serviceAluno.findAll().subscribe(resposta => {
        resposta.forEach((aluno) => {
          this.listaAlunos.push(aluno)
        })
    })
  }

  findSetores(): void { 
    this.serviceSetor.findAll().subscribe(resposta => {
      resposta.forEach((setor)=>{
        this.listaSetor.push(setor)
      })
    })
  }

  create(): void {
    if(this.formulario.valid){
      this.selected.forEach((aluno) => {
        this.grupo.alunos.push(aluno)
        this.aluno = aluno        
      })
      this.serviceGrupo.create(this.grupo).subscribe((resposta) => {
        this.serviceGrupo.message("Criado com sucesso!")
        this.router.navigate(['grupos'])
      }, err => {
        console.log(err);
        
        this.router.navigate(['grupos'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['grupos'])
  }

}
