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

  ngOnInit(): void {
    
    if(this.tokenService.getUser().user == null){
      this.route.navigate([''])
    }else{
    this.user = this.tokenService.getUser().user;
    
    }
    this.intiForm();
  }

  ngAfterViewInit() {
  }
  public form: any;
  public intiForm() {
    this.form = this.formB.group({
      number_phone: ['0662301864', [Validators.required]],
      country: ['bulgarie', [Validators.required]],
      city:['je sais pas',  [Validators.required]],
      description: ['je sais encore moin', [Validators.required]],
      
      
    })
  }
  public onSubmit() {

    let country: string = this.form.get('country').value;
    let city: string = this.form.get('city').value;
    let description: string = this.form.get('description').value;
    let number_phone: number = this.form.get('number_phone').value;
  
    
    let userUpdate : User = new User(  country, number_phone,city,description, this.user.id);

    this.service.update(this.res.user.id, userUpdate )
   
      .subscribe((param: Utilisateur) => {
       
        this.user = param;
        
        if (this.user != null) {
          try {
            localStorage.setItem('user', JSON.stringify(this.user));
            window.location.reload();
          } catch (e) {
            "l'ajoute au localStorage n'as pas fonctionner"
          }
        }
      })
  }

}
