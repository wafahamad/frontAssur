import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigEnfantService {
  private apiUrl = 'http://localhost:3000/navigEnfants';
  constructor(private http: HttpClient) { }
  // Ajouter un nouveau NavigEnfant
  ajouterEnfant(navigEnfant: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajoutEnfant`, navigEnfant);
  }

  // Récupérer tous les NavigEnfants
  getNavigEnfants(matricule: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${matricule}`);
  }

  // Récupérer un NavigEnfant par son ID
  getNavigEnfantById(idE: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idE}`);
  }

  // Mettre à jour un NavigEnfant par son ID
  updateEnfant(idE: number, navigEnfant: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateEnfant/${idE}`, navigEnfant);
  }

  // Supprimer un NavigEnfant par son ID
  deleteEnfant(idE: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteEnfant/${idE}`);
  }

}
