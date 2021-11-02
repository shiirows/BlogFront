import { TokenService } from './common/TokenService';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY ='Authorization';
@Injectable()
export  class  LogInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req

        // on va chercher le token d'auth si il existe
        const token = this.tokenService.getToken();
        if(token != null){
            // si prent, on insere le token d'auth dans la requete qu'on intercepte
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY,'Bearer '+ token)})
        }
        return next.handle(authReq);
    }
}


export const authInterceptorProvider = [
    {provide : HTTP_INTERCEPTORS, useClass : LogInterceptor, multi : true}
  ]