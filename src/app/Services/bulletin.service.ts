import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bulletin } from '../Classes/bulletin';

const apiUrl = 'http://localhost:3000/bulletins';

@Injectable({
  providedIn: 'root',
})
export class BulletinService {
  constructor(private http: HttpClient) {}

  getBulletins(): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(apiUrl);
  }
  getBulletinsByNavigant(matricule: number): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(`${apiUrl}/byNavigant/${matricule}`);
  }
  getBulletinByNumBs(numBs: number): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${apiUrl}/${numBs}`);
  }

  addBulletin(bulletin: Bulletin): Observable<Bulletin> {
    return this.http.post<Bulletin>(`${apiUrl}/ajout`, bulletin);
  }

  updateBulletin(numBs: number, updatedBulletin: Bulletin): Observable<any> {
    return this.http.put<any>(`${apiUrl}/updateBull/${numBs}`, updatedBulletin);
  }

  deleteBulletin(numBs: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/deleteBull/${numBs}`);
  }
}
