import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router,private serviceToken : TokenService) { }
  public estConnecter :any;
  public isAdmin :boolean = false;
  



  ngOnInit(): void {



   
    //VERIFICATION DE L'EXISTANCE D'UN UTILISATEUR CONNECTER POUR LUI AFFICHER LA BONNE BARRE DE NAVIGATION
    if(this.serviceToken.getUser().user == null){
      this.estConnecter = null;    
    }else{
      this.estConnecter = this.serviceToken.getUser();
    }
    //VERIFICATION DU ROLE DE L'UTILISATEUR EN COUR POUR LUI AFFICHER OU PAS LE BOUTON ADMIN
    if(this.serviceToken.getUser().roles == "ROLE_ADMIN"){
      this.isAdmin = true
    }


  }


  // FONCTION POUR AFFICHER LE PSEUDO DE L'UTILISATEUR CONNECTER
 



 

  // FONCTION POUR EFFACE LE  STORAGE ET SE DECONNECTER 
  public effacerStorage() {
    window.sessionStorage.clear()
    window.location.reload();
    this.route.navigate([''])

  }
}
