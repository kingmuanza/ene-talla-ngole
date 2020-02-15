import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from './ia/authentication.service';
import { Utilisateur } from './models/utilisateur.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('insideElement', { static: false }) insideElement;
  @ViewChild('moneyInsideElement', { static: false }) moneyInsideElement;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;
  panier;
  panierSubscription: Subscription;
  isAdmin = false;
  userMenuVisible = false;
  moneyMenuVisible = false;

  constructor(private authentication: AuthenticationService, private router: Router) {
    const FIREBASE_CONFIG = {
      apiKey: 'AIzaSyA6BzmVk6TAmQka4-sZVsHmc94ZSXmMRZU',
      authDomain: 'coworking-muanza.firebaseapp.com',
      databaseURL: 'https://coworking-muanza.firebaseio.com',
      projectId: 'coworking-muanza',
      storageBucket: 'coworking-muanza.appspot.com',
      messagingSenderId: '38968912248'
    };
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  onActivate(event) {
    console.log('On Activate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  @HostListener('document:click', ['$event.target']) public onClick(targetElement) {
    if (this.insideElement) {
      const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      if (this.userMenuVisible) {
        if (!clickedInside) {
          console.log('outside clicked');
          this.userMenuVisible = false;
        }
      }
    }
    if (this.moneyInsideElement) {
      const clickedInside = this.moneyInsideElement.nativeElement.contains(targetElement);
      if (this.moneyMenuVisible) {
        if (!clickedInside) {
          console.log('outside clicked');
          this.moneyMenuVisible = false;
        }
      }
    }
  }

  ngOnInit(): void {
    this.panierSubscription = this.authentication.panierSubject.subscribe((panier) => {
      console.log('Prise en compte du changement du panier');
      this.panier = panier;
    });
    this.utilisateurSubscription = this.authentication.utilisateurSubject.subscribe((utilisateur) => {
      console.log('Prise en compte du changement d\'utilisateur');
      if (utilisateur) {

        this.utilisateur = utilisateur as Utilisateur;
        this.panier = this.utilisateur.panier;
        this.checkIfIsAdmin(this.utilisateur);
      } else {
        this.panier = [];
      }
    });
    this.authentication.update();
    this.authentication.autoConnexion();
    this.authentication.getPanier();
    this.autoRoute();
  }

  autoRoute() {
    const recentePageVisitee = localStorage.getItem('EnediartLastRoute');
    if (recentePageVisitee) {
      const visitePage = JSON.parse(recentePageVisitee);
      const dateVisite = new Date(visitePage.date);
      const diff = this.differenceEntreDeuxDatesEnSecondes(new Date(), dateVisite);
      if (diff < 5) {
        this.router.navigate([visitePage.path]);
      }
    }
  }

  differenceEntreDeuxDatesEnSecondes(datePlusGrande, datePlusPetite): number {
    const startDate = new Date();
    // Do your operations
    const endDate = new Date();
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    return seconds;
  }

  checkIfIsAdmin(user) {
    this.authentication.checkIfIsAdmin(user).then((bool) => {
      if (bool) {
        this.isAdmin = true;
      }
    });
  }

  deconnexion() {
    this.userMenuVisible = false;
    this.authentication.deconnexion().then(() => {
      this.router.navigate(['accueil']);
      this.utilisateur = null;
      this.panier = null;
    }).catch(() => {
      alert('Impossible de vous déconnecter !!');
    });
  }
  goToMyProfile() {
    this.userMenuVisible = false;
    this.router.navigate(['profil']);
  }
  changerPasse() {
    this.userMenuVisible = false;
    this.router.navigate(['changerpasse']);
  }

  setDevise(devise) {
    console.log('Changement de dévise');
    localStorage.setItem('EnediartDevise', devise);
    window.location.reload();
  }

  getDevise() {
    const devise = localStorage.getItem('EnediartDevise');
    return devise;
  }

  toggleUserMenu() {
    setTimeout(() => {
      if (this.userMenuVisible) {
        this.userMenuVisible = false;
      } else {
        this.userMenuVisible = true;
      }
    }, 100);
  }
  toggleMoneyMenu() {
    setTimeout(() => {
      if (this.moneyMenuVisible) {
        this.moneyMenuVisible = false;
      } else {
        this.moneyMenuVisible = true;
      }
    }, 100);
  }
}
