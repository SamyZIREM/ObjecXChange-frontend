// src/app/services/objet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {
  private apiUrl = 'http://localhost:8080/objets'; // L'URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer les objets d'un utilisateur par ID
  getUserObjects(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  // Rechercher des objets par mot-clé
  searchObjects(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rechercher?keyword=${keyword}`);
  }

  // Ajouter un objet
  addObject(objet: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/ajouter`, objet);
  }
}
