import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ObjetComponent } from './components/objets/objets.component';
import { EchangeComponent } from './components/echange/echange.component';
import { AuthService } from './services/auth.service'; // Assurez-vous d'importer votre service d'authentification

// Route protégée (requiert que l'utilisateur soit authentifié)
const routes: Routes = [
  { path: '', redirectTo: 'authentification', pathMatch: 'full' }, // Redirection vers la page de connexion
  { path: 'authentification', component: AuthentificationComponent },
  
  // Route protégée pour la page des objets
  { 
    path: 'objets', 
    component: ObjetComponent,
    canActivate: [AuthService] // Assurez-vous que l'utilisateur est authentifié
  },
  
  // Route protégée pour la page d'échange
  { 
    path: 'echanges', 
    component: EchangeComponent,
    canActivate: [AuthService] // Vérifie si l'utilisateur est connecté avant d'accéder à la page d'échange
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
