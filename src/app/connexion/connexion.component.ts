import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../common/AuthentificationService';
import { TokenService } from '../common/TokenService';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private service: AuthentificationService,
    private tokenService: TokenService,
    private route: Router,
  ) {}

ngOnInit(): void {
    this.initForm();
    console.log(this.tokenService.getUser().user)
    if (this.tokenService.getUser().user != null) {
      this.route.navigate(['/home'])
    }

  }


  public initForm() {
    this.userForm = this.formB.group({
      userName: ['alexandre',[Validators.required, Validators.minLength(3)]],
      passwordUser: ['123456789', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    });
  }

  

  public messageError?: string;
  public erreur: boolean = false;
  public userForm: any;
  public roles: string[] = [];

  public onsubmit() {
    let username: string = this.userForm.get('userName').value;
    let password: string = this.userForm.get('passwordUser').value;
console.log("coucou")
   // APPEL AU SERVICE POUR FAIRE APPAEL AU BACK POUR VERIFIER L'UTILISATEUR
    this.service.signin(username, password).subscribe((param: any) => {
      console.log(param)
      this.tokenService.saveUser(param)
      //ENREGISTREMENT DU TOKEN DANS LE STORAGE

      this.tokenService.saveToken(param.accessToken);

      this.roles = this.tokenService.getUser().roles;

      window.location.reload();
    }, (err) => {
      console.log(err)
      this.erreur = true;
      this.messageError = err.message
    })

}

}

