import { LoginService } from './../../services/login.service';
import { GrupoService } from './../../services/grupo.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-update-aluno',
  templateUrl: './update-aluno.component.html',
  styleUrls: ['./update-aluno.component.css']
})
export class UpdateAlunoComponent implements OnInit {

  @ViewChild('formulario') public formulario!: NgForm

  aluno: Aluno = {
    nome: '',
    matricula: '',
    curso: ''
  }

  constructor(
    private router: Router, 
    private service: AlunoService, 
    private route: ActivatedRoute,
    private serviceGrupo: GrupoService,public login: LoginService) { }

  ngOnInit(): void {
    this.aluno.id = this.route.snapshot.paramMap.get("id")! 
    this.findById()
  
  }
 
  findById(): void {
    this.service.findById(this.aluno.id).subscribe((resposta) => {
      this.aluno = resposta
    })
  }

  verificaGrupo(aluno: Aluno): void {
        this.serviceGrupo.findAll().subscribe((grupos)=>{              
          grupos.forEach((grupo)=>{
            if(grupo.alunos.indexOf(this.aluno)){             
              let index = grupo.alunos.indexOf(this.aluno)
              grupo.alunos.push(aluno)                    
            }
          })
        })

  }

  update(): void {
    if(this.formulario.valid){
      this.service.update(this.aluno).subscribe((resposta) => {  
          this.service.message('Informacoes atualizadas com sucesso!')
          this.router.navigate(['alunos'])
      }, error => {
        console.log(error);
        
          this.service.message('Falha ao atualizar.')
          this.router.navigate(['/alunos'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['alunos'])
  }

}
