import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Pour la redirection après connexion
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {
  nom = '';
  email = '';
  password = '';
  message = '';
  isFormValid = false;
  isInscription = false;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private authService: AuthService, private router: Router) {}

  validateForm() {
    this.isFormValid = this.emailPattern.test(this.email) && this.password.length >= 6 && this.nom.length > 0;
  }

  inscrire() {
    this.authService.inscrireUtilisateur(this.nom, this.email, this.password).subscribe(response => {
      this.message = 'Inscription réussie!';
    }, error => {
      if (error.status === 500) {
        this.message = 'Un utilisateur avec cet email existe déjà.';
      } else {
        this.message = 'Erreur lors de l\'inscription.';
      }
    });
  }

  connecter() {
    this.authService.seConnecter(this.email, this.password).subscribe(response => {
      this.message = 'Connexion réussie!';
      localStorage.setItem('user', JSON.stringify(response));  // Stocke les données utilisateur dans localStorage
      this.router.navigate(['/objets']);  // Redirection vers la page des objets après la connexion réussie
    }, error => {
      if (error.status === 401) {
        this.message = 'Email ou mot de passe incorrect.';  // Si le backend renvoie 401, afficher ce message
      } else {
        this.message = 'Erreur lors de la connexion.';
      }
    });
  }

  revenirConnexion() {
    this.isInscription = false;
    this.nom = '';
    this.email = '';
    this.password = '';
    this.message = '';
  }
}
