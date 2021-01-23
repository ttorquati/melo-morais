import { Endereco } from "./endereco";

export class NovoDoador {
    nome: string;
    contato: string;
    quantidade: number;
    semana: number;
    endereco: Endereco = new Endereco();
}
