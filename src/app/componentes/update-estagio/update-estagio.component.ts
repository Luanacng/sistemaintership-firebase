import { LoginService } from './../../services/login.service';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from './../../services/grupo.service';
import { EstagioService } from './../../services/estagio.service';
import { Estagio } from './../../models/estagio';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-estagio',
  templateUrl: './update-estagio.component.html',
  styleUrls: ['./update-estagio.component.css']
})
export class UpdateEstagioComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  @ViewChild('inputGrupo') public inputGrupo!: NgModel
  @ViewChild('inputInicio') public inputInicio!: NgModel
  @ViewChild('inputFim') public inputFim!: NgModel
  @ViewChild('inputNome') public inputNome!: NgModel
  @ViewChild('inputDescricao') public inputDescricao!: NgModel

  listaGrupos: Grupo[] = []

  estagio: Estagio = {
    nome: '',
    descricao: '',
    inicio: '',
    fim: '',
    grupo: [],
    finalizado: false
  }

  grupo: Grupo = {
    nome: '',
    instituicao:'',
    setor:'',
    alunos: [],
    estagio: []
  }

  public inicio: string = ''
  public fim: string = ''

  constructor(
    private router: Router, 
    private service: EstagioService, 
    private route: ActivatedRoute,
    private serviceGrupo: GrupoService,public login: LoginService) { }

  ngOnInit(): void {
    this.findGrupos()

    this.grupo.id = this.route.snapshot.paramMap.get("id")!;
    this.estagio.id = this.route.snapshot.paramMap.get("id_estagio")!;

    this.findById()

  }
 
  findById(): void {
    this.service.findById(this.estagio.id).subscribe((resposta) => {
      this.estagio = resposta
      this.inicio = this.estagio.inicio
      this.fim = this.estagio.fim
    })
    this.serviceGrupo.findById(this.grupo.id).subscribe((resposta)=>{
      this.grupo = resposta    
    })
    
  }

  update(): void {
      
    this.formataData()
    if(this.inputGrupo.touched){
       if(this.grupo.id != this.inputGrupo.value.id){
        this.grupo.estagio = []
        this.serviceGrupo.findById(this.inputGrupo.value.id).subscribe((grupo_att)=>{
          grupo_att.estagio.push(this.estagio)
        })
      }
    }

    if(this.formulario.touched){
      if(!this.inputInicio.touched){
        this.estagio.inicio = this.inicio
      }
      if(!this.inputFim.touched){
        this.estagio.fim = this.fim
      }
  
      this.service.update(this.estagio).subscribe((resposta) => {
        this.grupo.estagio[0] = this.estagio
        this.serviceGrupo.update(this.grupo).subscribe(()=>{})
        this.service.message('Informacoes atualizadas com sucesso!')
        this.router.navigate(['estagios-abertos'])   
    }, error => {
      this.service.message('Falha ao atualizar')
      console.log(error);
      
      this.router.navigate(['estagios-abertos'])
    })
    }

    
  }

  cancel(): void {
    this.router.navigate(['estagios-abertos'])
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
