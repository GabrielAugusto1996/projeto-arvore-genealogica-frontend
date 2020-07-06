import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './usuario.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    UsuarioService
  ],
  exports: [
    LoginComponent
  ]
})
export class UsuarioModule { }
