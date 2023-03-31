import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';
import { TokenService } from '../common/TokenService';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css'],
})
export class ProfilsComponent implements OnInit {
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

  public listArticles: any = [];

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
