import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
        this.ulrFiles()

      })


    //appel les pays qui va les placer dans le selecteur pays (onChange2)
    this.serviceArticle.getPays(event).subscribe(
      (data) => {
        this.pays = data;
        this. mySortingFunction();
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
  
    this.serviceArticle.getArticlePays(event).subscribe(
      (data) => {
        this.listArticles = data;
       this.ulrFiles()
      }
    );

  }



  

//FONCTION QUI PERMET D'ENVOYER L'ID DANS LA ROUTE ARTICLE

  public sendId(id : number) {

    this.route.navigate(['/article', id]);

  }


// -------------------------------------------------- affichage de tout les articles --------------------------------------------------
  public afficheArticle(): any {
    return this.serviceArticle.getArticles().subscribe((data) => {
      this.listArticles = data;
      this.ulrFiles()
      this.sortByDate() 
      // afficher les articles du plus récent au plus ancien
      
    });
  }


  //fonction pour trier les articles par ordre de creation
public sortByDate() {
  this.listArticles.sort((a, b) => {
    return b.id - a.id;
    
  });
}

    
// fonction pour trier les pays par ordre alphabetique
  public  mySortingFunction()  {
    this.pays.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }    
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    
  }


  //fonction pour ajouter l'url au image

  public ulrFiles(){
    this.listArticles.forEach(element => {
      element.files = this.urlfiles + element.files[0];
    });
  }




  ngOnInit(): void {
   
    
    this.getContinent()
    this.afficheArticle();
  }

 
}
