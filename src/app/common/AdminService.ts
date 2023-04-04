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

  public urlApi: string = 'http://localhost:8080/api/pays/';
  public urlApi2: string = 'http://localhost:8080/api/regions/';



//Fonction pour ajouter une region au pays par le nom du pays
            


}
