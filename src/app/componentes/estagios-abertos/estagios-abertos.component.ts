import { LoginService } from './../../services/login.service';
import { Estagio } from './../../models/estagio';
import { GrupoService } from './../../services/grupo.service';
import { Grupo } from './../../models/grupo';
import { EstagioService } from './../../services/estagio.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estagios-abertos',
  templateUrl: './estagios-abertos.component.html',
  styleUrls: ['./estagios-abertos.component.css']
})
export class EstagiosAbertosComponent implements OnInit {

  public closed: number = 0
  public open: number = 0


  listaEstagiosFinalizados: Estagio[] = []
  listaEstagios: Estagio[] = []
  listaGrupos: Grupo[] = []

  grupo: Grupo = {
    nome: '',
    instituicao:'',
    setor:'',
    alunos:[],
    estagio:[]
  }

  constructor(
    private service: EstagioService, 
    private serviceGrupo: GrupoService,
    private router: Router,
    public login: LoginService) { }

  ngOnInit(): void {
    
    this.findAll()     
    this.findGrupo()    
    
  }


  findAll(): void {
    this.service.findAll().subscribe((resposta)=>{
      resposta.forEach((estagio)=>{
        if(estagio.finalizado){
          this.listaEstagiosFinalizados.push(estagio)
        } else {
          this.listaEstagios.push(estagio)         
          this.open++
        }
      })
      this.closed = this.listaEstagiosFinalizados.length
    })
  }

  finalizar(estagio: Estagio, grupo_id: any): void {
    estagio.finalizado = true
    //grupo update
    this.serviceGrupo.findById(grupo_id).subscribe((resposta) => {
      this.grupo = resposta
      this.grupo.estagio = []
      this.serviceGrupo.update(this.grupo).subscribe((resposta2)=>{
      
      })
    })
    //-------------------
   
    
    this.service.update(estagio).subscribe((resposta) => {
      this.service.message('Estágio finalizado!')
      // setTimeout(() => {
      //   location.reload()
      // }, 2000);
      this.listaEstagios = this.listaEstagios.filter(estagios => estagios.id != estagio.id)
      this.listaGrupos = this.listaGrupos.filter(est => est.estagio.find(id_estagio => id_estagio.id != estagio.id))
      this.closed++
      this.open--
     
    })
  }

  findGrupo(): void {
    this.serviceGrupo.findAll().subscribe((grupos)=>{
      grupos.forEach((grupo)=>{
        if(grupo.estagio.length != 0){
          this.listaGrupos.push(grupo)
          
        }
      })
    })
    
  }

  delete(id: any, id_grupo: any): void {
    this.service.delete(id).subscribe((resposta)=>{
      
      this.serviceGrupo.findById(id_grupo).subscribe((resposta) => {
        resposta.estagio = []
        this.serviceGrupo.update(resposta).subscribe((resposta2)=>{
      
        })
      })
      //retirando o estagio do grupo
      this.listaGrupos = this.listaGrupos.filter(est => est.estagio.find(id_estagio => id_estagio.id != id))
      console.log(this.listaGrupos);
      
      this.open--
     
        this.service.message("Deletado com sucesso")
        this.listaEstagios = this.listaEstagios.filter(estagio => estagio.id != id)
      
    })
  }

}
