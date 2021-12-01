import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../common/articleService';

@Component({
  selector: 'app-article-user',
  templateUrl: './article-user.component.html',
  styleUrls: ['./article-user.component.scss']
})
export class ArticleUserComponent implements OnInit {

  constructor(private serviceArticle : ArticleService) { }

  public paysIdContinants : any [] = [] ;
  public continentsId : number ;
  public continents : any [] = [] ;

  ngOnInit(): void {
    
    
  }


  public valueContinents(id: number) : void {
    this.paysIdContinants = [];
    this.continents = [];
    this.continentsId = id;
    console.log(this.continentsId);
    this.getContinent()
    this.getPaysId()
   
  }

  //Fonction pour récupérer les pays
  public getPaysId() : void {
    this.serviceArticle.getPays(this.continentsId).subscribe(
      (data) => {
        this.paysIdContinants = data;
        this.mySortingFunction()
        
        console.log(this.paysIdContinants);
      }
    );
  }


  //fonction pour récuperer les contient
  public getContinent() : void {
    this.serviceArticle.getContinent(this.continentsId).subscribe(
      (data) => {
        this.continents = data;
        console.log(this.continents);
      }
    );
  }

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


  
      // names must be equal
      return 0;
    });
    
  }

}
