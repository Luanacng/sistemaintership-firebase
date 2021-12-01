import { NgModel } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from './../../services/grupo.service';
import { EstagioService } from './../../services/estagio.service';
import { Estagio } from '../../models/estagio';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-estagio',
  templateUrl: './create-estagio.component.html',
  styleUrls: ['./create-estagio.component.css']
})
export class CreateEstagioComponent implements OnInit {

  listaGrupos: Grupo[]=[]

  selected : Grupo[] = []

  grupo: Grupo = {
    nome: '',
    instituicao:'',
    setor:'',
    alunos:[],
    estagio:[]
  }
  
  @ViewChild('inputGrupo') public inputGrupo!: NgModel

  
  estagio: Estagio = {
    nome: '',
    descricao: '',
    inicio: '',
    fim: '',
    grupo: [],
    finalizado: false
  }

  constructor(
    private router: Router, 
    private service: EstagioService, 
    private serviceGrupo: GrupoService,
    public login: LoginService) { }

  ngOnInit(): void {
    this.findGrupos()    
  
  }

  create(): void {
    this.formataData()       
    this.service.create(this.estagio).subscribe((resposta2) => {
      
    //grupo update
    this.serviceGrupo.findById(this.inputGrupo.value.id).subscribe((resposta2) => {

      this.service.findAll().subscribe(resposta => {
        var lastEstagio = [...resposta].pop()?.id
        var idInt  = parseInt(lastEstagio!, 10) 
        
        this.grupo = resposta2
        this.grupo.estagio.push(this.estagio)
        this.grupo.estagio[0].id = idInt.toString()
        this.serviceGrupo.update(this.grupo).subscribe((resposta2)=>{
         
        })
      })
  
      // this.grupo = resposta
      // this.grupo.estagio.push(this.estagio)
      // this.grupo.estagio[0].id = string
      // this.serviceGrupo.update(this.grupo).subscribe((resposta2)=>{
       
      // })
    })
    
    //-------------------
      this.service.message('Estágio criado com sucesso!')
      this.router.navigate(['estagios-abertos'])
      
    }, err => {
      this.service.message('Falha ao criar') 
      this.router.navigate(['estagios-abertos'])
    })
    
  }


  formataData(): void{
    let data = new Date(this.estagio.inicio)
    let data2 = new Date(this.estagio.fim)
    this.estagio.inicio = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    this.estagio.fim = `${data2.getDate()}/${data2.getMonth() + 1}/${data2.getFullYear()}`
  }

  findGrupos(): void { 
    this.serviceGrupo.findAll().subscribe(resposta => {
      resposta.forEach((grupo)=>{
        if(grupo.estagio.length === 0){
          this.listaGrupos.push(grupo)
        }
      })
    })
  }
}
