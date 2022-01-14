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

public idArticle : string [] = [localStorage.getItem('idArticle')];
public listArticles: number = +this.idArticle;
public afficheArticle : any [] ;
public getAvatar : string  ;
public nameimageArtcile : string [] // nom de l'image recuperer 
public imagearticle : any [] = [] // url de l'image 

public nomberImage : Number
public avatar : any



ngOnInit(){
  this.getArticles();
  
   
    console.log(this.idArticle);
   console.log(this.listArticles);
  
  }

// -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

public getArticles() {
  return this.serviceArticle.getArticleById(this.listArticles).subscribe((data) => {
    this.afficheArticle = [data] ;

    this.afficheArticle.forEach(element => {
      this.getAvatar = element.avatar.toString(); // on recupere le nom de l'avatar du user fichier

     
      })
      this.getImage()
      this.avatarUser ()
      
    console.log(this.afficheArticle);
  });

}

// -------------------------------------------------- appel de l'avatar de l'utilisateurs  --------------------------------------------------

public avatarUser () {

  return this.serviceAuth.getAvatar(this.getAvatar).subscribe((data) => {
    this.avatar = [data] ;
    console.log(this.getAvatar);
  }); 

}

// -------------------------------------------------- appel des image de l'article --------------------------------------------------

public getImage() {

this.afficheArticle.forEach(element => {
   element.file.forEach(element => {
    this.nameimageArtcile = element.name;
    
    this.serviceArticle.getIamgeArticle(this.nameimageArtcile).subscribe((data) => {
    this.imagearticle.push(data);
    });

    console.log(this.imagearticle);
   
})
})
console.log(this.nameimageArtcile);



}






}
