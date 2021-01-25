import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DoadoresService } from '../doadores/services/services.doadores';
import { NovoDoador } from './model/novo-doador';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-doador',
  templateUrl: './cadastro-doador.component.html',
  styleUrls: ['./cadastro-doador.component.scss']
})

export class CadastroDoadorComponent implements OnInit {

  doadorForm: FormGroup;

  constructor(public doadoresService: DoadoresService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.createFormGroup(new NovoDoador());
  }

  ngOnDestroy(): void {
  }

  submit() {
    const result: NovoDoador = Object.assign({}, this.doadorForm.value);
    this.doadoresService.salvaDoador(result)
    .subscribe(response => {
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          title: 'Sucesso!',
          message: 'Cadastro realizado com sucesso'
        }
      });
      console.log(response);
    },
    (err) => {
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          title: 'Houve um erro...',
          message: this.gerarMensagem(err)
        }
      });
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  gerarMensagem(err: any) {
    let messages = [];
    if(err.error.errors) {
      err.error.errors.forEach(element => {
        messages.push(element.field + ": " + element.defaultMessage);
      });
    } else {
      messages.push("Houve um erro no sistema, favor contatar o administrador.");
    }
    return messages[0];
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

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modal/dialog-elements-example-dialog.html',
})
export class DialogDataExampleDialog {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
}
