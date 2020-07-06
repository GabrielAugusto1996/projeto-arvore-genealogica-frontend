import { LoginRoutingModule } from './login/login-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './usuario.service';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  providers: [
    UsuarioService
  ],
  exports: [
    LoginComponent
  ]
})
export class UsuarioModule { }
