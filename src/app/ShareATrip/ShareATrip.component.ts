import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleService } from '../common/articleService';
import { CompressImageService } from '../common/compress-image.service';
import { CreationArticle } from '../model/creationArticle';
import { PaysService } from '../common/PaysService';
import { ContinentService } from '../common/ContinentService';
import { DomSanitizer } from '@angular/platform-browser';
import { RegionService } from '../common/RegionService';

@Component({
  selector: 'app-ShareATrip',
  templateUrl: './ShareATrip.component.html',
  styleUrls: ['./ShareATrip.component.css'],
})
export class ArticleUserComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private formB: FormBuilder,
    private route: Router,
    private servicePays: PaysService,
    private continentService: ContinentService,
    private serviceRegion: RegionService,
  ) {}

  public continentSelected: boolean = false; // style pour le selecteur de continent
  public countrySelected: boolean = false; // style pour le selecteur de pays
  public regionSelected: boolean = false; // style pour le selecteur de region

  public selectedFiles: any[] = [];
  public currentFile: any;
  public urls = new Array<String>();
  public artcileForm: any;

  public paysList: any[] = []; // on rentre la liste des pays par l'id des contient
  public regionList: any[] = []; // on rentre la liste des regions par l'id des pays
  public continentsId: number; // id des continents
  public paysId: number; // on rentre l'id du pays selectionner
  public regionId: number; // on rentre l'id de la region selectionner

  public continentsList: any[] = [];

  public idNewarticle: number;

  public input = document.getElementById("file-upload");
  public previewContainer = document.querySelector(".image-preview-container");
  public previewImages = [];

  //------------------ Les Selecteur de pays et de continents --------------------------
  ngOnInit(): void {
    this.getContinent(); // on fait appel a la fonction pour récupérer les continents
   // this.selectedFiles; // on initialise la liste des image au démarage de la page  pour éviter qu'il se remette a zero
    this.initForm(); // on initialise le formulaire
  }

  onChange(event) {
    this.continentsId = event;
    this.getPaysId();
    if (event.value !== '0') {
      this.continentSelected = true;
    } else {
      this.continentSelected = false;
    }
  }

  public onChange2(event) {
    this.paysId = event;
    this.getRegionId();
    if (event.value !== '0') {
      this.countrySelected = true;
    } else {
      this.countrySelected = false;
    }
  }

  public onChange3(event) {
    this.regionId = event;
    console.log(this.regionId);
    if (event.value !== '0') {
      this.regionSelected = true;
    } else {
      this.regionSelected = false;
    }
  }

 public onFileSelected(event: any) {
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

  }

 public removeFile(index: number) {
  this.urls.splice(index, 1);
  this.selectedFiles.splice(index, 1);
  console.log(this.urls);
  console.log(this.selectedFiles);
}

 /* handleFileInput(event) {
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
  } */

  // on récupere la liste des image du formulaire et on les compress avec la fonction compressImage
  // on ajoute la liste des image compressé dans la variable compresse pour pouvoir les envoyer au service
/*  public size() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i].size < 1700000) {
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
            window.open(url);

            this.compresse.push(compressedImage);
            // now you can do upload the compressed image
          });
      }
    }
    console.log(this.compresse);
  } */

  //Fonction pour récupérer les pays
  public getPaysId(): void {
    this.servicePays.getPays(this.continentsId).subscribe((data) => {
      this.paysList = data; // on ajoute la liste des pays dans la variable paysIdContinants

      this.mySortingFunction(); // on fait appel a la fonction pour trier les pays par ordre alphabetique
    });
  }

  //Fonction pour récupérer les regions
  public getRegionId(): void {
    this.serviceRegion.getRegionByPays(this.paysId).subscribe((data) => {
      this.regionList = data; // on ajoute la liste des pays dans la variable paysIdContinants
    });
  }

  //fonction pour récuperer les contient
  public getContinent(): void {
    this.continentService.getContinentList().subscribe((data) => {
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
    const region : number = this.regionId;

    let article: CreationArticle = new CreationArticle(
      titre,
      content,
      pays,
      continent,
      region
    );
    this.serviceArticle
      .fileArticle(article, this.selectedFiles)
      .subscribe((data) => {
        this.currentFile = data;
        console.log(data);
        this.route.navigate(['/article', data]);
      });

    console.log(this.currentFile);
  }
}
