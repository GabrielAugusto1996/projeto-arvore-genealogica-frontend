import { LoginComponent } from './login/login.component';
import { ArvoreGenealogicaComponent } from './arvore-genealogica/arvore-genealogica.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'arvore-genealogica',
        component: ArvoreGenealogicaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArvoreGenealogicaRoutingModule {}
