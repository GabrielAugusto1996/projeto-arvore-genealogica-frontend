import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ArvoreGenealogicaRoutingModule } from './arvore-genealogica-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArvoreGenealogicaComponent } from './arvore-genealogica/arvore-genealogica.component';
import { PerguntaModule } from '../pergunta/pergunta.module';



@NgModule({
  declarations: [
    ArvoreGenealogicaComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PerguntaModule,
    ArvoreGenealogicaRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  exports: [
    ArvoreGenealogicaComponent,
    LoginComponent
  ]
})
export class ArvoreGenealogicaModule { }
