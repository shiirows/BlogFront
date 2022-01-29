import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';
import { Article } from '../model/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  constructor(
    private serviceArticle: ArticleService,
    private route: ActivatedRoute,
  ) {}

  public urlfiles: string = 'http://localhost:8080/api/file/filename/';

  public articleId: number;
  public afficheArticle: any;


  public imagearticle: any[] = []; // url de l'image

  public nomberImage: Number;
  public avatar: any;

  ngOnInit() {
    this.route.params.subscribe((params : ParamMap) => {
      this.articleId = params['id'];
    });
    this.getArticles();
      
  }

  // -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

 public getArticles() {
    this.serviceArticle.getArticleById(this.articleId ).subscribe((param: Article) => {
        this.afficheArticle = [param];
       console.log(this.afficheArticle);
        this.getAvatar()
        this.getImage();
      });
  }

  // -------------------------------------------------- appel de l'avatar de l'utilisateurs  --------------------------------------------------
public getAvatar(){
  this.afficheArticle.forEach((element) => {
    element.avatar = this.urlfiles + element.avatar;

  });
}


  // -------------------------------------------------- appel des image de l'article --------------------------------------------------

  public getImage() {
    this.afficheArticle.forEach((element) => {
      element.files.forEach((element) => {
        element = this.urlfiles + element;
        
        this.imagearticle.push(element);
        
      });
    });
  }
}
