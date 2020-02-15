import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { Oeuvre } from 'src/app/models/oeuvre.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';

@Component({
  selector: 'app-view-oeuvre',
  templateUrl: './view-oeuvre.component.html',
  styleUrls: ['./view-oeuvre.component.scss']
})
export class ViewOeuvreComponent implements OnInit, OnChanges {

  @Input() oeuvre;
  panier = [];
  estPresent = false;
  panierSubscription: Subscription;
  utilisateurSubscription: Subscription;
  private readonly notifier: NotifierService;
  utilisateur: Utilisateur;

  constructor(private router: Router, private notifierService: NotifierService, private authentication: AuthenticationService) {
    this.notifier = notifierService;
  }

  edit(oeuvre: Oeuvre) {
    const modal = $('#exampleModal') as any;
    modal.modal('hide');
    const modal2 = $('#viewoeuvre') as any;
    modal2.modal('hide');
    this.router.navigate(['oeuvres', 'edit', oeuvre.id]);
  }

  ngOnInit() {
    this.panierSubscription = this.authentication.panierSubject.subscribe((panier: Array<any>) => {
      console.log('Prise en compte du changement du panier');
      this.panier = panier;
    });
    this.utilisateurSubscription = this.authentication.utilisateurSubject.subscribe((utilisateur: any) => {
      if (utilisateur) {
        this.utilisateur = utilisateur;
        this.panier = utilisateur.panier;
        this.estPresentDansPanier(this.panier, this.oeuvre);
      }
    });
    this.authentication.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changements doeuvre');
    console.log(this.panier);
    console.log(this.oeuvre);
    this.estPresentDansPanier(this.panier, this.oeuvre);
  }

  estPresentDansPanier(panier, oeuvre) {
    if (!panier) {

    }
    if (panier && oeuvre) {
      for (let j = 0; j < panier.length; j++) {
        const element = panier[j];
        if (element.id === oeuvre.id) {
          this.estPresent = true;
          return true;
        }
      }
    }
    this.estPresent = false;
    return false;
  }

  ajouterAuPanier() {
    this.authentication.getPanier();
    if (this.authentication.utilisateur) {
      if (this.authentication.utilisateur.panier) {
        this.panier = this.authentication.utilisateur.panier;
      } else {
        this.panier = [];
      }
    } else {
      this.panier = [];
    }
    if (this.estPresent) {
      alert('L\'oeuvre \'' + this.oeuvre.nom + '\' est déjà présente dans votre panier');
    } else {
      this.oeuvre['date'] = new Date().toISOString();
      this.panier.push(this.oeuvre);
    }
    const utilisateur = this.authentication.utilisateur;
    if (utilisateur) {
      utilisateur['panier'] = this.panier;
      firebase.database().ref('enediart/utilisateurs/' + utilisateur.uid + '/panier').set(this.panier).then(() => {
        console.log('Element supprimer de liste');
        this.authentication.getPanier();
        this.notifier.show({
          message: 'L\'oeuvre \'' + this.oeuvre.nom + '\' a été ajoutée au panier',
          type: 'success'
        });
      });
    } else {
      this.authentication.panier = this.panier;
      this.authentication.update();
      this.estPresentDansPanier(this.panier, this.oeuvre);
      this.notifier.show({
        message: 'L\'oeuvre \'' + this.oeuvre.nom + '\' a été ajoutée au panier',
        type: 'success'
      });
    }
  }

  supprimerOeuvre() {
    const oeuvre = this.oeuvre;
    if (window.confirm('Etes-vous sûr de vouloir supprimer l`\'oeuvre : \'' + oeuvre.nom + '\' du panier')) {
      const panier = [];
      const user = this.authentication.utilisateur;
      for (let i = 0; i < this.panier.length; i++) {
        const o = this.panier[i];
        const oeu = o;
        console.log('oeu');
        console.log(oeu);
        const oeuvr = oeu;
        console.log('oeuvr');
        console.log(oeuvr);
        if (oeuvr.id === oeuvre.id) {

        } else {
          panier.push(oeuvr);
        }
      }
      if (this.authentication.utilisateur) {

        this.authentication.utilisateur.panier = panier;
        this.authentication.update();
        console.log('user.uid');
        console.log(user);
        console.log(user.uid);
        firebase.database().ref('enediart/utilisateurs/' + user.uid + '/panier').set(panier).then(() => {
          console.log('Element supprimer de liste');
          this.authentication.getPanier();
          this.estPresent = false;
          this.notifier.show({
            message: 'L\'oeuvre \'' + this.oeuvre.nom + '\' a été retirée du panier',
            type: 'success'
          });
        });
      } else {
        this.panier = panier;
        this.authentication.panier = this.panier;
        this.authentication.update();
        this.estPresentDansPanier(this.panier, this.oeuvre);
        this.notifier.show({
          message: 'L\'oeuvre \'' + this.oeuvre.nom + '\' a été retirée du panier',
          type: 'success'
        });
      }
    }

  }

  prix(prix) {
    if (this.getDevise() === 'euro') {
      return prix / 655.0;
    } else {
      return prix;
    }
  }

  voirArtiste(artiste) {

  }

  devise() {
    if (this.getDevise() === 'euro') {
      return '€';
    } else {
      return 'XAF';
    }
  }

  prixEtDevise(prix) {
    if (this.getDevise() === 'euro') {
      return this.devise() + ' ' + this.prix(prix);
    } else {
      return this.prix(prix) + ' ' + this.devise();
    }
  }

  getDevise() {
    const devise = localStorage.getItem('EnediartDevise');
    return devise;
  }


}
