import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { AuthentificationService } from '../common/AuthentificationService';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private service: AuthentificationService,
    private route: Router
  ) {}

  public userForm: FormGroup;
  public error: string;
  public erreur: boolean = false;
  public passwordconfirm : boolean = false;


  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.userForm = this.formB.group(
      {
        username: [
          '',
          [Validators.maxLength(45), Validators.minLength(3)],
        ],
        lastname: ['', [Validators.maxLength(45), Validators.minLength(2)]],
        firstname: [
          '',
          [Validators.maxLength(45), Validators.minLength(2)],
        ],
        email: ['', [Validators.email]],
        password: [
          '',
          [Validators.minLength(8), Validators.maxLength(45)],
        ],
        passwordconfirm: [
          '',
          [Validators.minLength(8), Validators.maxLength(45)],
        ],
      },
      {
        validator: this.verificationMatch('password', 'passwordconfirm'),
      }
    );
  }

  // custom validator to check that two fields match
  public verificationMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.passwordconfirm = true;
      } else {
        matchingControl.setErrors(null);
        this.passwordconfirm = false;
      }
    };
  }

  public onsubmit() {
    const username: string = this.userForm.get('username').value;

    const lastname: string = this.userForm.get('lastname').value;

    const firstname: string = this.userForm.get('firstname').value;

    const email: string = this.userForm.get('email').value;

    const password: string = this.userForm.get('password').value;

    let user: UtilisateurInscription = new UtilisateurInscription(
      lastname,
      firstname,
      username,
      password,
      email
    );

    this.service.signup(user).subscribe(
      // ne pas rediriger en cas d'erreur
      (data) => {
        this.route.navigate(['/connexion']);
      },
      (error) => {
        this.error = error.error.message;
        this.erreur = true;
      }
    );
  }

  public navigateConnexion() {
    this.route.navigate(['/connexion']);
  }
}
