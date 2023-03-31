import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../common/AuthentificationService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private route: Router,
    private serviceToken: TokenService,
    private service: AuthentificationService
  ) {}

  public urlfiles: string = environment.apiUrlFile;
  public estConnecter: any[] = [];
  public isAdmin: boolean = false;
  public avatarUser: any;
  public user: any;

  //VERIFICATION DE L'EXISTANCE D'UN UTILISATEUR CONNECTER POUR LUI AFFICHER LA BONNE BARRE DE NAVIGATION
  public userAfiche() {
    if (this.serviceToken.getUser().userInfo == null) {
      this.estConnecter = null;
    } else {
      this.estConnecter = [this.serviceToken.getUser().userInfo];
    }
    //VERIFICATION DU ROLE DE L'UTILISATEUR EN COUR POUR LUI AFFICHER OU PAS LE BOUTON ADMIN
    if (
      this.serviceToken.getUser().roles != 'ROLE_USER' &&
      this.serviceToken.getUser().userInfo != null
    ) {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.userAfiche();
    this.afficheImage();
    
  }

  // FONCTION POUR AFFICHER L'IMAGE DE L'UTILISATEUR CONNECTER
  public afficheImage() {
    if (this.serviceToken.getUser().userInfo == null) {
      return null;
    } else {
      this.user = this.serviceToken.getUser().userInfo;
    }

    if (sessionStorage.getItem('url') == null ) {
      sessionStorage.setItem('url', this.serviceToken.getUser().userInfo.avatar);
 sessionStorage.setItem('urlCouverture', this.serviceToken.getUser().userInfo.couverture);
     
    }
    
    this.avatarUser = sessionStorage.getItem('url');
  }
  // FONCTION POUR EFFACE LE  STORAGE ET SE DECONNECTER
  public effacerStorage() {
    this.service.deconnexion().subscribe(
      (data) => {    
      }
    );
    this.avatarUser = [];
    window.sessionStorage.clear();
    this.estConnecter = null;
    this.route.navigate(['']);
    this.isAdmin = false;
  }

  
}
