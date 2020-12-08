import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000';

// Escopo raiz: Qualquer componente que precisar de PhotoService, terá a mesma instância
@Injectable({providedIn: 'root'})
export class PhotoService {

  // Cria a property automaticamente
  constructor(private http:HttpClient) {

  }

  listFromUser(userName: string) {
    return this.http
    .get<Object[]>(API + '/' + userName + '/photos');
  }
}
