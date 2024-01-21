import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  private apiUrl= 'http://localhost:3000/auth';
  constructor(private http:HttpClient) { }
  authenticate(matricule: number, motPasse: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/loginAdmin`,
      {
        matricule: matricule,  
        motPasse: motPasse,
      },
      {
        responseType: 'text' as 'json',
      }
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Combined method to create headers and make authenticated requests
  authenticatedRequest(url: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token is missing'); // Handle missing token error as needed
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${url}`, { headers }); // Make authenticated request
  }
}
