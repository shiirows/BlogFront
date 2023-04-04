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
export class PaysService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public urlApi: string = environment.apiUrl + 'pays/';

  //Afficher la liste des pays par continent
 public getPays(id : number): Observable<any> {
    const obs: Observable<any> = this.http.get(this.urlApi + id , this.httpOptions);
    const traitement = (param: any) => {
      return param as any;
    };
    return obs.pipe(map(traitement));
  }

   //Créer un pays
   public createPays(name : String, id: number): Observable<any> {
    return this.http.post(this.urlApi + id ,{name}  , this.httpOptions);
    }

//Mettre a jour un pays
    public updatePays(name : String, id: number): Observable<any> {
      console.log(name, id)
      return this.http.post(this.urlApi + id ,{name}  , this.httpOptions);
      }

//Supprimer un pays
      public deletePays(id: number): Observable<any> {
        console.log(id)
        return this.http.delete(this.urlApi + id , this.httpOptions);
        }


}
