import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BordereauGAT } from '../Classes/bordereau-gat';

const apiUrl = 'http://localhost:3000/bordereaugats';

@Injectable({
  providedIn: 'root',
})
export class BordereauGATService {
  constructor(private http: HttpClient) {}

  getBordereauGATs(numBs: number): Observable<BordereauGAT[]> {
    return this.http.get<BordereauGAT[]>(`${apiUrl}/${numBs}`);
  }

  getBordereauGATById(idB: number): Observable<BordereauGAT> {
    return this.http.get<BordereauGAT>(`${apiUrl}/${idB}`);
  }

  addBordereauGAT(bordereauGAT: BordereauGAT): Observable<BordereauGAT> {
    return this.http.post<BordereauGAT>(`${apiUrl}/ajout`, bordereauGAT);
  }

  updateBordereauGAT(idB: number, updatedBordereauGAT: BordereauGAT): Observable<any> {
    return this.http.put<any>(`${apiUrl}/updateBord/${idB}`, updatedBordereauGAT);
  }

  deleteBordereauGAT(idB: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/deleteBord/${idB}`);
  }
}
