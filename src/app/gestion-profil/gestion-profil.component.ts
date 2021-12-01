import { FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../common/AuthentificationService';
import { Utilisateur } from './../model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';
import {User} from '../model/UpdateUser';

import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Byte } from '@angular/compiler/src/util';






@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css']
})
export class GestionProfilComponent implements OnInit {

  constructor(private service: AuthentificationService, private formB: FormBuilder,private tokenService: TokenService,private route:Router) { }
  public res: any [] = [ this.tokenService.getUser().user] ;
  public user!: Utilisateur ;

public avatarUser : String [] = [] ; 

  public form: any;

  public  forms: any;

  fileToUpload: File | null = null;



  //FONCTION POUR VOIR SI L'UTILISATEUR EST CONNECTE OU NON

public onnected() {
if(this.tokenService.getUser().user == null){
      this.route.navigate([''])
    }else{
    this.user = this.tokenService.getUser().user;
    

    }
  }
 


  //envoie l'image a la BDD
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    this.service.updateUser( this.fileToUpload).subscribe(
      (data) => {
        
        this.user = data;

        this.route.navigate(['/profil']);
      },
      (error) => {
        
      }
    );

}

// RECUPERE L'IMAGE DE LA BDD 
  

public getImage() {
  this.service.getAvatar(this.user.avatar).subscribe(
    (data) => {

    
      this.avatarUser = [data] ;
     

    },
    (error) => {

    }
  );  
}

// FONCTION POUR AFFICHER L'AVATAR EN BASE 64







  ngOnInit(): void {

    this.onnected();
    this.getImage( )
    this.intiForm();
    
    console.log(this.user, "res");
  }


  public intiForm() {
    this.form = this.formB.group({
      numberPhone: [this.user.numberPhone],
      country: [this.user.country, [Validators.required]],
      city:[this.user.city,  [Validators.required]],
      description: [this.user.description, [Validators.required]],
      name: [this.user.name  , [Validators.required]],
      firstname: [this.user.firstname , [Validators.required]],
      
      
    })
  }
  public onSubmit() {

    let country: string = this.form.get('country').value;
    let city: string = this.form.get('city').value;
    let description: string = this.form.get('description').value;
    let numberPhone: number = this.form.get('numberPhone').value;
    let name: string = this.form.get('name').value;
    let firstname: string = this.form.get('firstname').value;
  
    
    let userUpdate : User = new User( firstname,  city ,country,   description ,name, numberPhone);

    this.service.update( userUpdate).subscribe(

      (data) => {

        this.user = data;
        this.route.navigate(['/profil']);
      }

        
    );
    }

}

