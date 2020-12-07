import { DoadoresEnderecoGetModel } from "./doadores-endereco-get";

export class DoadoresGetModel {
    contato: string;
    endereco: DoadoresEnderecoGetModel[];
    nome: string;
    quantidade: number;
    semana: number;
}
