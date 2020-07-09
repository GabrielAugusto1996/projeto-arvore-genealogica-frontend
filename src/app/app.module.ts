import { BlockUI, BlockUIModule } from 'ng-block-ui';
import { ArvoreGenealogicaModule } from './arvore-genealogica/arvore-genealogica.module';
import { FormsModule } from '@angular/forms';
import { StorageService } from './services/security/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/security/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerguntaModule } from './pergunta/pergunta.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    PerguntaModule,
    ArvoreGenealogicaModule
  ],
  providers: [
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
