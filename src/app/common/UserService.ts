import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";




@Injectable ({
    providedIn: 'root'
})
export class UserService {

    constructor(private http : HttpClient){

    }
    public urlApi: string = "http://localhost:8080/api/test/";



    getAdminContent():Observable<any>{
        return this.http.get(this.urlApi + 'admin',{responseType: 'text'})
    }
    getUserContent():Observable<any>{
        return this.http.get(this.urlApi + 'user',{responseType: 'text'})
    }
    public recupUser(){

    }
}