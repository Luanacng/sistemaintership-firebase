import { LoginService } from './../../services/login.service';
import { SetorService } from './../../services/setor.service';
import { Setor } from 'src/app/models/setor';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/models/aluno';
import { GrupoService } from './../../services/grupo.service';
import { NgForm, NgModel } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from 'src/app/models/grupo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-grupo',
  templateUrl: './update-grupo.component.html',
  styleUrls: ['./update-grupo.component.css']
})
export class UpdateGrupoComponent implements OnInit {

  listaAlunos: Aluno[] = [];
  listaSetor: Setor[] = []
  selected: Aluno[] = []

  @ViewChild('formulario') public formulario!: NgForm
  @ViewChild('inputAlunos') public inputAlunos!: NgModel
  @ViewChild('inputSetor') public inputSetor!: NgModel

  grupo: Grupo = {
    nome: '',
    instituicao:'',
    setor:'',
    alunos:[],
    estagio:[]
  }

  constructor(
    private router: Router,
    private service: GrupoService, 
    private route: ActivatedRoute,
    private serviceAluno: AlunoService,
    private serviceSetor: SetorService,public login: LoginService) { }

  ngOnInit(): void {
    this.findAlunos()
    this.findSetor()
    this.grupo.id = this.route.snapshot.paramMap.get("id")! 
    this.findById()   
    
  }
 
  findAlunos(): void {
    this.serviceAluno.findAll().subscribe(resposta => {
        resposta.forEach((aluno) => {
          this.listaAlunos.push(aluno)
        })
    })
  }

  findSetor(): void {
    this.serviceSetor.findAll().subscribe(resposta => {
      resposta.forEach((setor)=>{
        this.listaSetor.push(setor)
      })
    })
  }

  findById(): void {
    this.service.findById(this.grupo.id).subscribe((resposta) => {
      this.grupo = resposta
    })
  }

  update(): void {
    if(this.formulario.valid && this.formulario.touched){
      if(this.inputAlunos.touched){
        this.grupo.alunos = []
        this.selected.forEach((aluno) => {
          this.grupo.alunos.push(aluno)
        })
      }

      if(this.inputSetor.touched){
        this.grupo.setor = this.inputSetor.value
      }
      
      this.service.update(this.grupo).subscribe((resposta) => {
        this.service.message('Informacoes atualizadas com sucesso!')
        this.router.navigate(['grupos'])
      }, error => {
        console.log(error);
        
        this.service.message('Falha ao atualizar.')
        this.router.navigate(['grupos'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['grupos'])
  }


}
