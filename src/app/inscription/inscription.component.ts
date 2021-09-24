import { UtilisateurInscription } from './../model/UtilisateurInscription';
import { AuthentificationService } from '../common/AuthentificationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
   
    
  public userForm: any;
  public error?: string;
  public erreur: boolean = false;

  public initForm() {
    this.userForm = this.formB.group({
      
      username: ['', [ Validators.maxLength(45), Validators.minLength(3)]],
      email: ['', [ Validators.email]],
      password: ['', [ Validators.minLength(8),Validators.maxLength(45)]],
      password2: ['', [Validators.minLength(8),Validators.maxLength(45)]], 
    },{
      validator: this.verificationMatch(
        'password',
        'password2'
      )
    });

  }

  ngOnInit(): void {
    this.initForm();
   
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
      } else {
          matchingControl.setErrors(null);
      }
  }
}

  public onsubmit() { 
    
    const username: string = this.userForm.get('username').value;

    const email: string = this.userForm.get('email').value;

    const password: string = this.userForm.get('password').value;

    let userr:UtilisateurInscription  = new UtilisateurInscription(username,password,email)
    console.log(userr)
    this.service.signup(userr).subscribe(
      (data) => {
        console.log(data);
        this.route.navigate(['/connexion']);
      },
      (error) => {
        console.log(error);
        this.error = error.error;
        this.erreur = true;
      }
    );
  

   

  }
}



