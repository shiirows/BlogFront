import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Article } from '../model/Article';
import { ArticleService } from './../common/articleService';
import { NgModule } from '@angular/core';
import { CreationArticle } from './../model/creationArticle';
import { UserService } from '../common/UserService';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  

  constructor(
    private serviceArticle: ArticleService,
  
    private route: Router
   
  ) {}

 
 


  public artcileForm: any;
  public listArticles: any = [] ;

 
  

//FONCTION QUI PERMET D'ENVOYER L'ID DE L'ARTICLE DANS ARTICLE.COMPONENT.TS PAR LE LOCALSTORAGE
  public sendId(id : number) {
    localStorage.setItem('idArticle' , id.toString());
    console.log(localStorage.getItem('idArticle'));
    this.route.navigate(['article']);
    
  }


  

// -------------------------------------------------- Supression d'un l'articles --------------------------------------------------


  public deleteArticle(id: number) {
    this.serviceArticle.deleteArticle(id).subscribe((data) => {
      console.log(data + 'article supprimé');

    });
    location.reload();
    
  }
// -------------------------------------------------- affichage des articles --------------------------------------------------
  public afficheArticle(): any {
    return this.serviceArticle.getArticles().subscribe((data) => {
      this.listArticles = data;
      console.log(this.listArticles);

      // afficher les articles du plus récent au plus ancien
      this.listArticles.sort((a, b) => {
        return b.id - a.id;
        
      });
    });
  }




 

  ngOnInit(): void {
 
    this.afficheArticle();
  }

 
}
