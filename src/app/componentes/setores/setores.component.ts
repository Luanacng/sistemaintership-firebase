import { LoginService } from './../../services/login.service';
import { SetorService } from './../../services/setor.service';
import { Setor } from './../../models/setor';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css']
})
export class SetoresComponent implements OnInit {

  list: Setor[] = []

  @ViewChild(MatTable) table!: MatTable<Setor>;

  displayedColumns: string[] = ['id', 'nome','actions'];
  dataSource = new MatTableDataSource<Setor>(this.list);

  constructor(private service: SetorService,public login: LoginService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.service.findAll().subscribe((resposta) => {
      this.dataSource.data = resposta as Setor[]
    })
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
       if(resposta === null){
        this.dataSource.data.filter(setor => setor.id != id)
        this.service.message('Deletado com sucesso!')
       }
       this.findAll()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
