import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CadastroDoadorComponent } from './components/cadastro-doador/cadastro-doador.component';

import { DoadoresComponent } from './components/doadores/doadores.component'
import { GeradorRotasComponent } from './components/gerador-rotas/gerador-rotas.component';

const routes: Routes = [
    { path: '', component: DoadoresComponent },
    { path: 'doadores', component: DoadoresComponent },
    { path: 'cadastro-doador', component: CadastroDoadorComponent },
    { path: 'gera-rota', component: GeradorRotasComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}