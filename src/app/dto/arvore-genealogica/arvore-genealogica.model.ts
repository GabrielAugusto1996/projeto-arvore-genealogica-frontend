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

    public validarExisteMembrosNaoFinalizados(): boolean {
        const membroFilter = this.membros
            .find(membro => false === membro.getFinalizado());

        if (membroFilter !== null || membroFilter !== undefined) {
            return true;
        } else {
            const filhoFilter = membroFilter.getFilhos().find(filho => filho.getFinalizado());

            if (filhoFilter !== null || filhoFilter !== undefined) {
                return true;
            }
        }

        return false;
    }

    public getPrimeiroMembroNaoFinalizado(): Membro {
        const membroFilter = this.membros
            .find(membro => false === membro.getFinalizado());

        if (membroFilter !== null || membroFilter !== undefined) {
            return membroFilter;
        } else {
            const filhoFilter = membroFilter.getFilhos().find(filho => filho.getFinalizado());

            if (filhoFilter !== null || filhoFilter !== undefined) {
                return filhoFilter;
            }
        }

        return null;
    }

}
