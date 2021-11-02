import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  
  public urlApiComment: string = 'http://localhost:8080/api/comment/';
 
 
 
 
 //Fonction qui permet de creer un commentaire
  public createComment(comment: any): Observable<any> {
    return this.http.post(this.urlApiComment + 'create', comment, this.httpOptions);
  }

  //Fonction qui permet de récupérer les commentaires d'un article
  public getComments(id: number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApiComment + 'view/' + id
    );
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }