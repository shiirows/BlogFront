import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Article } from '../model/Article';
import { ArticleService } from './../common/articleService';
import { NgModule } from '@angular/core';
import { CreationArticle } from './../model/creationArticle';
import { UserService } from '../common/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private formB: FormBuilder,
    private formBModal: FormBuilder,
   
  ) {}

  public articleModal: any = false;
  public articleModalForm: any;
  public artcileForm: any;
  public idArticle: any;
  public articleUp: any = [];
  public listArticles: any = [] ;


// -------------------------------------------------- Supression d'un l'articles --------------------------------------------------

  public deleteArticle(id: number) {
    this.serviceArticle.deleteArticle(id).subscribe((data) => {
      console.log(this.idArticle);
      location.reload();

    });
  }
// -------------------------------------------------- affichage des articles --------------------------------------------------
  public afficheArticle(): any {
    return this.serviceArticle.getArticles().subscribe((data) => {
      this.listArticles = data;
console.log(this.listArticles);
      // afficher les articles du plus récent au plus ancien
      this.listArticles.sort((a, b) => {
        return b.id - a.id;
        
      });
    });
  }

 // -------------------------------------------------- modification d'un article --------------------------------------------------

 
 public openModal(article) {
    this.articleModal = true;
    this.articleUp.push(article)
    console.log(this.articleUp);
  }

 public closeModal() {
    this.articleModal = false;
    this.articleUp = [];
    console.log(this.articleUp);
  }

  
  public initFormModal() {
    this.articleModalForm = this.formBModal.group({
      titres: ['', [ Validators.required, Validators.maxLength(45), Validators.minLength(3), ], ],
      contents: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  //fonction pour modifier un article avec la feneetre modal
  public onsubmitModal(id: number) {
    const titres: string = this.articleModalForm.get('titres').value;

    const contents: string = this.articleModalForm.get('contents').value;

    let articles: CreationArticle = new CreationArticle(titres, contents);

    console.log(articles);

    this.serviceArticle.updateArticle(id, articles).subscribe((data) => {
      console.log(data);
    });

   
  }



  // -------------------------------------------------- creation de l'article --------------------------------------------------

  public initForm() {
    this.artcileForm = this.formB.group({
      titre: ['', [ Validators.required, Validators.maxLength(45), Validators.minLength(3), ], ],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.afficheArticle();
  }

  onsubmit() {
    const titre: string = this.artcileForm.get('titre').value;

    const content: string = this.artcileForm.get('content').value;

    let article: CreationArticle = new CreationArticle(titre, content);

    console.log(article);

    this.serviceArticle.createArticle(article).subscribe((data) => {
      console.log(data);
    });

    this.artcileForm.reset();
    location.reload();
  }
}
