export class Membro {
    private nome: string;
    private conjugue: string;
    private filhos: Membro[];


    public adicionarNovoMembro(filho: Membro) {
        this.filhos.push(filho);
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public getConjugue(): string {
        return this.conjugue;
    }

    public setConjugue(conjugue: string) {
        this.conjugue = conjugue;
    }

}
