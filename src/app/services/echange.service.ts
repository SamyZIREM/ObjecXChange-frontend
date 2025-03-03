import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Echange } from 'src/app/models/echange';  // Importation du modèle Echange

@Injectable({
  providedIn: 'root'
})
export class EchangeService {
  private apiUrl = 'http://localhost:8080/echanges';  // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer les échanges d'un utilisateur par ID
  getUserEchanges(userId: number): Observable<Echange[]> {
    return this.http.get<Echange[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  // Proposer un échange (pour envoyer une proposition d'échange)
  proposerEchange(echange: Echange): Observable<Echange> {
    return this.http.post<Echange>(`${this.apiUrl}/proposer`, echange);
  }

  // Accepter un échange
  accepterEchange(echangeId: number): Observable<Echange> {
    return this.http.post<Echange>(`${this.apiUrl}/accepter`, null);
  }

  // Refuser un échange
  refuserEchange(echangeId: number): Observable<Echange> {
    return this.http.post<Echange>(`${this.apiUrl}/refuser`, null);
  }
}
