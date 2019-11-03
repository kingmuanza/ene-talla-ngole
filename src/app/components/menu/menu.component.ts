import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  isAdmin = false;
  noUser = true;
  devise = 'XAF';
  user;
  utilisateur;


  constructor() { }

  ngOnInit() {
    /*this.user = firebase.auth().currentUser;
    console.log(this.user);
    this.utilisateur = localStorage.getItem('EnediartUtilisateur');
    if (this.utilisateur) {
      this.utilisateur = JSON.parse(this.utilisateur);
      this.noUser = false;
      this.getUtilisateurOnFirebase(this.utilisateur);
    }
    const admin = localStorage.getItem('EnediartAdmin');
    if (admin) {
      this.noUser = false;
      this.utilisateur = JSON.parse(admin);
      this.checkIfIsAdmin(this.utilisateur);
    }*/
  }

/*
  getUtilisateurOnFirebase(user) {
    firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then((snapshot) => {
      const utilisateur = snapshot.val();
      this.utilisateur = utilisateur;
      console.log(utilisateur);
      if (utilisateur) {
        this.noUser = false;
      } else {
        const donnees = {
          displayName: user.email,
          email: user.email,
          tel: ' ',
          devise: 'XAF'
        };
        firebase.database().ref('enediart/utilisateurs/' + user.uid).set(donnees).then(() => {
          console.log('Utilisateur enregistré');
        });
      }
    });
  }

  checkIfIsAdmin(user) {
    firebase.database().ref('enediart/administrateurs/' + user.uid).once('value').then((snapshot) => {
      if (snapshot.val()) {
        const isAdmin = snapshot.val();
        console.log('isAdmin');
        console.log(isAdmin);
        this.isAdmin = true;
      }
    });
  }

  deconnexion() {
    firebase.auth().signOut().then(() => {
      console.log('Déconnexion !');
      this.utilisateur = null;
      this.noUser = true;
      this.user = null;
      localStorage.removeItem('EnediartUtilisateur');
      localStorage.removeItem('EnediartAdmin');
      window.location.href = 'index.html';
    }, (error) => {
      console.log(error);
    });
  }

*/
  setDevise(devise) {
    console.log('Changement de dévise');
    localStorage.setItem('EnediartDevise', devise);
    window.location.reload();
  }

  getDevise() {
    const devise = localStorage.getItem('EnediartDevise');
    return devise;
  }

}
