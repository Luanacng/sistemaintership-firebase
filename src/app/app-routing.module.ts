import { LoginComponent } from './componentes/login/login.component';
import { EstagiosFinalizadosComponent } from './componentes/estagios-finalizados/estagios-finalizados.component';
import { UpdateEstagioComponent } from './componentes/update-estagio/update-estagio.component';
import { UpdateGrupoComponent } from './componentes/update-grupo/update-grupo.component';
import { UpdateAlunoComponent } from './componentes/update-aluno/update-aluno.component';
import { CreateGrupoComponent } from './componentes/create-grupo/create-grupo.component';
import { CreateSetorComponent } from './componentes/create-setor/create-setor.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { SetoresComponent } from './componentes/setores/setores.component';
import { AlunosComponent } from './componentes/alunos/alunos.component';
import { EstagiosAbertosComponent } from './componentes/estagios-abertos/estagios-abertos.component';
import { CreateEstagioComponent } from './componentes/create-estagio/create-estagio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAlunoComponent } from './componentes/create-aluno/create-aluno.component';
import { UpdateSetorComponent } from './componentes/update-setor/update-setor.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'create-estagio', component:CreateEstagioComponent},
  {path:'estagios-abertos',component:EstagiosAbertosComponent},
  {path:'estagios-finalizados', component:EstagiosFinalizadosComponent},
  {path:'alunos', component:AlunosComponent},
  {path:'setores', component:SetoresComponent},
  {path:'grupos', component:GruposComponent},
  {path:'login', component:LoginComponent},
  {path:'create-aluno', component:CreateAlunoComponent},
  {path:'create-setor', component:CreateSetorComponent},
  {path:'create-grupo', component:CreateGrupoComponent},
  {path:'update-aluno/:id',component:UpdateAlunoComponent},
  {path:'update-setor/:id',component:UpdateSetorComponent},
  {path:'update-grupo/:id',component:UpdateGrupoComponent},
  {path:'update-estagio/:id/:id_estagio',component:UpdateEstagioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
