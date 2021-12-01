import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../common/articleService';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private serviceArticle: ArticleService, ) {}

public idArticle : string = localStorage.getItem('idArticle');
public listArticles: number = +this.idArticle;
public afficheArticle : any [] = [] ;








// -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

public getArticles() {
  return this.serviceArticle.getArticleById(this.listArticles).subscribe((data) => {
    this.afficheArticle = [data] ;
    console.log(this.afficheArticle);
  });

}



  ngOnInit(): void {
    this.getArticles();
   console.log(this.listArticles);
  }

}
