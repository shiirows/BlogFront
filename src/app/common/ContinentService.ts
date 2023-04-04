import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, multicast } from 'rxjs/operators';
import { Article } from '../model/Article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContinentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public urlApi: string = environment.apiUrl + 'continents/';

  //Récupére tout les continents
  public getContinentList(): Observable<any> { 
    return this.http.get(this.urlApi  , this.httpOptions);
  }

  //Fonction pour afficher le continent souhaiter par son id
  public getContinent(id: number): Observable<any> {
    return this.http.get(this.urlApi + id , this.httpOptions);
  }

  

}
