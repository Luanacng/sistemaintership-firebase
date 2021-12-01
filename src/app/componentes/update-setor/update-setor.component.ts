import { LoginService } from './../../services/login.service';
import { NgForm } from '@angular/forms';
import { SetorService } from './../../services/setor.service';
import { Setor } from './../../models/setor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-setor',
  templateUrl: './update-setor.component.html',
  styleUrls: ['./update-setor.component.css']
})
export class UpdateSetorComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  setor: Setor = {
    nome: ''
  }

  constructor(
    private router: Router, 
    private service: SetorService, 
    private route: ActivatedRoute,public login: LoginService) { }

  ngOnInit(): void {
    this.setor.id = this.route.snapshot.paramMap.get("id")! 
    this.findById()
  }
 
  findById(): void {
    this.service.findById(this.setor.id).subscribe((resposta) => {
      this.setor = resposta
    })
  }

  update(): void {
    if(this.formulario.valid){
      this.service.update(this.setor).subscribe((resposta) => {
        this.service.message('Informacoes atualizadas com sucesso!')
        this.router.navigate(['setores'])
      }, error => {
        this.service.message('Falha ao atualizar.')
        this.router.navigate(['setores'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['setores'])
  }
}
