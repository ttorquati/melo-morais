import { DoadoresEnderecoGetModel } from "./doadores-endereco-get";

export class DoadoresGetModel {
    id: number;
    contato: string;
    endereco: DoadoresEnderecoGetModel;
    nome: string;
    quantidade: number;
    semana: number;
    ativo: boolean;
}
