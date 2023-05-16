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
    private route: Router
  ) {}

  public messageError?: string;
  public erreur: boolean = false;
  public userForm: any;
  public roles: string[] = [];

  ngOnInit(): void {
    this.initForm();

    if (this.tokenService.getUser().userInfo != null) {
      this.route.navigate(['']);
    }
  }

  public initForm() {
    this.userForm = this.formB.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      passwordUser: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  public onsubmit() {
    let email: string = this.userForm.get('email').value;
    let password: string = this.userForm.get('passwordUser').value;

    // APPEL AU SERVICE POUR FAIRE APPAEL AU BACK POUR VERIFIER L'UTILISATEUR
    this.service.signin(email, password).subscribe(
      (param: any) => {
        this.tokenService.saveUser(param);
        //ENREGISTREMENT DU TOKEN DANS LE STORAGE

        this.tokenService.saveToken(param.accessToken);
        console.log(this.tokenService.getUser().user);

        this.roles = this.tokenService.getUser().roles;
        this.route.navigate(['']);
      },
      (error) => {
        this.erreur = true;
      }
    );
  }

  public navigateInscription() {
    this.route.navigate(['/inscription']);
  }
}
