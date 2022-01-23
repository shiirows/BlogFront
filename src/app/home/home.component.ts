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

  public urlfiles: string = 'http://localhost:8080/api/file/filename/'
  
  public listArticles: any[] ; // contien tout les articles 
  public continents : any[] ; // contien les article par continent 
  public pays : any[] =[] ; //contien les données de l'article par pays 

  public idpays : number; // on stock l'id du pays dans une variable pour la reutiliser
  public idcontinents : number; // on stock l'id du continent dans une variable pour la reutiliser dans la fonction onChange2 au cas
                                // ou l'utilisateur selection tout les pays du continent  
  

  


  // -------------------------------------------------- Appel des continents  --------------------------------------------------

//
 
  public getContinent(): any {
    
    this.serviceArticle.getContinentList().subscribe(
      (data) => {
        this.continents = data;
        console.log(this.continents);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // -------------------------------------------------- affichage des pays par le select continents et des article lier au continents--------

  public onChange(event :number ) {
if (event == 0) {
  this.afficheArticle();
} 
this.idcontinents = event;
    //appel les article par contients
    this.serviceArticle.getArticleByContinent(event).subscribe(
      (data) => {
        this.listArticles = data;
        this.listArticles.forEach(element => {
          element.file = this.urlfiles + element.file[0];
        });

      })


    //appel les pays qui va les placer dans le selecteur pays (onChange2)
    this.serviceArticle.getPays(event).subscribe(
      (data) => {
        this.pays = data;
        console.log(this.pays);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  // -------------------------------------------------- affichage des articles par id pays--------------------------------------------------

  public onChange2(event: number) {
    if (event == 0) {
      this.onChange(this.idcontinents);
    }
    console.log(event);
    this.serviceArticle.getArticlePays(event).subscribe(
      (data) => {
        this.listArticles = data;
        this.listArticles.forEach(element => {
          element.file = this.urlfiles + element.file[0];
        });
        console.log(this.listArticles);
      }
    );

  }



  

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
// -------------------------------------------------- affichage de tout les articles --------------------------------------------------
  public afficheArticle(): any {
    return this.serviceArticle.getArticles().subscribe((data) => {
      this.listArticles = data;
      console.log(this.listArticles);
      this.listArticles.forEach(element => {
        element.file = this.urlfiles + element.file[0];
     
      });


      // afficher les articles du plus récent au plus ancien
      this.listArticles.sort((a, b) => {
        return b.id - a.id;
        
      });
    });
  }




  ngOnInit(): void {
    this.getContinent()
    this.afficheArticle();
  }

 
}
