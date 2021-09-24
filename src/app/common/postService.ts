import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';


Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }
    private url: String = "http://localhost:8080/";  

    //Fonction qui permet de récupérer tous les posts
    public getPosts(postId: number): Observable<any> {
        return this.http.get(this.url + "view/" + postId).pipe(
            map(response => response)
        );
    }

   
}