import { RespostaRestricao } from './resposta/resposta.restricao.model';
export interface Pergunta {
    descricao?: string;
    possuiRestricao?: boolean;
    listRespostaRestricao?: RespostaRestricao[];
}
