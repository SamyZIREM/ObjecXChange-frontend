import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ajouté pour ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './components/authentification/authentification.component'; // Nom corrigé
import { ObjetComponent } from './components/objets/objets.component';
import { EchangeComponent } from './components/echange/echange.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Ajouté pour router-outlet

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent, // Nom corrigé
    ObjetComponent,
    EchangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Ajouté pour éviter les erreurs ngModel
    RouterModule // Ajouté pour éviter l'erreur router-outlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
