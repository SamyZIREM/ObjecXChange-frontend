import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode d'inscription
  inscrireUtilisateur(nom: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/inscription`, { nom, email, password });
  }

  // Méthode de connexion
  seConnecter(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/connexion`, null, { params, responseType: 'json' });
  }

  // Vérifie si l'utilisateur est authentifié
  estAuthentifie(): boolean {
    const user = localStorage.getItem('user');
    return user !== null; // L'utilisateur est authentifié s'il existe dans le localStorage
  }

  // Implémentation de CanActivate pour protéger les routes
  canActivate(): boolean {
    if (this.estAuthentifie()) {
      return true; // L'utilisateur est authentifié, il peut accéder à la route
    } else {
      this.router.navigate(['/authentification']); // Rediriger vers la page de connexion
      return false; // L'accès est refusé
    }
  }

  // Récupérer les données utilisateur depuis localStorage
  getUserData(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
