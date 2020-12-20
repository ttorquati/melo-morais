import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DoadoresService } from '../doadores/services/services.doadores';
import { NovoDoador } from './model/novo-doador';

@Component({
  selector: 'app-cadastro-doador',
  templateUrl: './cadastro-doador.component.html',
  styleUrls: ['./cadastro-doador.component.scss']
})

export class CadastroDoadorComponent implements OnInit {

  private getUnsubscribe$: Subject<void>;
  doadorForm: FormGroup;

  constructor(public doadoresService: DoadoresService) {}

  ngOnInit(): void {
    this.createFormGroup(new NovoDoador());
  }

  ngOnDestroy(): void {
    this.getUnsubscribe$.next();
    this.getUnsubscribe$.complete();
}

  submit() {
    const result: NovoDoador = Object.assign({}, this.doadorForm.value);
    this.doadoresService.salvaDoador(result)
    .subscribe(response => {
      console.log(response);
    });
  }

  createFormGroup(novoDoador: NovoDoador) {
    this.doadorForm = new FormGroup({
        nome: new FormControl(novoDoador.nome),
        contato: new FormControl(novoDoador.contato),
        quantidade: new FormControl(novoDoador.quantidade),
        semana: new FormControl(novoDoador.semana),
        endereco: new FormGroup({
          rua: new FormControl(novoDoador.endereco.rua),
          numero: new FormControl(novoDoador.endereco.numero),
          bairro: new FormControl(novoDoador.endereco.bairro)
        })
    });
  }
}
