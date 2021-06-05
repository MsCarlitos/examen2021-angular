import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'usuarios',
    loadChildren:()=>import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canLoad:[ AuthGuard ],
    canActivate:[ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
