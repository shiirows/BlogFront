import { Component,  OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../common/articleService';
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

  public urlfiles: string = environment.apiUrlFile

  public articleId: number;
  public afficheArticle: Article;



  
  public avatar: any;
  public commentaire : any
  public commentForm: FormGroup;
  public estConnecter: boolean = false;
 



  ngOnInit() {
 
    // recupere l'id de l'article de la route
    this.getArticle();// recupere l'article
    this.getConnecter();
    this.getCommentaireById()  //  recupere les commentaires de l'article
   
    this.initForm()
  
    
  }

  public getConnecter() {
    if (this.serviceToken.getUser().user != null) {
      this.estConnecter = true;
      
    } 
  }

 
  // -------------------------------------------------- appel de l'articles par l'id --------------------------------------------------

  public getArticle() {

    this.route.params.subscribe((params: ParamMap) => {
      this.articleId = params['id'];
    });

    this.serviceArticle.getArticleById(this.articleId).subscribe(
      (article: Article) => {
        
        this.afficheArticle = article;
        console.log(this.afficheArticle);
        
        
      },
      (error) => {
        console.log(error);
        error;
        this.routes.navigate(['/']);
      }
    );
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
      
  
      window.location.reload();
    },
    (error) => {
    
    }
  );

}

//-------------------------------------------------- afficher les commentaire --------------------------------------------------

public getCommentaireById() {
  this.serviceComment.getComments(this.articleId).subscribe(
    (commentaire: commentaire) => {
      this.commentaire =(commentaire);
      console.log(this.commentaire);
    
    },
    (error) => {
      error;
    }
  );

  

}

}
