import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = "http://localhost:8080/api/test/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAdminContent():Observable<any> {
    return this.http.get(API + "admin", {responseType : "text"})
  }
}
