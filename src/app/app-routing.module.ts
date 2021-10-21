import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleUserComponent } from './article-user/article-user.component';
import { ArticleService } from './common/articleService';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GestionProfilComponent } from './gestion-profil/gestion-profil.component';

export const ROUTES: Routes = [
  { path: 'profil', component: GestionProfilComponent },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'article', component: ArticleUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
