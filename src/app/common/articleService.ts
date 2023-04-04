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
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  

  constructor(private http: HttpClient) {}

  public urlApi: string = environment.apiUrl + 'article/';


  public urlApiUpload: string = "http://localhost:8080/api/file/";
  public urlApiContinent: string = environment.apiUrl + 'continents/';

  //appel les article by paysName
public getArticlePaysName(names : String): Observable<any> {

  return this.http.post(this.urlApi+ "pays/", { name: names }, this.httpOptions);
    };

  //Fonction qui permet de récupérer les article

  public getArticles(): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi );
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
   return this.http.get<Article>(this.urlApi + id );
  
  }

   //Fonction qui permet de récupérer les article de l'utilisateur
   public getArticleByIdUser(): Observable<any> {
    const obs: Observable<any> = this.http.get<Article>(this.urlApi + 'user/' ,  this.httpOptions );
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
    return this.http.delete(this.urlApi + id ,this.httpOptions);
  }

  //Fonction qui permet d'ajouter en favoris un article
  public addFavoris(id : number): Observable<any> {
    return this.http.post(this.urlApi + 'addfavoris/' + id , this.httpOptions);
  }

  //Fonction qui permet de supprimer un article de la liste des favoris
  public deleteFavoris(id: number): Observable<any> {
    return this.http.delete(this.urlApi + 'deletefavoris/' + id , this.httpOptions);
  }

  //Fonction qui permet de récupérer les articles de la liste des favoris
  public getArticleFavoris(): Observable<any> {
    return this.http.get<Article>(this.urlApi + 'favoris' , this.httpOptions);
    };

//Fonction pour envoyer l'article en formdata
 public fileArticle( article: CreationArticle , file : File[]): Observable<any> {
  
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  }
  formData.append('pays', article.pays.toString());
  formData.append('continents', article.continents.toString());
  formData.append('titre', article.titre);
  formData.append('content', article.content);
  return this.http.post(this.urlApi , formData   )
}

// METHODE POUR AFFICHER L'AVATAR OU AUTRE IMAGE

public getPicture(filename : String[]): Observable<any> {  
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
