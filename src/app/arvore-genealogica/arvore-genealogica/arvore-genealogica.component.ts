import { Membro } from './../../dto/arvore-genealogica/membro.model';
import { Component, OnInit } from '@angular/core';
import { ComandoConstants } from 'src/app/contants/comando.constants';
import { ArvoreGenealogica } from './../../dto/arvore-genealogica/arvore-genealogica.model';
import { Pergunta } from './../../dto/pergunta/pergunta.model';
import { PerguntaResponse } from './../../dto/pergunta/pergunta.response.model.';
import { PerguntaService } from './../../pergunta/pergunta.service';
import { IvyParser } from '@angular/compiler';

@Component({
  selector: 'app-arvore-genealogica',
  templateUrl: './arvore-genealogica.component.html',
  styleUrls: ['./arvore-genealogica.component.scss']
})
export class ArvoreGenealogicaComponent implements OnInit {

  constructor(private perguntaService: PerguntaService) {}

  listPerguntas: Pergunta[] = [];

  pergunta: Pergunta = {};
  arvoreGenealogica: ArvoreGenealogica = new ArvoreGenealogica();
  membro: Membro = new Membro();

  numeroPergunta = 0;
  resposta = '';

  ngOnInit(): void {
    this.perguntaService.consultarPerguntas().subscribe(
      (res: PerguntaResponse) => {
        this.listPerguntas = res.listPergunta;
        this.pergunta = this.listPerguntas[0];
      }
    );
  }

  proximaPergunta() {
    let proximaPergunta: Pergunta;

    if (this.resposta.length < 3) {
      alert('Deverá ser preenchido pelo menos três caracteres.');
      return;
    }

    if (this.pergunta.codigo === 3) {
      this.membro.setNome(this.resposta);
    }

    if (this.pergunta.codigo === 5) {
      this.membro.setConjugue(this.resposta);
    }

    if (this.pergunta.possuiRestricao) {
      const restricao = this.pergunta.listRespostaRestricao
        .find(restricaoFilter => restricaoFilter.descricao.toUpperCase() === this.resposta.toUpperCase());

      if (restricao === null || restricao === undefined) {
        alert('Não entendi sua resposta!');
        return;
      } else {
        proximaPergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === restricao.proximaPergunta);
      }
    } else {
      proximaPergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === this.pergunta.proximaPergunta);
    }

    if (ComandoConstants.CONCATENAR_FAMILIA === proximaPergunta.comando) {
      this.arvoreGenealogica.nomeFamilia = this.resposta;

      proximaPergunta.descricao = `${proximaPergunta.descricao} ${this.arvoreGenealogica.nomeFamilia} ?`;
    } else if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === proximaPergunta.comando) {
      proximaPergunta.descricao = `${this.membro.getNome()} ${proximaPergunta.descricao}`;
    } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === proximaPergunta.comando) {
      proximaPergunta.descricao = `${proximaPergunta.descricao} ${this.membro.getNome()} ?`;
    }

    this.pergunta = proximaPergunta;
    this.resposta = '';
  }

}
