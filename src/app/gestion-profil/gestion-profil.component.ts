import { FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../common/AuthentificationService';
import { Utilisateur } from './../model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';
import {User} from '../model/UpdateUser';



@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css']
})
export class GestionProfilComponent implements OnInit {

  constructor(private service: AuthentificationService, private formB: FormBuilder,private tokenService: TokenService,private route:Router) { }
  public res: any = this.tokenService.getUser();
  public user!: Utilisateur;

  public avatar: any [] = []; 

  public form: any;

  public  forms: any;

  fileToUpload: File | null = null;



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
        console.log(error);
      }
    );

}

// RECUPERE L'IMAGE DE LA BDD
public getImages() {
  this.service.getAvatar().subscribe(
    (data) => {
      console.log(data);
      this.avatar.push(data);
    },
    (error) => {
      console.log(error);


    }
  );
}


public onClick() {
 
}


  ngOnInit(): void {
    this.getImages()
    console.log(this.avatar  );
    
    if(this.tokenService.getUser().user == null){
      this.route.navigate([''])
    }else{
    this.user = this.tokenService.getUser().user;
    
    }
    this.intiForm();
  }



  ngAfterViewInit() {
  }
  
  public intiForm() {
    this.form = this.formB.group({
      number_phone: [this.user.number_phone],
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
    let number_phone: number = this.form.get('number_phone').value;
    let name: string = this.form.get('name').value;
    let firstname: string = this.form.get('firstname').value;
  
    
    let userUpdate : User = new User( firstname,  city ,country,   description ,name, number_phone);

    this.service.update( userUpdate).subscribe(

      (data) => {
console.log("ok");
        this.user = data;
        this.route.navigate(['/profil']);
      }

        
    );
    }

}

