import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, observeOn } from 'rxjs/operators';
import { commentaire } from '../model/Comment';
import { environment } from 'src/environments/environment';

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

  public urlApi: string = environment.apiUrl + 'comments/';

  //Fonction qui permet de creer un commentaire
  public createComment(id: number, comment: string): Observable<any> {
    return this.http.post(this.urlApi + 'create/' + id,{ comment },this.httpOptions
    );
  }

  //Fonction qui permet de récupérer les commentaires d'un article
  public getComments(id: number): Observable<any> {
    return this.http.get<commentaire>(this.urlApi + id);
  }
}
