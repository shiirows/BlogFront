import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../../common/articleService';
import { AuthentificationService } from '../../common/AuthentificationService';
import { TokenService } from '../../common/TokenService';
import { Article } from '../../model/Article';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private serviceToken: TokenService,
    private serviceAuth: AuthentificationService,
    private service: ArticleService,
    private route: Router
  ) {}

  public urlfiles: string = environment.apiUrlFile;

  public user = this.serviceToken.getUser().userInfo;

  public avatarUser = sessionStorage.getItem('url');
  public couvertureUser = sessionStorage.getItem('urlCouverture');

  public listArticles: Article[];

  ngOnInit(): void {
    this.articleUser();
  }

  //----------------------------------fonction pour appeler tout les l'articles du l'utiliateur

  public articleUser() {
    this.service.getArticleByIdUser().subscribe((data) => {
      this.listArticles = data;
    });
  }

  // fonction pour afficher l'article selectionner par son id

  public sendId(id: number) {
    this.route.navigate(['/article', id]);
  }

  //----------------------------------fonction pour suprimer l'article-------------------

  public deleteArticle(id: number) {
    this.service.deleteArticle(id).subscribe((data) => {
    });
    location.reload();
  }
}
