import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../configurations/api.config';
import { PerguntaResponse } from '../dto/pergunta/pergunta.response.model.';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PerguntaService {

  constructor(private http: HttpClient) { }

  consultarPerguntas(): Observable<PerguntaResponse> {
    return this.http.get<PerguntaResponse>(`${ApiConfig.BASE_URL}/perguntas`);
  }
}
