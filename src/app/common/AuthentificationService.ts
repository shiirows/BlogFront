import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AuthentificationService {


    
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    //LES DIFFERENTS URL DU BACK 
    public urlApi: string = "http://localhost:8080/api/auth/";
    public urlApiUpdate: string = "http://localhost:8080/";
    public urlApiActivation: string = "http://localhost:8080/active"

    //METHODE POUR LES INSCRIPTION
    public signup(utilisateur: UtilisateurInscription): Observable<any> {
        return this.http.post(this.urlApi + "signup", utilisateur, this.httpOptions);
    }

    //METHODE POUR LES ACTIVATION
    public activation(token: string): Observable<any> {
        return this.http.get(this.urlApiActivation + "?token=" + token);
    }

    //METHODE POUR LES CONNEXION
    public signin(username: string, password: string): Observable<any> {
        return this.http.post(this.urlApi + "signin", { username, password }, this.httpOptions);
    }

    //METHODE POUR LES DECONNEXION
    public deconnexion(): Observable<any> {
        return this.http.get(this.urlApi + "deconnexion");
    }

    //METHODE POUR LES MISE A JOUR
    public update(id: number , country: string, city : string, description : string, number_phone : Number ): Observable<any> {
        return this.http.put(this.urlApiUpdate + "update?id=" + id +"$country=" + country + "$city=" + city + 
        "$description=" + description + "$number_phone=" + number_phone   ,  this.httpOptions);
    }

}