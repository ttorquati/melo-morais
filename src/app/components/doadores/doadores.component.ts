import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DoadoresGetModel } from '../doadores/models/doadores-get';
import { DoadoresService } from '../doadores/services/services.doadores';


@Component({
    selector: 'app-doadores',
    templateUrl: './doadores.component.html',
    styleUrls: ['./doadores.component.scss'],
})
export class DoadoresComponent implements OnInit, OnDestroy {
    private getUnsubscribe$: Subject<void>;
    doadores: MatTableDataSource<DoadoresGetModel>;
    displayedColumns: string[] = ['nome', 'contato', 'quantidade', 'semana', 'rua', 'numero', 'bairro', 'complemento', 'obs', 'ativo', 'deletar'];
    pageInitial = 10;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(public doadoresService: DoadoresService) {
        this.getUnsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.getDoadores();
    }

    ngOnDestroy(): void {
        this.getUnsubscribe$.next();
        this.getUnsubscribe$.complete();
    }

    getDoadores(): void {
        this.getUnsubscribe$.next();

        this.doadoresService
            .getDoadores()
            .pipe(takeUntil(this.getUnsubscribe$))
            .subscribe(response => {
                this.doadores = new MatTableDataSource(response);
                this.doadores.paginator = this.paginator;
            });
    }

    delete(id: number): void {
        this.doadoresService.deletaDoador(id).subscribe(resp => {
            console.log(resp);
            this.getDoadores();
        });
    }

    applyFilter(value: string): void {
        this.doadores.filter = value;
    }
}
