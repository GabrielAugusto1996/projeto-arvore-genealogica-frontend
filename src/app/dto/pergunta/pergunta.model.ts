import { RespostaRestricao } from './resposta/resposta.restricao.model';

export class Pergunta {
    codigo?: number;
    descricao?: string;
    possuiRestricao?: boolean;
    proximaPergunta?: number;
    comando?: string;
    listRespostaRestricao?: RespostaRestricao[];
}
