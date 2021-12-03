import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../common/articleService';
import { CreationArticle } from '../model/creationArticle';

@Component({
  selector: 'app-article-user',
  templateUrl: './article-user.component.html',
  styleUrls: ['./article-user.component.css']
})
export class ArticleUserComponent implements OnInit {

  constructor(private serviceArticle : ArticleService, private formB: FormBuilder, private route: Router,) { }

  public choixAffiche : Boolean = true;
 
  public artcileForm: any;

  public paysIdContinants : any [] = [] ; // on rentre la liste des pays par l'id des contient
  public continentsId : number ; // id des continents
  public paysId : number // on rentre l'id du pays selectionner

  public continents : any [] = [] ;

 


  ngOnInit(): void {
    this.initForm();
    console.log(this.artcileForm);
  }

  public valuePays(id : number) {
    this.paysId = id;
    
  }

//fonction qui permet d'appeler les continent par un id 
// l'id continents appel par la suite la list des pays lier a l'id
  public valueContinents(id: number) : void {
    this.paysId = null;  // permet de remettre a zero si l'utilisateur choisi un autre continent 
    this.continentsId = id; // on ajoute l'id du continent dans la variable 
    this.getContinent() // on fait appel a la fonction pour récuperer les contient  ( a voir pour ameliorer )
    this.getPaysId() // on fait appel a la fonction pour récuperer les pays par l'id des contient
   
  }

  //Fonction pour récupérer les pays
  public getPaysId() : void {
    this.serviceArticle.getPays(this.continentsId).subscribe(
      (data) => {
        this.paysIdContinants = data; // on ajoute la liste des pays dans la variable paysIdContinants
        
        this.mySortingFunction() // on fait appel a la fonction pour trier les pays par ordre alphabetique
      }
    );
  }


  //fonction pour récuperer les contient
  public getContinent() : void {
    this.serviceArticle.getContinent(this.continentsId).subscribe(
      (data) => {
        this.continents = data; // on ajoute la liste des pays dans la variable paysIdContinants
      }
    );
  }

  public onSubmit() {
    this.choixAffiche = false; 
   
    console.log(this.paysId);
    console.log(this.continentsId);
  }

  
// fonction pour trier les pays par ordre alphabetique
  mySortingFunction()  {
    this.paysIdContinants.sort(function(a, b) {

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

  // ------------------------------------------ Formulaire pour l'article --------------------------------------------------

  public initForm() {
    this.artcileForm = this.formB.group({
      titre: ['', [ Validators.required, Validators.maxLength(45), Validators.minLength(3), ], ],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public onValid() {

    const titre: string = this.artcileForm.get('titre').value;

    const content: string = this.artcileForm.get('content').value;
    const pays : number = this.paysId;
    const continent : number = this.continentsId;

    let article: CreationArticle = new CreationArticle(titre, content , pays, continent);

    this.serviceArticle.createArticle(article).subscribe(
      (data) => {

        // on fait une redirection au menu home 
        
        console.log(data);

        
        this.route.navigate(['home' ]);
        
        
        
      }


    );
    
    

  }


  

}
