import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoadoresComponent } from './components/doadores/doadores.component'

const routes: Routes = [
    // { path: 'Doadores', component: DoadoresComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
