import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AuthGuard } from './security/authentication';
import { ListOeuvreComponent } from './pages/oeuvre/list-oeuvre/list-oeuvre.component';
import { ViewOeuvreComponent } from './pages/oeuvre/view-oeuvre/view-oeuvre.component';
import { EditOeuvreComponent } from './pages/oeuvre/edit-oeuvre/edit-oeuvre.component';
import { ListArtisteComponent } from './pages/artiste/list-artiste/list-artiste.component';
import { ViewArtisteComponent } from './pages/artiste/view-artiste/view-artiste.component';
import { EditArtisteComponent } from './pages/artiste/edit-artiste/edit-artiste.component';
import { ListExpositionComponent } from './pages/exposition/list-exposition/list-exposition.component';
import { ViewExpositionComponent } from './pages/exposition/view-exposition/view-exposition.component';
import { EditExpositionComponent } from './pages/exposition/edit-exposition/edit-exposition.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { EneditripComponent } from './pages/eneditrip/eneditrip.component';
import { ListCommandeComponent } from './pages/commande/list-commande/list-commande.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { RechercherComponent } from './pages/rechercher/rechercher.component';
import { ChangerPasseComponent } from './pages/changer-passe/changer-passe.component';

export const appRoutes: Routes = [
    { path: 'accueil', component: AccueilComponent },
    { path: 'contacteznous', component: ContactusComponent },
    { path: 'eneditrip', component: EneditripComponent },
    { path: 'panier', component: ListCommandeComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'rechercher', component: RechercherComponent },
    { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
    { path: 'changerpasse', canActivate: [AuthGuard], component: ChangerPasseComponent },

    { path: 'oeuvres', canActivate: [AuthGuard], component: ListOeuvreComponent },
    { path: 'oeuvres/view/:id', canActivate: [AuthGuard], component: ViewOeuvreComponent },
    { path: 'oeuvres/edit/:id', canActivate: [AuthGuard], component: EditOeuvreComponent },

    { path: 'artistes', canActivate: [AuthGuard], component: ListArtisteComponent },
    { path: 'artistes/view/:id', canActivate: [AuthGuard], component: ViewArtisteComponent },
    { path: 'artistes/edit/:id', canActivate: [AuthGuard], component: EditArtisteComponent },

    { path: 'expositions', canActivate: [AuthGuard], component: ListExpositionComponent },
    { path: 'expositions/view/:id', canActivate: [AuthGuard], component: ViewExpositionComponent },
    { path: 'expositions/edit/:id', canActivate: [AuthGuard], component: EditExpositionComponent },

    { path: '**', redirectTo: 'accueil' }
];
