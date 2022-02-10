import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, multicast } from 'rxjs/operators';
import { Article } from '../model/Article';

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

  public urlApi: string = 'http://localhost:8080/api/article/';

  public urlApiUpload: string = "http://localhost:8080/api/file/";




  //Fonction qui permet de créer un article
  public createArticle(article: CreationArticle): Observable<any> {
    return this.http.post(this.urlApi + 'create', article, this.httpOptions);
  }

  //Fonction qui permet de récupérer les article

  public getArticles(): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'views/');
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

  //Fonction pour afficher une liste d'article par continent
public getArticleByContinent(id : number): Observable<any> {
  const obs: Observable<any> = this.http.get(this.urlApi + 'articlecontinents/' + id , this.httpOptions);
  const traitement = (param: any) => {
    return param as any;
  };
  return obs.pipe(map(traitement));
}


  //Fonction pour afficher la liste des article d'un pays
public getArticlePays(id : number): Observable<any> {
  const obs: Observable<any> = this.http.get(this.urlApi + 'articlepays/' + id , this.httpOptions);
  const traitement = (param: any) => {
    return param as any;
  };
  return obs.pipe(map(traitement));
}


  //Fonction qui permet de récupérer un article par son id
  
  public getArticleById(id: number): Observable<any> {
   return this.http.get<Article>(this.urlApi + 'view/' + id );
  
  }

   //Fonction qui permet de récupérer les article de l'utilisateur
   public getArticleByIdUser(): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'articleuser' ,  this.httpOptions );
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
    return this.http.delete(this.urlApi + 'delete/' + id ,this.httpOptions);
    
  }

  //Fonction pour afficher la liste des pays d'un continent
  public getPays(id : number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'pays/' + id , this.httpOptions);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

  //Fonction pour afficher le continent souhaiter par son id
  public getContinent(id: number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'continents/' + id , this.httpOptions);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

 
  // cette fonction permet de récupérer tout les continents

  public getContinentList(): Observable<any> { 
    return this.http.get(this.urlApi + 'continents/' , this.httpOptions);
  }





//Fonction pour envoyer l'article en formdata
 public fileArticle( article: CreationArticle , file : FileList): Observable<any> {
  
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  }

  formData.append('pays', article.pays.toString());
  formData.append('continents', article.continents.toString());
  formData.append('titre', article.titre);
  formData.append('content', article.content);

  return this.http.post(this.urlApi + 'create' , formData  )

}


// METHODE POUR AFFICHER L'AVATAR OU AUTRE IMAGE

public getIamgeArticle(filename : String[]): Observable<any> {
  console.log(filename)
    
return this.http.get(this.urlApiUpload + "filename/" + filename ,  { responseType: 'blob', observe: 'response' });

}

// METHODE POUR ENVOYER UN COMMMENTAIRE

public addCommentaire( id : number, commentaire : string) : Observable<any> {
  return this.http.post(this.urlApi + 'commentaire' , commentaire , this.httpOptions);
}



/*
pour les multiples fichiers 
 accept=".jpg,.jpeg,.png"
VEGA — 03/01/2022
class Queue{
inqueue
in queue
typescript 
async
await
task
timeout
*/


}
