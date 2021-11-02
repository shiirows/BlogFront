import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Article } from '../model/Article';
import { ArticleService } from './../common/articleService';
import { NgModule } from '@angular/core';
import { CreationArticle } from './../model/creationArticle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private formB: FormBuilder
  ) {}

  public artcileForm: any ;
  public idArticle: any;

  
  


  public listArticles : any = [];

  // fonction pour supprimer un article selecionné par l'utilisateur

 public  deleteArticle( id: number) {
    this.serviceArticle.deleteArticle(id).subscribe((data) => {
      console.log(this.idArticle);
      location.reload();
    });

  }


  public afficheArticle(): any {

  return this.serviceArticle.getArticles().subscribe((data) => {
      this.listArticles=(data);
      // afficher les articles du plus récent au plus ancien
      this.listArticles.sort((a, b) => {
        return b.id - a.id;
        
      });

    
     
  
  }
  );
  }
  

  public initForm() {
    this.artcileForm = this.formB.group({
      titre: [
        '',
        [
          Validators.required,
          Validators.maxLength(45),
          Validators.minLength(3),
        ],
      ],
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
