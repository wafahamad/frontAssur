import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reclamation } from '../Classes/reclamation';
import { Observable } from 'rxjs';
const url="http://localhost:3000/reclamations"

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http:HttpClient) { }
  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${url}`);
  }

  
  getReclamationById(num: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${url}/${num}`);
  }


  EnvoiReclamation(navigantMatricule: number,contenu: string): Observable<Reclamation> {
    const reclamation = { navigantMatricule, contenu };
    return this.http.post<Reclamation>(`${url}/envoyer/${navigantMatricule}`, reclamation);
  }
 
  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${url}/${reclamation.num}`, reclamation);
  }
  deleteReclamation(num: number): Observable<any> {
    return this.http.delete<any>(`${url}/${num}`);
  }
}
