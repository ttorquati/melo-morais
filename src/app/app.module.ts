import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DoadoresComponent } from './components/doadores/doadores.component';
import { GeradorRotasComponent, RotaGeradaDialog } from './components/gerador-rotas/gerador-rotas.component';
import { CadastroDoadorComponent } from './components/cadastro-doador/cadastro-doador.component';

@NgModule({
    declarations: [AppComponent, DoadoresComponent, GeradorRotasComponent, CadastroDoadorComponent, RotaGeradaDialog],
    imports: [
        CommonModule,
        BrowserModule, 
        HttpClientModule,
        AppRoutingModule, 
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatTableModule, 
        MatInputModule, 
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatGridListModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
