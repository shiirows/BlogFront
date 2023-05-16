import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
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
  
  constructor(private http: HttpClient) {
  }
  public urlApi: string = environment.apiUrl + 'article/';
  public urlApiUpload: string = environment.apiUrl + 'file/';
  public urlApiContinent: string = environment.apiUrl + 'continents/';

  //appel les article by paysName
public getArticlePaysName(names : String): Observable<any> {
  return this.http.post(this.urlApi+ "pays/", { name: names }, this.httpOptions);
    };

  //appel les article by regionName
public getArticleRegionName(names : String): Observable<any> {
  return this.http.post(this.urlApi+ "region/", { name: names }, this.httpOptions);
    };

  //Fonction qui permet de récupérer les article

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.urlApi);
  }

  //Fonction pour afficher une liste d'article par continent
public getArticleByContinent(id : number): Observable<any> {
  return this.http.get<Article>(this.urlApi + 'continent/' + id , this.httpOptions);
}


  //Fonction pour afficher la liste des article d'un pays
public getArticlePays(id : number): Observable<any> {
 return this.http.get<Article>(this.urlApi + 'pays/' + id , this.httpOptions);
}

  //Fonction pour afficher la liste des article d'une region
public getArticleRegion(id : number): Observable<any> {
  return this.http.get<Article>(this.urlApi + 'region/' + id , this.httpOptions);
}


  //Fonction qui permet de récupérer un article par son id
  
  public getArticleById(id: number): Observable<any> {
   return this.http.get<Article>(this.urlApi + id );
  
  }

   //Fonction qui permet de récupérer les article de l'utilisateur
   public getArticleByIdUser(): Observable<any> {
   return this.http.get<Article>(this.urlApi + 'user' );
  }

  //Fonction qui permet de modifier un article
  public updateArticle(id ,article: CreationArticle): Observable<any> {
    return this.http.put(this.urlApi + 'update/' + id , article, this.httpOptions);
  }

  //Fonction qui permet de supprimer un article
  public deleteArticle(id: number): Observable<any> { 
    console.log(id);
    return this.http.delete(this.urlApi + id ,this.httpOptions);
  }

//Fonction pour envoyer l'article en formdata
 public fileArticle( article: CreationArticle , file : File[]): Observable<any> {
  console.log(article);
  console.log(file);
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  }
  formData.append('pays', article.pays.toString());
  formData.append('continents', article.continents.toString());
  formData.append('titre', article.titre);
  formData.append('content', article.content);
  formData.append('region', article.region.toString());
  console.log(formData);
  return this.http.post(this.urlApi , formData   )
}

// METHODE POUR AFFICHER L'AVATAR OU AUTRE IMAGE



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
