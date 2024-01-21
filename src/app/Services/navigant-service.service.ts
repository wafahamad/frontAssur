import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigant } from '../Classes/navigant';
import { Observable } from 'rxjs';
const url="http://localhost:3000"
const api = 'http://localhost:3000/auth';
@Injectable({
  providedIn: 'root'
})
export class NavigantServiceService {

  constructor(private http:HttpClient) { }
  getNavigants(): Observable<Navigant[]> {
    return this.http.get<Navigant[]>(`${url}/navigants`);
  }

  
  getNavigantById(matricule: number): Observable<Navigant> {
    return this.http.get<Navigant>(`${url}/navigants/${matricule}`);
  }


  registerNavigant(matricule: number, motPasse: string, nom: string, dateNaissance: Date, numCompte: number, fonction: string,marie: boolean,nomConjoint : string):
   Observable<Navigant> {
    const body = { matricule, motPasse ,nom,dateNaissance,numCompte,fonction,marie,nomConjoint };
    return this.http.post<Navigant>(`${api}/register`, body);
  }

 
  updateNavigant(matricule: number, navigant: Navigant): Observable<Navigant> {
    return this.http.put<Navigant>(`${url}/navigants/update/${matricule}`, navigant);
  }


  deleteNavigant(matricule: number): Observable<any> {
    return this.http.delete<any>(`${url}/navigants/delete/${matricule}`);
  }
}
