import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, multicast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpOptionsData = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',

  }),
};

  constructor(private http: HttpClient) {}

  public urlApi: string = 'http://localhost:8080/api/post/';

  public urlApiUpload: string = "http://localhost:8080/api/file/";

  public urlCreateArticle: string = "http://localhost:8080/api/post/";

 
  
 


  

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

  //Fonction qui permet de récupérer un article par son id
  public getArticleById(id: number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'view/' + id, this.httpOptions );
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
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

  //Fonction pour afficher la liste des pays
  public getPays(id : number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'pays/' + id , this.httpOptions);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

  //Fonction pour afficher la liste des contients par id
  public getContinent(id: number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + 'continents/' + id , this.httpOptions);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }


  //Fonction pour envoyer les image de l'article 
  public fileArticle( article: CreationArticle, file : File  ): Observable<any> {
    
 const formData = new FormData();
   formData.append('file', file[0]); 
   
    console.log(file, article);
    return this.http.post(this.urlCreateArticle + 'create', {file, article  } , this.httpOptionsData );


}


/*
//Fonction pour envoyer l'article en formdata
 public fileArticle(file : FileList , article: CreationArticle): Observable<any> {
  console.log(file, article);
  const formData = new FormData();
  const formData2 = new FormData();
  formData.append('file', file[0]);
  formData2.append('pays', article.pays.toString());
  formData2.append('continents', article.continents.toString());
  formData2.append('titre', article.titre);
  formData2.append('content', article.content);


  console.log(formData, formData2);
  return this.http.post(this.urlCreateArticle + 'create' , {formData , formData2}  , this.httpOptionsData   )


}*/



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
