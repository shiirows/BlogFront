import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';
import { TokenService } from '../common/TokenService';


@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit {

  constructor(private serviceToken : TokenService, private serviceAuth: AuthentificationService, private service: ArticleService ) { }


  public userCouverture  = this.serviceToken.getUser().user  ;
  public user = [this.serviceToken.getUser().user]  ;

public avatarUser: any  ;
public couvertureUser : any;

public listArticles: any = [];


ngOnInit(): void {

  this.afficheCouverture()
  this.afficheImage()
  this.articleUser()
  console.log(this.user)
  
}

public afficheImage() {
  this.avatarUser = sessionStorage.getItem('url');
}

public afficheCouverture() {
  this.serviceAuth.getAvatar(this.userCouverture.couverture).subscribe(
    (data ) => {
     this.couvertureUser = [data];  
     console.log(this.couvertureUser)
     
    },
  )
}

public articleUser() {
  this.service.getArticleByIdUser().subscribe(
    (data) => {
      this.listArticles = data;
      console.log(this.listArticles)
    }
  )

}


public deleteArticle(id: number) {
  this.service.deleteArticle(id).subscribe((data) => {
    console.log(data + 'article supprimé');

  });
  location.reload();
}

}