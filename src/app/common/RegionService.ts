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
export class RegionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public urlApi: string = environment.apiUrl + 'regions/';

  //Fonction qui permet d'ajouter une region à un pays
  public addRegionToPays(region : String, pays: String): Observable<any> {
    return this.http.post(this.urlApi, {region, pays} , this.httpOptions);
    }

    //Fonction qui permet de récupérer toute les regions
  public getRegionList(id: number): Observable<any> {
    return this.http.get(this.urlApi + id , this.httpOptions);
  }

  //Fonction qui permet de récupérer toute les regions par pays
  public getRegionByPays(id: number): Observable<any> {
    return this.http.get(this.urlApi + id , this.httpOptions);
  }

  //Fonction qui permet de modifier une region
  public updateRegion(name : String, id: number): Observable<any> {
    return this.http.put(this.urlApi + id ,{name}  , this.httpOptions);
    }


}
