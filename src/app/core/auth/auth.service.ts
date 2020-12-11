import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // O pipe permite a adição de operações que serão executadas entre o post e o subscribe.
  // Ao executar o subscribe, é garantido que as operações do pipe já terão sido executadas.
  // O observe: response permite acesso ao cabeçalho da resposta.
  authenticate(userName: string, password: string) {
    return this.http
      .post(API_URL + '/user/login', { userName, password }, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        console.log(`User ${userName} authenticated with token ${authToken}`);

      }));
  }
}
