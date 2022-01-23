import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreationArticle } from './../model/creationArticle';
import { map, multicast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  

  constructor(private http: HttpClient) {}

  public urlApi: string = 'http://localhost:8080/api/admin/pays/';

 //Fonction pour créer un pays

    public createPays(name : String, id: number): Observable<any> {
        return this.http.post(this.urlApi + 'createPays/'+ id  ,{name}  , this.httpOptions);
        }


//Fonction pour mettre a jour un pays
        public updatePays(name : String, id: number): Observable<any> {
          console.log(name, id)
          return this.http.post(this.urlApi + 'updatepays/'+ id  ,{name}  , this.httpOptions);
          }

//Fonction pour supprimer un pays
          public deletePays(id: number): Observable<any> {
            console.log(id)
            return this.http.delete(this.urlApi + 'deletepays/'+ id    , this.httpOptions);
            }
  
 


  




}
