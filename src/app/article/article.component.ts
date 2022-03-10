import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleService } from '../common/articleService';
import { AuthentificationService } from '../common/AuthentificationService';
import { CommentService } from '../common/CommentService';
import { TokenService } from '../common/TokenService';
import { Article } from '../model/Article';
import { commentaire } from '../model/Comment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],

})
export class ArticleComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private serviceComment: CommentService,
    private route: ActivatedRoute,
    private routes: Router,
 
    private serviceToken: TokenService,
  ) {}

  public urlfiles: string = 'http://localhost:8080/api/file/filename/';

  public articleId: number;
  public afficheArticle: any;

  public imagearticle: any[] = []; // url de l'image

  public nomberImage: Number;
  public avatar: any;
  public commentaire : any
  public commentForm: FormGroup;
  public estConnecter: boolean = false;
 



  ngOnInit() {
    
    this.getIdArticle() // recupere l'id de l'article de la route
    this.getConnecter();
    this.getCommentaireById()  //  recupere les commentaires de l'article
    this.getArticles();// recupere l'article
    this.initForm()
   
    console.log(this.imagearticle);
    
  }

  public getConnecter() {
    if (this.serviceToken.getUser().user == null) {
      this.estConnecter
    } else {
      this.estConnecter = true;
    }
  }

  public getIdArticle() {
    this.route.params.subscribe((params: ParamMap) => {
      this.articleId = params['id'];
    });
  }

  // -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

  public getArticles() {
    this.serviceArticle.getArticleById(this.articleId).subscribe(
      (param: Article) => {
        this.afficheArticle = [param];
        console.log(this.afficheArticle);
        this.getAvatar();
        this.getImage();
      },
      (error) => {
        console.log(error);
        error;
        this.routes.navigate(['/']);
      }
    );
  }

  // -------------------------------------------------- appel de l'avatar de l'utilisateurs  --------------------------------------------------
  public getAvatar() {
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

  //------------------------------------------------------ appel des commentaire ------------------------------------------------------

  public getCommentaire() {
  }

  //------------------------------------------------------ ajout des commentaire ------------------------------------------------------

  public initForm() {
    this.commentForm = new FormGroup({
      commentaire: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

public onValid() {

  const commentaire: string = this.commentForm.get('commentaire').value;
  this.serviceComment.createComment(this.articleId, commentaire).subscribe(
    (data) => {
      
      this.getCommentaire();
      window.location.reload();
    },
    (error) => {
    
    }
  );

}

//-------------------------------------------------- afficher les commentaire --------------------------------------------------

public getCommentaireById() {
  this.serviceComment.getComments(this.articleId).subscribe(
    (param: commentaire) => {
      this.commentaire =(param);
      console.log(this.commentaire);
      this.commentaire.forEach((element) => {
        element.avatar = this.urlfiles + element.avatar;
      }
      );

     
    },
    (error) => {
      error;
    }
  );

  

}

}
