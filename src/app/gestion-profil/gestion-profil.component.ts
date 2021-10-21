import { FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../common/AuthentificationService';
import { Utilisateur } from './../model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../common/TokenService';
import { Router } from '@angular/router';
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
    console.log(this.tokenService.getUser().user)
    console.log(this.user)
    }
    this.intiForm();
  }

  ngAfterViewInit() {
  }
  public form: any;
  public intiForm() {
    this.form = this.formB.group({
     
      
     
      userNumber_phone: ["0"+this.user.number_phone, [Validators.required]],
      userCountry: [this.user.country, [Validators.required]],
      userCity: [this.user.city, [Validators.required]],
      userDescription: [this.user.description, [Validators.required]],
      
      
    })
  }
  public onSubmit() {

    let country: string = this.form.get('userCountry').value;
    let city: string = this.form.get('userCity').value;
    let description: string = this.form.get('userDescription').value;
    let number_phone: number = this.form.get('userNumber_phone').value;

    this.service.update(this.user.id, country, city, description, number_phone)
      .subscribe((param: Utilisateur) => {
        this.user = param;
        console.log(param)
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
