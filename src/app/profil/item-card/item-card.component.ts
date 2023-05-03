import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/common/AuthentificationService';
import { TokenService } from 'src/app/common/TokenService';
import { ArticleService } from 'src/app/common/articleService';
import { Article } from 'src/app/model/Article';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  constructor(
    private serviceToken: TokenService,
    private serviceAuth: AuthentificationService,
    private service: ArticleService,
    private route: Router
  ) {}

  public urlfiles: string = environment.apiUrlFile;

  public user = this.serviceToken.getUser().user;

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
      console.log(this.listArticles);
    });
  }

  // fonction pour afficher l'article selectionner par son id

  public sendId(id: number) {
    this.route.navigate(['/article', id]);
  }

  //----------------------------------fonction pour suprimer l'article-------------------

  public deleteArticle(id: number) {
    this.service.deleteArticle(id).subscribe((data) => {
      console.log(data + 'article supprimé');
    });
    location.reload();
  }
}
