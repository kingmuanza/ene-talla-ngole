import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOeuvreComponent } from './pages/oeuvre/list-oeuvre/list-oeuvre.component';
import { ViewOeuvreComponent } from './pages/oeuvre/view-oeuvre/view-oeuvre.component';
import { EditOeuvreComponent } from './pages/oeuvre/edit-oeuvre/edit-oeuvre.component';
import { ListArtisteComponent } from './pages/artiste/list-artiste/list-artiste.component';
import { ViewArtisteComponent } from './pages/artiste/view-artiste/view-artiste.component';
import { EditArtisteComponent } from './pages/artiste/edit-artiste/edit-artiste.component';
import { ListExpositionComponent } from './pages/exposition/list-exposition/list-exposition.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { EneditripComponent } from './pages/eneditrip/eneditrip.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { ListCommandeComponent } from './pages/commande/list-commande/list-commande.component';
import { ViewCommandeComponent } from './pages/commande/view-commande/view-commande.component';
import { EditCommandeComponent } from './pages/commande/edit-commande/edit-commande.component';
import { ListPaiementComponent } from './pages/paiement/list-paiement/list-paiement.component';
import { ViewPaiementComponent } from './pages/paiement/view-paiement/view-paiement.component';
import { EditPaiementComponent } from './pages/paiement/edit-paiement/edit-paiement.component';
import { RechercherComponent } from './pages/rechercher/rechercher.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ListPaiementMoyenComponent } from './pages/paiement-moyen/list-paiement-moyen/list-paiement-moyen.component';
import { ViewPaiementMoyenComponent } from './pages/paiement-moyen/view-paiement-moyen/view-paiement-moyen.component';
import { EditPaiementMoyenComponent } from './pages/paiement-moyen/edit-paiement-moyen/edit-paiement-moyen.component';
import { TutorielCommandeComponent } from './pages/didacticiel/tutoriel-commande/tutoriel-commande.component';
import { DisplayOeuvreComponent } from './components/display-oeuvre/display-oeuvre.component';
import { DisplayArtisteComponent } from './components/display-artiste/display-artiste.component';
import { DisplayExpositionComponent } from './components/display-exposition/display-exposition.component';
import { DisplayNotationComponent } from './components/display-notation/display-notation.component';
import { ListMessageComponent } from './pages/message/list-message/list-message.component';
import { ViewMessageComponent } from './pages/message/view-message/view-message.component';
import { EditMessageComponent } from './pages/message/edit-message/edit-message.component';
import { MenuComponent } from './components/menu/menu.component';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './security/authentication';
import { ViewExpositionComponent } from './pages/exposition/view-exposition/view-exposition.component';
import { EditExpositionComponent } from './pages/exposition/edit-exposition/edit-exposition.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooterComponent } from './components/footer/footer.component';
import { ChangerPasseComponent } from './pages/changer-passe/changer-passe.component';

import { NotifierModule } from 'angular-notifier';
import { NgxPayPalModule } from 'ngx-paypal';
import { HttpClientModule } from '@angular/common/http';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyA6BzmVk6TAmQka4-sZVsHmc94ZSXmMRZU',
  authDomain: 'coworking-muanza.firebaseapp.com',
  databaseURL: 'https://coworking-muanza.firebaseio.com',
  projectId: 'coworking-muanza',
  storageBucket: 'coworking-muanza.appspot.com',
  messagingSenderId: '38968912248'
};

@NgModule({
  declarations: [
    AppComponent,
    ListOeuvreComponent,
    ViewOeuvreComponent,
    EditOeuvreComponent,
    ListArtisteComponent,
    ViewArtisteComponent,
    EditArtisteComponent,
    ListExpositionComponent,
    AccueilComponent,
    AboutComponent,
    ContactusComponent,
    EneditripComponent,
    MentionsLegalesComponent,
    ListCommandeComponent,
    ViewCommandeComponent,
    EditCommandeComponent,
    ListPaiementComponent,
    ViewPaiementComponent,
    EditPaiementComponent,
    RechercherComponent,
    ProfilComponent,
    ListPaiementMoyenComponent,
    ViewPaiementMoyenComponent,
    EditPaiementMoyenComponent,
    TutorielCommandeComponent,
    DisplayOeuvreComponent,
    DisplayArtisteComponent,
    DisplayExpositionComponent,
    DisplayNotationComponent,
    ListMessageComponent,
    ViewMessageComponent,
    EditMessageComponent,
    MenuComponent,
    ViewExpositionComponent,
    EditExpositionComponent,
    ConnexionComponent,
    InscriptionComponent,
    FooterComponent,
    ChangerPasseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    NgxPayPalModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
