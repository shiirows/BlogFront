import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleService } from './../common/articleService';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaysService } from '../common/PaysService';
import { ContinentService } from '../common/ContinentService';
import { RegionService } from '../common/RegionService';
import { TokenService } from '../common/TokenService';
import { ArticleFavorisService } from '../common/ArticleFavoris';
import { Article } from '../model/Article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private serviceArticle: ArticleService,
    private route: Router,
    private servicePays: PaysService,
    private continentService: ContinentService,
    private serviceRegion: RegionService,
    private tokenService: TokenService,
    private ArticleFavorisService: ArticleFavorisService
  ) {}

  public urlfiles: string = environment.apiUrlFile;
  public userConnecter: any = this.tokenService.getUser().userInfo;
  public listArticles: Article[] = []; // contien tout les articles
  public listArticlesFavoris: Article[] = []; // contien tout les articles en favoris
  public continents: any[]; // contien les article par continent
  public pays: any[] = []; //contien la liste des pays
  public regions: any[] = []; //contien la liste des regions
  public idpays: number; // on stock l'id du pays dans une variable pour la reutiliser
  public idcontinents: number; // on stock l'id du continent dans une variable pour la reutiliser dans la fonction onChange2 au cas
  public idregion: number; // on stock l'id de la region dans une variable pour la reutiliser dans la fonction onChange3 au cas
  // ou l'utilisateur selection tout les pays du continent
  // variable pour afficher le bouton en vert si l'article est en favoris
  public likeArticle: boolean = false;

  public selectedContinent: string;
  public selectedPays: string;
  public selectedRegion: string;

  ngOnInit(): void {
    this.getContinent();
    this.afficheArticle();
    this.getFavoris();
    // this.getChartData();
  }

  // -------------------------------------------------- Appel des continents  --------------------------------------------------
  public getContinent(): any {
    this.continentService.getContinentList().subscribe(
      (data) => {
        this.continents = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // -------------------------------------------------- affichage des pays par le select continents et des article lier au continents--------

  public onChange(event: number) {
    if (event == 0) {
      this.afficheArticle();
    }
    this.idcontinents = event;
    //appel les article par contients
    this.serviceArticle.getArticleByContinent(event).subscribe((data) => {
      this.listArticles = data;
    });

    //appel les pays qui va les placer dans le selecteur pays (onChange2)
    this.servicePays.getPays(event).subscribe(
      (data) => {
        this.pays = data;
        this.mySortingFunction();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // -------------------------------------------------- affichage des articles par id pays--------------------------------------------------

  public onChange2(event: number) {
    if (event == 0) {
      this.onChange(this.idcontinents);
    }

    this.serviceArticle.getArticlePays(event).subscribe((data) => {
      this.listArticles = data;
    });

    this.serviceRegion.getRegionByPays(event).subscribe(
      (data) => {
        this.regions = data;
        this.mySortingFunction();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // -------------------------------------------------- affichage des articles par id region--------------------------------------------------

  public onChange3(event: number) {
    if (event == 0) {
      this.onChange2(this.idpays);
    }

    this.serviceArticle.getArticleRegion(event).subscribe((data) => {
      this.listArticles = data;
    });
  }

  //FONCTION QUI PERMET D'ENVOYER L'ID DANS LA ROUTE ARTICLE

  public sendId(id: number) {
    this.route.navigate(['/article', id]);
  }

  // -------------------------------------------------- affichage de tout les articles --------------------------------------------------
  //ajout en favoris
  public addFavori(id: number) {
    const article = this.listArticles.find((a) => a.id === id); // recherche de l'article correspondant à l'ID
    if (!article) return; // vérification si l'article existe

    if (!article.favoris) {
      console.log(article.id + ' ' + id + 'add');
      this.ArticleFavorisService.addFavoris(id).subscribe((data) => {
        console.log(data);
        article.favoris = true; // mise à jour de la propriété favoris de l'article
      });
    } else {
      console.log(article.id + ' ' + id + 'delete');
      this.ArticleFavorisService.deleteFavoris(id).subscribe((data) => {
        console.log(data);
        article.favoris = false; // mise à jour de la propriété favoris de l'article
      });
    }
  }

  public afficheArticle(): any {
    return this.serviceArticle
      .getArticles()
      .subscribe((articles: Article[]) => {
        for (let i = 0; i < articles.length; i++) {
          articles[i].favoris = false;
        }
        this.listArticles = articles;
        console.log(this.listArticles);

        this.sortByDate();
        // afficher les articles du plus récent au plus ancien
      });
  }

  // --------------------------------------------------articles favoris --------------------------------------------------
  public getFavoris() {
    const token = this.tokenService.getUser().userInfo;

    if (token) {
      this.ArticleFavorisService.getArticleFavoris().subscribe(
        (articles: Article[]) => {
          this.listArticlesFavoris = articles;
          if (this.listArticlesFavoris.length > 0) {
            this.favorisList();
            console.log(this.listArticlesFavoris);
          }
        }
      );
    }
  }

  public favorisList() {
    for (let i = 0; i < this.listArticles.length; i++) {
      this.likeArticle = false; // initialisation de likeArticle à false
      for (let j = 0; j < this.listArticlesFavoris.length; j++) {
        if (this.listArticles[i].id === this.listArticlesFavoris[j].id) {
          this.likeArticle = true;
          break; // sortie de la boucle dès qu'un article favori est trouvé
        }
      }
      this.listArticles[i].favoris = this.likeArticle; // ajout d'une propriété isFavorite à l'article pour afficher la classe CSS
    }
    console.log(this.listArticles);
  }

  //fonction pour trier les articles par ordre de creation
  public sortByDate() {
    this.listArticles.sort((a, b) => {
      return b.id - a.id;
    });
    this.favorisList();
  }

  // fonction pour trier les pays par ordre alphabetique
  public mySortingFunction() {
    this.pays.sort(function (a, b) {
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

  // recuperer les donnés du component chart.component.ts
  public onContinentSelected(continent: string) {
    this.selectedContinent = continent;
  }

  public onPaysSelected(pays: string) {
    this.selectedPays = pays;
    console.log(pays);
    this.serviceArticle.getArticlePaysName(pays).subscribe((data) => {
      this.listArticles = data;

      this.sortByDate();
    });

  }

  public onRegionSelected(region: string) {
    this.selectedRegion = region;
    this.serviceArticle.getArticleRegionName(region).subscribe((data) => {
      this.listArticles = data;
      // Faire quelque chose d'autre ici si nécessaire
    });
  }
}
