import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/user/user.service";
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from "./server-log.service";
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
    /* Único serviço que deve ser injetado no construtor. Os demais devem ser injetados sob demanda.
    Caso contrário, algum erro na criação desses componentes a serem injetados não seriam pegos pelo
    Error Handler que estamos criando */
  }

  handleError(error: any): void {
    console.log('passei pelo handler');

    // Injeção sob demanda
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);

    const url = location instanceof PathLocationStrategy
      ? location.path()
      : '';

    const message = error.message ? error.message : error.toString();

    console.log('Antes do router');
    /* if (environment.production) { */
      ngZone.run(() => router.navigate(['/error'])).then();
      // router.navigate(['/error']);
    /* } */
    console.log('Depois do router');

    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames.map(sf => sf.toString()).join('\n');

        // console.log(error);
        console.log(message);
        console.log(stackAsString);

        serverLogService.log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString
        }).subscribe(
          () => {
            console.log('Error logged on server');
          },
          err => {
            console.log(err);
            console.log('Fail to send error log to server');

          });
        });
  }
}
