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

  public addRegionToPays(region : String, pays: String): Observable<any> {
    return this.http.post(this.urlApi, {region, pays} , this.httpOptions);
    }

  public getRegionList(id: number): Observable<any> {
    return this.http.get(this.urlApi + id , this.httpOptions);
  }

  public getRegionByPays(id: number): Observable<any> {
    return this.http.get(this.urlApi + id , this.httpOptions);
  }

  public updateRegion(name : String, id: number): Observable<any> {
    return this.http.put(this.urlApi + id ,{name}  , this.httpOptions);
    }


}
