import { Component, OnInit } from '@angular/core';
import { ObjetService } from 'src/app/services/objet.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-objet',
  templateUrl: './objets.component.html',
  styleUrls: ['./objets.component.scss']
})
export class ObjetComponent implements OnInit {
  userId: number | null = null; // ID de l'utilisateur connecté
  userObjects: any[] = []; // Liste des objets de l'utilisateur
  filteredObjects: any[] = []; // Liste filtrée d'objets
  searchKeyword: string = ''; // Mot-clé de recherche
  newObjectName: string = ''; // Nom de l'objet à ajouter
  newObjectDescription: string = ''; // Description de l'objet à ajouter
  message: string = ''; // Message de succès/erreur
  isExchangePopupOpen = false; // Indique si la pop-up est ouverte
  selectedUserObject: any;

  constructor(
    private objetService: ObjetService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUserId();
    if (!this.userId) {
      this.router.navigate(['/authentification']);
      return;
    }
    this.loadUserObjects();
  }

  /**
   * Récupérer l'ID de l'utilisateur connecté depuis localStorage
   */
  getUserId(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
    }
  }

  /**
   * Charger les objets de l'utilisateur connecté
   */
  loadUserObjects(): void {
    if (!this.userId) return;

    this.objetService.getUserObjects(this.userId).subscribe({
      next: (response) => {
        this.userObjects = response;
        this.filteredObjects = [...this.userObjects]; // Copie pour ne pas modifier l'original
      },
      error: (err) => console.error("❌ Erreur lors du chargement des objets :", err)
    });
  }

  /**
   * Recherche d'objets en fonction d'un mot-clé
   */
  searchObjects(): void {
    if (!this.searchKeyword.trim()) {
      this.filteredObjects = [...this.userObjects];
      return;
    }

    this.objetService.searchObjects(this.searchKeyword).subscribe({
      next: (response) => {
        this.filteredObjects = response;
      },
      error: (err) => console.error("❌ Erreur lors de la recherche :", err)
    });
  }

  /**
   * Ajouter un nouvel objet pour l'utilisateur
   */
  addObject(): void {
    if (!this.newObjectName || !this.newObjectDescription) return;

    const newObject = {
      nom: this.newObjectName,
      description: this.newObjectDescription,
      utilisateur: { id: this.userId }
    };

    this.objetService.addObject(newObject).subscribe({
      next: () => {
        this.message = '✅ Objet ajouté avec succès !';
        this.loadUserObjects();
        this.newObjectName = '';
        this.newObjectDescription = '';
      },
      error: (err) => console.error("❌ Erreur lors de l'ajout de l'objet :", err)
    });
  }

  /**
   * Rediriger vers la page des échanges
   */
  goToEchanges(): void {
    this.router.navigate(['/echanges']);
  }

  /**
   * Ouvrir la pop-up d'échange avec l'objet sélectionné
   */
  openExchangePopup(object: any): void {
    this.selectedUserObject = object;
    this.isExchangePopupOpen = true;
  }

  /**
   * Fermer la pop-up d'échange
   */
  closeExchangePopup(): void {
    this.isExchangePopupOpen = false;
  }

  /**
   * Proposer un échange d'objet
   */
  proposerEchange(objetOffert: any, objetDemande: any): void {
    if (!this.userId) return;

    const echangeData = {
      objetOffert: { id: objetOffert.id },
      objetDemande: { id: objetDemande.id },
      demandeur: { id: this.userId },
      receveur: { id: objetDemande.utilisateur?.id || 0 }
    };

    this.http.post('http://localhost:8080/echanges/proposer', echangeData)
      .subscribe({
        next: () => {
          alert("✅ Échange proposé avec succès !");
          this.isExchangePopupOpen = false;
        },
        error: (err) => {
          console.error("❌ Erreur lors de la proposition d'échange :", err);
          alert("❌ Erreur lors de la proposition d'échange !");
        }
      });
  }
}
