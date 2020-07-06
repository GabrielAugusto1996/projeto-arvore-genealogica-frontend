import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usuario: UsuarioService) { }

  ngOnInit(): void {
  }

}
