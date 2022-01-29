import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../common/TokenService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor
  (private tokenService: TokenService) { } 


  canActivate(
    
    route :ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      
        if ( this.tokenService.getUser().roles.toString() != ['ROLE_USER','ROLE_ADMIN'] || this.tokenService.getUser() == null) {
          
            return false;
          }            
          return true
  }

}