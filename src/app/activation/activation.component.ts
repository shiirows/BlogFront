import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../common/AuthentificationService';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private routeNav: Router
  ) {}

  public idActivation: string = '';
  ngOnInit(): void {
    // CE QU IL NOUS PERMET DE RECUPERER LES DONNEES TRANSMISE DU BACK END VIA L'URL
    this.route.queryParams.subscribe((param) => {
      this.idActivation = param['idActivation'];
      this.authService.activation(this.idActivation).subscribe((param) => {
        this.routeNav.navigate(['/connexion']);
      });
    });
  }

  // FONCTION QUI PERMET A L'APPUYE SUR LE BOUTON DE ACTIVER LE COMPTE DE L'UTILISATEUR

}
