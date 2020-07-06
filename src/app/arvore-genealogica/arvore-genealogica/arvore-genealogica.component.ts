import { PerguntaResponse } from './../../dto/pergunta/pergunta.response.model.';
import { Pergunta } from './../../dto/pergunta/pergunta.model';
import { PerguntaService } from './../../pergunta/pergunta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arvore-genealogica',
  templateUrl: './arvore-genealogica.component.html',
  styleUrls: ['./arvore-genealogica.component.scss']
})
export class ArvoreGenealogicaComponent implements OnInit {

  constructor(private perguntaService: PerguntaService) { }

  listPerguntas: Pergunta[] = [];

  pergunta: Pergunta = {};

  numeroPergunta: number = 0;

  resposta: string = '';

  ngOnInit(): void {
    this.perguntaService.consultarPerguntas().subscribe(
      (res: PerguntaResponse) => {
        this.listPerguntas = res.listPergunta;
        this.pergunta = this.listPerguntas[0];
      }
    );
  }

  proximaPergunta() {
    if (this.resposta.length < 3) {
      alert('Deverá ser preenchido pelo menos três caracteres.');
      return;
    }

    if (this.pergunta.possuiRestricao) {
      const restricao = this.pergunta.listRespostaRestricao.find(r => r.descricao.toUpperCase() === this.resposta.toUpperCase());

      if (restricao === null || restricao === undefined) {
        alert('Não entendi sua resposta!');
        return;
      }
    }

    if (this.numeroPergunta === 0) {
      console.log('O nome da Familia é:' + this.resposta);
    }

    if (this.numeroPergunta === 1) {
      console.log('O primeiro membro da familia foi:' + this.resposta);
    }

    this.numeroPergunta++;
    this.pergunta = this.listPerguntas[this.numeroPergunta];
    this.resposta = '';
  }

}
