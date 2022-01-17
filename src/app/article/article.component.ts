import { Component, Input, OnInit } from '@angular/core';



import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private serviceArticle: ArticleService, private serviceAuth : AuthentificationService) {}

  public urlfiles: string = 'http://localhost:8080/api/file/filename/'

public idArticle : string [] = [localStorage.getItem('idArticle')];
public listArticles: number = +this.idArticle;
public afficheArticle : any  ;
public getAvatar : string  ;

public imagearticle : any[] = [] // url de l'image 

public nomberImage : Number
public avatar : any 



ngOnInit(){
  this.getArticles();
  
  
  
  }

// -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

public getArticles() {
  return this.serviceArticle.getArticleById(this.listArticles).subscribe((data) => {
    this.afficheArticle = [data] ;

    this.afficheArticle.forEach(element => {
      
      element.avatar = this.urlfiles + element.avatar;
      console.log(element) // on recupere le nom de l'avatar du user fichier
      this.avatar = [element];
      

     
      })
      this.getImage()
    
      
 
  });

}

// -------------------------------------------------- appel de l'avatar de l'utilisateurs  --------------------------------------------------


// -------------------------------------------------- appel des image de l'article --------------------------------------------------

public getImage() {

this.afficheArticle.forEach(element => {
element.file.forEach(element => { 
  element = this.urlfiles + element;
  this.imagearticle.push(element)
  console.log(this.afficheArticle)
})

})

}

}