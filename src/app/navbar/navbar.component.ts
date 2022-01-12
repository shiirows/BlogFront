import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';
import { AuthentificationService } from '../common/AuthentificationService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router,private serviceToken : TokenService,private service: AuthentificationService,) { }
  public estConnecter :any [] = [];
  public isAdmin :boolean = false;
  public avatarUser :any;
  public user : any
  

  

  

//VERIFICATION DE L'EXISTANCE D'UN UTILISATEUR CONNECTER POUR LUI AFFICHER LA BONNE BARRE DE NAVIGATION
    public userAfiche() {
    if(this.serviceToken.getUser().user == null){
      this.estConnecter = null;    
    }else{
      this.estConnecter = [this.serviceToken.getUser().user];
     
     
    }
    //VERIFICATION DU ROLE DE L'UTILISATEUR EN COUR POUR LUI AFFICHER OU PAS LE BOUTON ADMIN
    if(this.serviceToken.getUser().roles == "ROLE_ADMIN"){
      this.isAdmin = true
    }
  }

  
  ngOnInit(): void {
    this.userAfiche();
  this.afficheImage()
  if (this.serviceToken.getUser().user == null) {
    this.route.navigate(['/home'])
  }
  

  }


  // FONCTION POUR AFFICHER L'IMAGE DE L'UTILISATEUR CONNECTER
  public afficheImage() {
    if(this.serviceToken.getUser().user == null){
      return null;
    }else{

      this.user = this.serviceToken.getUser().user;
      this.service.getAvatar(this.user.avatar).subscribe(
        (data ) => {
        
         this.avatarUser = [data];  
   
         sessionStorage.setItem('url',(this.avatarUser[0].url));
        },
        (error) => {
  
          
        }
      );  
    }
  }
 



 

  // FONCTION POUR EFFACE LE  STORAGE ET SE DECONNECTER 
  public effacerStorage() {
    window.sessionStorage.clear()
    window.location.reload();
    this.route.navigate(['/home']);

  }
}
