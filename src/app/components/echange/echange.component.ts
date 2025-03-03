import { Component, OnInit } from '@angular/core';
import { EchangeService } from 'src/app/services/echange.service';
import { Echange } from 'src/app/models/echange';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.scss']
})
export class EchangeComponent implements OnInit {
  userId: number | null = null;  // L'ID de l'utilisateur connecté
  echanges: Echange[] = [];  // Liste des échanges de l'utilisateur

  constructor(
    private echangeService: EchangeService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUserId();  // Récupérer l'ID de l'utilisateur connecté
    if (this.userId) {
      this.loadUserEchanges();  // Charger les échanges si l'utilisateur est authentifié
    }
  }

  // Récupérer l'ID de l'utilisateur connecté depuis localStorage via AuthService
  getUserId(): void {
    const userData = this.authService.getUserData();  // Utilisation de la méthode du AuthService
    if (userData && userData.id) {
      this.userId = userData.id;
    } else {
      console.error("❌ Utilisateur non authentifié, redirection vers la page de connexion.");
      window.location.href = '/authentification';  
    }
  }

  // Charger les échanges de l'utilisateur
  loadUserEchanges(): void {
    if (!this.userId) return;
    
    this.echangeService.getUserEchanges(this.userId).subscribe(response => {
      this.echanges = response;
    });
  }

  // Accepter un échange
  accepterEchange(id: number): void {
    this.http.post(`http://localhost:8080/echanges/accepter/${id}`, null).subscribe({
      next: (response) => {
        alert("✅ Échange accepté !");
        this.loadUserEchanges();  // Recharger les échanges pour afficher le statut mis à jour
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'acceptation de l'échange", err);
        alert("❌ Une erreur est survenue lors de l'acceptation de l'échange.");
      }
    });
  }

  // Refuser un échange
  refuserEchange(id: number): void {
    this.http.post(`http://localhost:8080/echanges/refuser/${id}`, null).subscribe({
      next: (response) => {
        alert("❌ Échange refusé !");
        this.loadUserEchanges();  // Recharger les échanges pour afficher le statut mis à jour
      },
      error: (err) => {
        console.error("❌ Erreur lors du refus de l'échange", err);
        alert("❌ Une erreur est survenue lors du refus de l'échange.");
      }
    });
  }

  // Vérifie si l'utilisateur connecté est le receveur de l'échange
  estReceveur(echange: Echange): boolean {
    return this.userId === echange.receveur.id;
  }
}
