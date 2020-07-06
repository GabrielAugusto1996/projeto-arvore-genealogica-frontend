import { CredencialDTO } from './../../dto/credencial.model';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth.service';
import { StorageService } from 'src/app/services/security/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  creds: CredencialDTO = {
    email: '',
    senha: ''
  };

  @BlockUI() blockUI: NgBlockUI;


  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.validarLoginAutomatico();
  }

  entrar() {
    this.blockUI.start('Realizando Login... Por favor aguarde!');
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.loginSucess(response.headers.get('Authorization'));

      this.rotaTelaInicial();

      this.blockUI.stop();
    }, () => {
      this.toastrService.error('E-mail ou senha inválido!');
      this.blockUI.stop();
    });
  }

  validarLoginAutomatico() {
    this.blockUI.start('Validando Login Automático....');
    if (this.storageService.getLocalUser() !== null) {
      this.rotaTelaInicial();
    }
    this.blockUI.stop();
  }

  rotaTelaInicial() {
    this.router.navigate(['tela-inicial']);
  }



}
