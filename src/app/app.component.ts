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
    this.utilisateurSubscription = this.authentication.utilisateurSubject.subscribe((utilisateur) => {
      console.log('Prise en compte du changement d\'utilisateur');
      this.utilisateur = utilisateur as Utilisateur;
      if (utilisateur) {
        this.checkIfIsAdmin(this.utilisateur);
      }
    });
    this.authentication.update();
    this.authentication.autoConnexion();
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
