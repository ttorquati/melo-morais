import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeraRota } from './models/gera-rota';
import { DoadoresService } from '../doadores/services/services.doadores';
import { MatTableDataSource } from '@angular/material/table';
import { DoadoresGetModel } from '../doadores/models/doadores-get';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogDataExampleDialog } from '../cadastro-doador/cadastro-doador.component';
import {filter, map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gerador-rotas',
  templateUrl: './gerador-rotas.component.html',
  styleUrls: ['./gerador-rotas.component.scss']
})
export class GeradorRotasComponent implements OnInit {

  quantidade: number = 0;
  doadorForm: FormGroup;
  myControl = new FormControl();
  options: DoadoresGetModel[];
  filteredOptions: Observable<DoadoresGetModel[]>;
  doadoresSelecionados: MatTableDataSource<DoadoresGetModel>;
  bairrosDisponveis: Set<String>;
  displayedColumns: string[] = ['nome', 'contato', 'quantidade', 'semana', 'rua', 'numero', 'bairro', 'complemento', 'obs', 'acao'];

  constructor(public doadoresService: DoadoresService, public dialog: MatDialog) {
  
  }

  ngOnInit(): void {
    this.createFormGroup(new GeraRota());
    this.doadoresService.getDoadores().subscribe(resp => {
      this.options = resp;
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
      this.bairrosDisponveis = new Set(resp.map(d => d.endereco.bairro));
    });
  } 

  add() {
    if(!this.doadoresSelecionados) {
      this.doadoresSelecionados = new MatTableDataSource();
    }
    if(!this.doadoresSelecionados.data.find(s => s.id == this.myControl.value.id)){
      this.doadoresSelecionados.data.push(this.myControl.value);
      this.quantidade++;
      this.doadoresSelecionados.data = this.doadoresSelecionados.data;
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    this.myControl.reset();
  }

  optionToString(option) {
    if(option && option.endereco) {
      return option.endereco.rua + " - " + option.endereco.numero;
    }
  }

  private _filter(value: any): DoadoresGetModel[] {
    let filterValue;
    if(!value){
      filterValue = '';
    }else if (value.endereco){
      filterValue = value.endereco.rua.toLowerCase();
    } else{
      filterValue = value.toLowerCase();
    }

    return this.options.filter(option => option.endereco.rua.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
  }

  submit(): void {
    if(this.myControl.value){
      if(!this.doadoresSelecionados) {
        this.doadoresSelecionados = new MatTableDataSource();
      }
      if(!this.doadoresSelecionados.data.find(s => s.id == this.myControl.value.id)){
        this.doadoresSelecionados.data.push(this.myControl.value);
        this.quantidade++;
        this.doadoresSelecionados.data = this.doadoresSelecionados.data;
      }
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
      this.myControl.reset();
      return;
    }
    this.getDoadoresSemanaBairro();
  }

  createFormGroup(geraRota: GeraRota) {
    this.doadorForm = new FormGroup({
        bairro: new FormControl(geraRota.bairro),
        semana: new FormControl(geraRota.semana),
        bairrosDisponveis: new FormControl(this.bairrosDisponveis)
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
          let uniqueArray = this.doadoresSelecionados.data;
          response.forEach(resp => {
            if(!this.doadoresSelecionados.data.find(s => s.id == resp.id)){
              uniqueArray.push(resp);
            }
          });
          this.doadoresSelecionados.data = uniqueArray;

        } else {
          this.doadoresSelecionados = new MatTableDataSource(response);
        }
        this.quantidade = this.doadoresSelecionados.data.length;
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
      this.dialog.open(RotaGeradaDialog, {
        height: '450px',
        data: {
          title: 'Rota gerada com sucesso!',
          message: rota,
          link: response.googleMapsUrls
        }
      });
    });
  }

}

@Component({
  selector: 'rota-gerada-dialog',
  templateUrl: 'modal/rota-gerada-dialog.html',
})
export class RotaGeradaDialog {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
}

