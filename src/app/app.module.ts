import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTES} from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleUserComponent } from './ShareATrip/ShareATrip.component';
import { HomeComponent } from './home/home.component';
import { GestionProfilComponent } from './profil/gestion-profil/gestion-profil.component';
import { LogInterceptor } from './LogInterceptor';
import { ContacteComponent } from './contacte/contacte.component';
import { ActivationComponent } from './activation/activation.component';
import { ArticleComponent } from './article/article.component';
import { NavComponent } from './profil/nav/nav.component';
import { AdminComponent } from './admin/admin.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ChartComponent } from './chart/chart.component';
import { ItemCardComponent } from './profil/item-card/item-card.component';
import { ProfilComponent } from './profil/profil/profil.component';



@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
   
    NavbarComponent,
    HomeComponent,
    ArticleUserComponent,
    GestionProfilComponent,
    ContacteComponent,
    ActivationComponent,
    ArticleComponent,
    NavComponent,
    AdminComponent,
    RecoveryComponent,
    ChartComponent,
    ItemCardComponent,
    ProfilComponent,
  

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
