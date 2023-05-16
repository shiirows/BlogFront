import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/Article';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ArticleFavorisService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  public urlApi: string = environment.apiUrl + 'article/favoris/';

  //Fonction qui permet d'ajouter en favoris un article
  public addFavoris(id : number): Observable<any> {
    return this.http.post(this.urlApi + id , this.httpOptions);
  }

  //Fonction qui permet de supprimer un article de la liste des favoris
  public deleteFavoris(id: number): Observable<any> {
    return this.http.delete(this.urlApi + id , this.httpOptions);
  }

  //Fonction qui permet de récupérer les articles de la liste des favoris
  public getArticleFavoris(): Observable<Article[]> {
    return this.http.get<Article[]>(this.urlApi  , this.httpOptions);
    };
}