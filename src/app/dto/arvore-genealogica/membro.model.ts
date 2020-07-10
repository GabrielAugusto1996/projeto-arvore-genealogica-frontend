export class Membro {
    private nome: string;
    private conjugue: string;
    private filhos: Membro[];
    private ordem: number;
    private finalizado: boolean;

    constructor(nome: string, ordem: number) {
        this.nome = nome;
        this.ordem = ordem;
        this.finalizado = false;
        this.filhos = [];
    }


    public adicionarNovoFilho(filho: Membro) {
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

    public getFilhos() {
        return this.filhos;
    }

    public getFinalizado(): boolean {
        return this.finalizado;
    }

    public setFinalizado(finalizado: boolean) {
        this.finalizado = finalizado;
    }

}
