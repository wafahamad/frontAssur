import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailDepense } from '../Classes/detail-depense';

const apiUrl = 'http://localhost:3000/detaildepenses';

@Injectable({
  providedIn: 'root',
})
export class DetailDepenseService {
  constructor(private http: HttpClient) {}

  getDetailDepenses(numBs: number): Observable<DetailDepense[]> {
    return this.http.get<DetailDepense[]>(`${apiUrl}/${numBs}`);
  }

  getDetailDepenseById(idD: string): Observable<DetailDepense> {
    return this.http.get<DetailDepense>(`${apiUrl}/${idD}`);
  }

  addDetailDepense(detailDepense: DetailDepense): Observable<DetailDepense> {
    return this.http.post<DetailDepense>(`${apiUrl}/ajout`, detailDepense);
  }

  updateDetailDepense(idD: string, updatedDetailDepense: DetailDepense): Observable<any> {
    return this.http.put<any>(`${apiUrl}/update/${idD}`, updatedDetailDepense);
  }

  deleteDetailDepense(idD: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/delete/${idD}`);
  }
}
