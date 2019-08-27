import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';
import { LoginComponent } from './usuarios/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { FormCategoriasComponent } from './categorias/form-categorias/form-categorias.component';
import { ListaCategoriasComponent } from './categorias/lista-categorias/lista-categorias.component';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { FormProdutosComponent } from './produtos/form-produtos/form-produtos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@ NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    FormCategoriasComponent,
    ListaCategoriasComponent,
    ListaProdutosComponent,
    FormProdutosComponent,
    LoginComponent,
    EsqueciSenhaComponent,
    CriarContaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
