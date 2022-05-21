import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ArticleService } from '../common/articleService';
import { CompressImageService } from '../common/compress-image.service';
import { TokenService } from '../common/TokenService';
import { CreationArticle } from '../model/creationArticle';
import { Utilisateur } from '../model/Utilisateur';

@Component({
  selector: 'app-article-user',
  templateUrl: './article-user.component.html',
  styleUrls: ['./article-user.component.css'],
})
export class ArticleUserComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private formB: FormBuilder,
    private route: Router,
    private tokenService: TokenService,
    private compressImage: CompressImageService
  ) {}

  public selectedFiles: FileList;
  public compresse: File[] = [];
  public currentFile: any;
  public urls = new Array<String>();
  public artcileForm: any;

  public paysList: any[] = []; // on rentre la liste des pays par l'id des contient
  public continentsId: number; // id des continents
  public paysId: number; // on rentre l'id du pays selectionner

  public continentsList: any[] = [];

  public idNewarticle: number;

  //------------------ Les Selecteur de pays et de continents --------------------------
  ngOnInit(): void {
    this.getContinent(); // on fait appel a la fonction pour récupérer les continents
    this.selectedFiles; // on initialise la liste des image au démarage de la page  pour éviter qu'il se remette a zero
    this.initForm(); // on initialise le formulaire
  }

  onChange(event) {
    this.continentsId = event;
    this.getPaysId();
  }

  public onChange2(event: number) {
    this.paysId = event;
  }

  //fonction pour récuperer les image du formulaire

  handleFileInput(event) {
    this.urls = [];
    this.selectedFiles = event.target.files;
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
    this.size();
  }

  // on récupere la liste des image du formulaire et on les compress avec la fonction compressImage
  // on ajoute la liste des image compressé dans la variable compresse pour pouvoir les envoyer au service
  public size() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i].size < 500000) {
        // si l'image est inférieur à 500ko on l'injecte directement dans la variable compresse
        this.compresse.push(this.selectedFiles[i]);
      } else {
        //  console.log(`Image size before compressed: ${this.selectedFiles[i].size} bytes.`);
        this.compressImage
          .compress(this.selectedFiles[i])
          .pipe(take(1))
          .subscribe((compressedImage) => {
            // console.log(`Image size after compressed: ${compressedImage.size} bytes.` );

            // fonction pour affiché les image compressé dans une nouvelle page web
            /*  var blob = new Blob([compressedImage], { type: 'image/jpeg' });
            var url = window.URL.createObjectURL(blob);
            window.open(url);*/

            this.compresse.push(compressedImage);
            // now you can do upload the compressed image
          });
      }
    }
    console.log(this.compresse);
  }

  //Fonction pour récupérer les pays
  public getPaysId(): void {
    this.serviceArticle.getPays(this.continentsId).subscribe((data) => {
      this.paysList = data; // on ajoute la liste des pays dans la variable paysIdContinants

      this.mySortingFunction(); // on fait appel a la fonction pour trier les pays par ordre alphabetique
    });
  }

  //fonction pour récuperer les contient
  public getContinent(): void {
    this.serviceArticle.getContinentList().subscribe((data) => {
      this.continentsList = data; // on ajoute la liste des pays dans la variable paysIdContinants
    });
  }

  // fonction pour trier les pays par ordre alphabetique
  public mySortingFunction() {
    this.paysList.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  // ------------------------------------------ Formulaire pour l'article --------------------------------------------------

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

  public onValid() {
    const titre: string = this.artcileForm.get('titre').value;

    const content: string = this.artcileForm.get('content').value;
    const pays: number = this.paysId;
    const continent: number = this.continentsId;

    let article: CreationArticle = new CreationArticle(
      titre,
      content,
      pays,
      continent
    );
    this.serviceArticle
      .fileArticle(article, this.compresse)
      .subscribe((data) => {
        this.currentFile = data;
        console.log(data);
        this.route.navigate(['/article', data]);
      });

    console.log(this.currentFile);
  }
}
