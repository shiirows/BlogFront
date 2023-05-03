import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { User } from '../model/UpdateUser';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public user!: Utilisateur;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK

  public urlApi: string = 'http://localhost:8080/api/user/info/';

  //METHODE POUR LES MISE A JOUR DU PROFIL

  public update(description: String): Observable<any> {
    return this.http.put(this.urlApi, {description}, this.httpOptions);
  }

  //METHODE POUR LES MISE A JOUR DE L'AVATAR en format blob
  public updateAvatarUser(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.urlApi + 'avatar', formData);
  } 

  //METHODE POUR LES MISE A JOUR DE LA COUVERTURE
  public updateCouvertureUser(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.urlApi + 'couverture', formData);
  }

}
