import { LoginService } from './../../services/login.service';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from './../../services/grupo.service';
import { EstagioService } from './../../services/estagio.service';
import { Estagio } from './../../models/estagio';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estagios-finalizados',
  templateUrl: './estagios-finalizados.component.html',
  styleUrls: ['./estagios-finalizados.component.css']
})
export class EstagiosFinalizadosComponent implements OnInit {

  listFinished: Estagio[] = []
  listaGrupos: Grupo[] = []

  constructor(
    private service: EstagioService, 
    private serviceGrupo: GrupoService, 
    private router: Router,
    public login: LoginService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(estagio => {
        if(estagio.finalizado) {
          this.listFinished.push(estagio)
        }
      })
    })
  }

  voltar(): void {
    this.router.navigate([''])
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta)=>{
      if(resposta === null){
        this.service.message("Deletado com sucesso")
       
      }
    })
  }

}
