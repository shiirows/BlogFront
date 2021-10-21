import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';


@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
  constructor(private http: HttpClient) {}
  
  public urlApi: string = "http://localhost:8080/api/post/";
    

  //Fonction qui permet de récupérer tous les posts


  //Fonction qui permet de créer un article
  public createArticle(article: CreationArticle): Observable<any> {
    return this.http.post(this.urlApi + "create", article, this.httpOptions);

  }


}
