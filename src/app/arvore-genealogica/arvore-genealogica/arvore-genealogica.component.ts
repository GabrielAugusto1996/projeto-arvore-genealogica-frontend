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

  constructor(private perguntaService: PerguntaService) { }

  listPerguntas: Pergunta[] = [];

  pergunta: Pergunta = {};
  arvoreGenealogica: ArvoreGenealogica = new ArvoreGenealogica();

  numeroPergunta = 0;
  resposta = '';
  ordem = 0;

  ngOnInit(): void {
    this.perguntaService.consultarPerguntas().subscribe(
      (res: PerguntaResponse) => {
        this.listPerguntas = res.listPergunta;
        this.pergunta = this.listPerguntas[0];
      }
    );
  }

  proximaPergunta() {

    if (this.pergunta.codigo === 2) {
      if (this.resposta.length < 3) {
        alert('Deverá ser preenchido pelo menos três caracteres.');
        return;
      } else {
          this.arvoreGenealogica.nomeFamilia = this.resposta;

          this.pergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === this.pergunta.proximaPergunta);
          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.nomeFamilia} ?`;
          return;
      }
    }

    do {

      if (this.pergunta.codigo === 3) {
        const primeiroMembro = new Membro(this.resposta, this.ordem);
        this.arvoreGenealogica.adicionarNovoMembro(primeiroMembro);

        this.pergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === this.pergunta.proximaPergunta);
        if (ComandoConstants.CONCATENAR_FAMILIA === this.pergunta.comando) {
          this.arvoreGenealogica.nomeFamilia = this.resposta;

          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.nomeFamilia} ?`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === this.pergunta.comando) {
          this.pergunta.descricao = `${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ${this.pergunta.descricao}`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === this.pergunta.comando) {
          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ?`;
        } else if (ComandoConstants.ENCERRAR_FLUXO === this.pergunta.comando) {
          this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setFinalizado(true);
        }
        return;
      }

      if (this.pergunta.codigo === 5) {
        this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setConjugue(this.resposta);

        this.pergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === this.pergunta.proximaPergunta);
        if (ComandoConstants.CONCATENAR_FAMILIA === this.pergunta.comando) {
          this.arvoreGenealogica.nomeFamilia = this.resposta;

          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.nomeFamilia} ?`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === this.pergunta.comando) {
          this.pergunta.descricao = `${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ${this.pergunta.descricao}`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === this.pergunta.comando) {
          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ?`;
        } else if (ComandoConstants.ENCERRAR_FLUXO === this.pergunta.comando) {
          this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setFinalizado(true);
        }

        return;
      }

      if (this.pergunta.codigo === 8) {
        this.ordem++;
        const novoFilho = new Membro(this.resposta, this.ordem);

        this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().adicionarNovoFilho(novoFilho);

        this.pergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === this.pergunta.proximaPergunta);
        if (ComandoConstants.CONCATENAR_FAMILIA === this.pergunta.comando) {
          this.arvoreGenealogica.nomeFamilia = this.resposta;
  
          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.nomeFamilia} ?`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === this.pergunta.comando) {
          this.pergunta.descricao = `${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ${this.pergunta.descricao}`;
        } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === this.pergunta.comando) {
          this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ?`;
        } else if (ComandoConstants.ENCERRAR_FLUXO === this.pergunta.comando) {
          this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setFinalizado(true);
        }
        return;
      }

      if (this.pergunta.possuiRestricao) {
        const restricao = this.pergunta.listRespostaRestricao
          .find(restricaoFilter => restricaoFilter.descricao.toUpperCase() === this.resposta.toUpperCase());

        if (restricao === null || restricao === undefined) {
          alert('Não entendi sua resposta!');
          return;
        } else {
          this.pergunta = this.listPerguntas.find(perguntaFilter => perguntaFilter.codigo === restricao.proximaPergunta);
          if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === this.pergunta.comando) {
            this.pergunta.descricao = `${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ${this.pergunta.descricao}`;
          } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === this.pergunta.comando) {
            this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ?`;
          } else if (ComandoConstants.ENCERRAR_FLUXO === this.pergunta.comando) {
            this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setFinalizado(true);
        }
          return;
        }
      }

      if (ComandoConstants.CONCATENAR_MEMBRO_INICIO === this.pergunta.comando) {
        this.pergunta.descricao = `${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ${this.pergunta.descricao}`;
        return;
      } else if (ComandoConstants.CONCATENAR_MEMBRO_FINAL === this.pergunta.comando) {
        this.pergunta.descricao = `${this.pergunta.descricao} ${this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().getNome()} ?`;
        return;
      } else if (ComandoConstants.ENCERRAR_FLUXO === this.pergunta.comando) {
        this.arvoreGenealogica.getPrimeiroMembroNaoFinalizado().setFinalizado(true);
      }

      this.resposta = '';
    } while (this.arvoreGenealogica.validarExisteMembrosNaoFinalizados());
  }

}
