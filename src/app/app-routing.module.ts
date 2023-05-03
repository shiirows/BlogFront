import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleUserComponent } from './ShareATrip/ShareATrip.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GestionProfilComponent } from './profil/gestion-profil/gestion-profil.component';
import { ContacteComponent } from './contacte/contacte.component';
import { ActivationComponent } from './activation/activation.component';
import { ArticleComponent } from './article/article.component';
import { NavComponent } from './profil/nav/nav.component';
import { AuthGuard } from './core/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';
import { ItemCardComponent } from './profil/item-card/item-card.component';
import { ProfilComponent } from './profil/profil/profil.component';



export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent }, 
  { path: 'contact', component: ContacteComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'ShareATrip', component: ArticleUserComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent , canActivate: [AuthGuard], children: [
      { path: '', outlet: 'profil', component: ItemCardComponent, canActivate: [AuthGuard] },
      { path: 'profilSetting', outlet: 'profil', component: GestionProfilComponent},
    ]},
  { path: 'activation', component: ActivationComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
