import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoService } from '../../common/UserInfoService';
import { Utilisateur } from '../../model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';
import { User } from '../../model/UpdateUser';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css'],
})
export class GestionProfilComponent implements OnInit {
  constructor(
    private service: UserInfoService,
    private formB: FormBuilder,
    private tokenService: TokenService,
    private route: Router
  ) {}

  public urlfiles: string = environment.apiUrlFile;
  public user: any = [];

  public avatarUser: String;
  public couverture: String;
  public form: FormGroup;
  public response: any;
 

 public fileToUpload: File

  ngOnInit(): void {
    this.onnected();
    this.getImage();
    this.intiForm();
    this. getCouverture();

  }

  //FONCTION POUR VOIR SI L'UTILISATEUR EST CONNECTE OU NON

  public onnected() {
    if (this.tokenService.getUser().userInfo == null) {
      this.route.navigate(['']);
    } else {
      this.user = this.tokenService.getUser().userInfo;
    }
  }

  //envoie l'image de profil a la BDD
 onFileProfileSelected(event : any) {
   
    const file: File = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      console.log('File is not an image', file.type, file);
      return;
    }

    const maxSize = 1024 * 1024; // 1 Mo
    if (file.size > maxSize) {
      console.log('Le fichier sélectionné est trop volumineux');
      return;
    }

    this.fileToUpload = file;

  }

  public submitProfile() {
    if (!this.fileToUpload) {
      console.log('Please select an image');
      return;
    }
    this.service.updateAvatarUser(this.fileToUpload).subscribe(
      (data) => {},
      (response) => {
        this.response = response.error.text;
        sessionStorage.setItem('url', this.response);
        window.location.reload();
      }
    );
  } 

  //envoie l'image de couverture a la BDD
  onFileCoverSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      console.log('File is not an image', file.type, file);
      return;
    }

    const maxSize = 1024 * 1024; // 1 Mo
    if (file.size > maxSize) {
      console.log('Le fichier sélectionné est trop volumineux');
      return;
    }

    this.fileToUpload = file;
  }

  public submitCover() {
    console.log("test");
    this.service.updateCouvertureUser(this.fileToUpload).subscribe(
      (data) => {},
      (response) => {
        this.response = response.error.text;
        sessionStorage.setItem('urlCouverture',  this.response);
        window.location.reload();
     
      }
    );
  }

  // AFFICHE L'IMAGE AVATAR

  public getImage() {
    this.avatarUser = sessionStorage.getItem('url');
  }

  // AFFICHE L'IMAGE DE COUVERTURE
  public getCouverture() {
    this.couverture = sessionStorage.getItem('urlCouverture');
  }



  public intiForm() {
    this.form = this.formB.group({
      description: ['', [Validators.required]]
    });
  }
  public onsubmit() {
    let description: string = this.form.get('description').value;
  console.log(description);
    this.service.update(description).subscribe((data) => {
     
      console.log(data);
    });
  }
}