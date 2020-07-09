import { Membro } from './membro.model';

export class ArvoreGenealogica {
    nomeFamilia?: string;
    membros?: Membro[];

    public adicionarNovoMembro(membro: Membro) {
        this.membros.push(membro);
    }

    constructor() {
        this.nomeFamilia = '';
        this.membros = [];
    }

}
