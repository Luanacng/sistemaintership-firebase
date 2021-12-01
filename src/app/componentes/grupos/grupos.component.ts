import { LoginService } from './../../services/login.service';
import { GrupoService } from './../../services/grupo.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Grupo } from './../../models/grupo';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  listaAlunos: Aluno[] = [];
  grupo: Grupo[]= [];

  @ViewChild(MatTable) table!: MatTable<Grupo>;

  displayedColumns: string[] = ['id', 'nome','instituicao','setor','alunos','actions'];
  dataSource = new MatTableDataSource(this.grupo);

  constructor(private serviceAluno: AlunoService, private serviceGrupo: GrupoService,public login: LoginService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAlunos(): void {
    this.serviceAluno.findAll().subscribe(resposta => {
        resposta.forEach((aluno) => {
          this.listaAlunos.push(aluno)
        })
    })
  }

  findAll(): void {
    this.serviceGrupo.findAll().subscribe(resposta => {
        this.dataSource.data = resposta as Grupo[]
    })
  }

  delete(id: any): void {
    this.serviceGrupo.delete(id).subscribe((resposta) => {
       if(resposta === null){
        this.dataSource.data.filter(grupo => grupo.id != id)
        this.serviceGrupo.message('Deletado com sucesso!')
       }
       this.findAll()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
