import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment'


const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  // O pipe permite a adição de operações que serão executadas entre o post e o subscribe.
  // Ao executar o subscribe, é garantido que as operações do pipe já terão sido executadas.
  // O observe: response permite acesso ao cabeçalho da resposta.
  authenticate(userName: string, password: string) {
    return this.http
      .post(API + '/user/login', { userName, password }, { observe: 'response' })
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);

      }));
  }
}
