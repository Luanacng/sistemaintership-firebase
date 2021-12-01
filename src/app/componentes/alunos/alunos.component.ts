import { LoginService } from './../../services/login.service';
import { Aluno } from './../../models/aluno';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  list: Aluno[] = []

  @ViewChild(MatTable) table!: MatTable<Aluno>;

  displayedColumns: string[] = ['id', 'nome','matricula', 'curso','actions'];
  dataSource = new MatTableDataSource<Aluno>(this.list);


  constructor(private service: AlunoService,public login: LoginService) { }

  ngOnInit(): void {
    this.findAll()       
  }


  findAll(): void {
    this.service.findAll().subscribe(resposta => {
        this.dataSource.data = resposta as Aluno[]
    })
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
       if(resposta === null){
        this.dataSource.data.filter(aluno => aluno.id != id)
        this.service.message('Deletado com sucesso!')
       }
       this.service.message('Deletado com sucesso!')
       this.findAll()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
