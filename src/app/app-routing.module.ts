import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleUserComponent } from './article-user/article-user.component';
import { ArticleService } from './common/articleService';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GestionProfilComponent } from './gestion-profil/gestion-profil.component';
import { ContacteComponent } from './contacte/contacte.component';
import { ActivationComponent } from './activation/activation.component';
import { ArticleComponent } from './article/article.component';
import { ProfilsComponent } from './profils/profils.component';
import { AuthGuard } from './core/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profilGestion', component: GestionProfilComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent }, 
  { path: 'contacte', component: ContacteComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'articleuser', component: ArticleUserComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilsComponent , canActivate: [AuthGuard]},
  { path: 'activation', component: ActivationComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },

    

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
