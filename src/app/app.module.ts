import { LoginService } from './services/login.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';

import { EstagiosAbertosComponent } from './componentes/estagios-abertos/estagios-abertos.component';
import { CreateEstagioComponent } from './componentes/create-estagio/create-estagio.component';
import { AlunosComponent } from './componentes/alunos/alunos.component';
import { SetoresComponent } from './componentes/setores/setores.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { CreateSetorComponent } from './componentes/create-setor/create-setor.component';
import { CreateGrupoComponent } from './componentes/create-grupo/create-grupo.component';
import { CreateAlunoComponent } from './componentes/create-aluno/create-aluno.component';
import { UpdateAlunoComponent } from './componentes/update-aluno/update-aluno.component';
import { UpdateEstagioComponent } from './componentes/update-estagio/update-estagio.component';

import { HttpClientModule } from '@angular/common/http';
import { UpdateSetorComponent } from './componentes/update-setor/update-setor.component';
import { UpdateGrupoComponent } from './componentes/update-grupo/update-grupo.component';
import { EstagiosFinalizadosComponent } from './componentes/estagios-finalizados/estagios-finalizados.component';
import { LoginComponent } from './componentes/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EstagiosAbertosComponent,
    CreateEstagioComponent,
    AlunosComponent,
    SetoresComponent,
    GruposComponent,
    CreateSetorComponent,
    CreateGrupoComponent,
    CreateAlunoComponent,
    UpdateAlunoComponent,
    UpdateSetorComponent,
    UpdateGrupoComponent,
    UpdateEstagioComponent,
    EstagiosFinalizadosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
