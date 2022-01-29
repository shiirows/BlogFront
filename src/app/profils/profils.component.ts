import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';
import { TokenService } from '../common/TokenService';


@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit {

  constructor(
    private serviceToken : TokenService,
    private serviceAuth: AuthentificationService,
    private service: ArticleService,
    private route : Router,
     ) { }

  public urlfiles: string = 'http://localhost:8080/api/file/filename/'
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


//------------------------------------ fonction pour afficher l'avatar et la couverture de l'utilisateur --------------------------------------------------

public afficheImage() {
  this.avatarUser = sessionStorage.getItem('url');
}


public afficheCouverture() {
  this.serviceAuth.getAvatar(this.userCouverture.couverture).subscribe(
    (data ) => {
     this.couvertureUser = [data];  
    
     
    },
  )
}

//----------------------------------fonction pour appeler tout les l'articles du l'utiliateur

public articleUser() {
  this.service.getArticleByIdUser().subscribe(
    (data) => {
      this.listArticles = data;
      this.listArticles.forEach(element => {
        element.file = this.urlfiles + element.files[0];
      });
      console.log(this.listArticles)
    }
  )

}


// fonction pour afficher l'article selectionner par son id

public sendId(id : number) {

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
