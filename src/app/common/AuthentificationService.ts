import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { User } from '../model/UpdateUser';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  public user!: Utilisateur;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'auth/';
  public urlApiUser: string = environment.apiUrl + 'user/';
  public urlApiActivation: string = environment.apiUrl + 'active';

  public heroku: string = 'https://blog-trotter-backend.herokuapp.com/api/auth/';

  //METHODE POUR LES INSCRIPTION
  public signup(utilisateur: UtilisateurInscription): Observable<any> {
    console.log(utilisateur);
    return this.http.post(this.heroku + 'signup',utilisateur,this.httpOptions
    );
  }

  //METHODE POUR LES ACTIVATION
  public activation( idActivation: string): Observable<any> {
    return this.http.post<any>(this.urlApiActivation, {idActivation,},this.httpOptions);}

  //METHODE POUR LES CONNEXION
  public signin(email: string, password: string): Observable<any> {
    return this.http.post(this.heroku + 'signin',{ email, password },this.httpOptions);
  }

  //METHODE POUR LES DECONNEXION
  public deconnexion(): Observable<any> {
    return this.http.get(this.urlApi + 'signout');
  }
}
