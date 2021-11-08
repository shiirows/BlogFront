import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  public urlApi: string = 'http://localhost:8080/api/post/';


  

  //Fonction qui permet de créer un article
  public createArticle(article: CreationArticle): Observable<any> {
    return this.http.post(this.urlApi + 'create', article, this.httpOptions);
  }

  //Fonction qui permet de récupérer un article

  public getArticles(): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'views/');
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

  //Fonction qui permet de récupérer un article par son id
  public getArticleById(id: number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'views/' + id);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

  //Fonction qui permet de modifier un article
  public updateArticle(id ,article: CreationArticle): Observable<any> {
    return this.http.put(this.urlApi + 'update/' + id , article, this.httpOptions);
  }

  //Fonction qui permet de supprimer un article
  public deleteArticle(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'delete/' + id);
  }


}
