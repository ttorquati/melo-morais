import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeraRota } from './models/gera-rota';
import { DoadoresService } from '../doadores/services/services.doadores';
import { MatTableDataSource } from '@angular/material/table';
import { DoadoresGetModel } from '../doadores/models/doadores-get';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataExampleDialog } from '../cadastro-doador/cadastro-doador.component';

@Component({
  selector: 'app-gerador-rotas',
  templateUrl: './gerador-rotas.component.html',
  styleUrls: ['./gerador-rotas.component.scss']
})
export class GeradorRotasComponent implements OnInit {

  quantidade: number = 0;
  doadorForm: FormGroup;
  doadoresSelecionados: MatTableDataSource<DoadoresGetModel>;
  displayedColumns: string[] = ['nome', 'contato', 'quantidade', 'semana', 'rua', 'numero', 'bairro', 'complemento', 'obs', 'acao'];

  constructor(public doadoresService: DoadoresService, public dialog: MatDialog) {
  
  }

  ngOnInit(): void {
    this.createFormGroup(new GeraRota());
  } 

  ngOnDestroy(): void {
  }

  submit(): void {
    this.getDoadoresSemanaBairro();
  }

  createFormGroup(geraRota: GeraRota) {
    this.doadorForm = new FormGroup({
        bairro: new FormControl(geraRota.bairro),
        semana: new FormControl(geraRota.semana)
    });
  }

  getDoadoresSemanaBairro(): void {
    const result: GeraRota = Object.assign({}, this.doadorForm.value);
    let semanas = [];
    semanas.push(result.semana)
    let bairros = [];
    bairros.push(result.bairro)
    this.doadoresService.getDoadoresSemanaBairro(semanas, bairros)
      .subscribe(response => {
        if(this.doadoresSelecionados) { 
          this.doadoresSelecionados.data = this.doadoresSelecionados.data.concat(response);
        } else {
          this.doadoresSelecionados = new MatTableDataSource(response);
        }
        this.quantidade+= this.doadoresSelecionados.data.length;
      });
  }

  excluir(id: number):void {
    this.doadoresSelecionados.data = this.doadoresSelecionados.data.filter(function(value){ 
        return value.id != id;
    });
    this.quantidade--;
  }

  limpar(): void {
    this.doadoresSelecionados = null;
    this.quantidade = 0;
  }

  gerarRota(): void {
    if(this.quantidade > 25) {
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          title: 'Erro!',
          message: 'Infelizmente o limite são 25 endereços'
        }
      });
      return;
    }

    this.doadoresService.gerarRota(this.doadoresSelecionados.data.map(d => d.id)).subscribe(response => {
      console.log(response);
      let rota = response.rota.map(resp => resp.endereco.rua + ", " + resp.endereco.bairro + ", " + resp.endereco.numero).join("\n\n");
      let rota2 = response.rota.map(resp => resp.endereco.rua + ", " + resp.endereco.bairro + ", " + resp.endereco.numero).join("<br>");
      this.dialog.open(DialogDataExampleDialog, {
        height: '450px',
        data: {
          title: 'Rota gerada com sucesso!',
          message: rota
        }
      });
    });
  }

}
