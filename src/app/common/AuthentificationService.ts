import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { User } from '../model/UpdateUser';

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
  public urlApi: string = 'http://localhost:8080/api/auth/';

  public urlApiUser: string = 'http://localhost:8080/api/user/';

  public urlApiUpload: string = 'http://localhost:8080/api/file/';

  public urlApiActivation: string = 'http://localhost:8080/api/auth/active';

  //METHODE POUR LES INSCRIPTION
  public signup(utilisateur: UtilisateurInscription): Observable<any> {
    return this.http.post(
      this.urlApi + 'signup',
      utilisateur,
      this.httpOptions
    );
  }

  //METHODE POUR LES ACTIVATION
  public activation( idActivation: string): Observable<any> {
    return this.http.post<any>(
      this.urlApiActivation,
      {
       
        idActivation,
      },
      this.httpOptions
    );
  }

  //METHODE POUR LES CONNEXION
  public signin(username: string, password: string): Observable<any> {
    return this.http.post(
      this.urlApi + 'signin',
      { username, password },
      this.httpOptions
    );
  }

  //METHODE POUR LES DECONNEXION
  public deconnexion(): Observable<any> {
    return this.http.get(this.urlApi + 'signout');
  }

  //METHODE POUR LES MISE A JOUR DU PROFIL

  public update(userUpdate: User): Observable<any> {
    return this.http.post(this.urlApiUser + 'update', userUpdate, this.httpOptions);
  }

  //METHODE POUR LES MISE A JOUR DE L'AVATAR
  public updateAvatarUser(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.urlApiUser + 'avatar', formData);
  }

  //METHODE POUR LES MISE A JOUR DE LA COUVERTURE
  public updateCouvertureUser(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.urlApiUser + 'couverture', formData);
  }

  // METHODE POUR AFFICHER L'AVATAR OU AUTRE IMAGE

  public getAvatar(filename: String): Observable<any> {
    return this.http.get(this.urlApiUpload + 'filename/' + filename, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
