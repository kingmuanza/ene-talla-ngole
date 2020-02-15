import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  utilisateur: Utilisateur;
  utilisateurSubject = new Subject();
  panier;
  panierSubject = new Subject();

  constructor() { }

  update() {
    this.utilisateurSubject.next(this.utilisateur);
    this.panierSubject.next(this.panier);
    this.checkIfIsAdmin(this.utilisateur).then((resultat) => {
      if (resultat) {
        this.utilisateur.isAdmin = true;
        this.utilisateurSubject.next(this.utilisateur);
      }
    });

  }

  getPanier() {
    const user = this.utilisateur;
    if (user) {
      console.log('Utilisateur trouvé');
      firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then((snapshot) => {
        if (snapshot != null && snapshot.val() != null) {

          const donnees = snapshot.val();
          console.log(donnees);
          let panier = donnees.panier;
          if (panier) {

          } else {
            panier = [];
          }
          this.panier = panier;
          this.update();
        } else {

        }
      });
    } else {
      const panierString = localStorage.getItem('ENEDIARTPanier');
      if (panierString) {
        // console.log('panierString');
        // console.log(panierString);
        try {
          const panier = JSON.parse(panierString);
          if (Array.isArray(panier)) {
            this.panier = panier;
            this.update();
          }
        } catch (e) {
          this.panier = [];
          this.update();
        }
      }

    }
  }

  connexion(login, passe) {
    console.log('Connexion via authentication service');
    return new Promise((resolve, reject) => {
      console.log('Initiation de firebase');
      firebase.auth().signInWithEmailAndPassword(login, passe).then((resultat) => {
        console.log('Succès authentication');
        if (resultat) {
          const utilisateur = {
            uid: resultat.user.uid,
            email: login
          };
          this.utilisateur = utilisateur as Utilisateur;
          console.log('Récupération de l\'utilisateur dans la base');
          this.getUtilisateurOnFirebase(utilisateur);
          this.getPanier();
          resolve(utilisateur);
        } else {
          reject();
        }
      }).catch((e) => {
        reject();
      });
    });
  }

  autoConnexion() {
    const utilisateur = localStorage.getItem('EnediartUtilisateur');
    console.log('localStorage user');
    console.log(utilisateur);
    if (utilisateur) {
      this.utilisateur = JSON.parse(utilisateur);
      this.update();
      this.getUtilisateurOnFirebase(this.utilisateur);
      this.getPanier();
      const admin = localStorage.getItem('EnediartAdmin');
      if (admin) {
        this.utilisateur = JSON.parse(admin);
        this.checkIfIsAdmin(utilisateur);
      }
    }
  }

  getUtilisateurOnFirebase(user) {
    console.log('getUtilisateurOnFirebase Récupération de l\'utilisateur dans la base');
    return new Promise((resolve, reject) => {
      console.log('getUtilisateurOnFirebase');
      console.log(user);
      firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then((snapshot) => {
        console.log('getUtilisateurOnFirebase Réussie');
        const utilisateur = snapshot.val();
        console.log('utilisateur snapchot');
        console.log(utilisateur);
        if (utilisateur) {
          console.log('utilisateur trouvé !!!');
          utilisateur['uid'] = user.uid;
          this.utilisateur = utilisateur;
          this.update();
          resolve(this.utilisateur);
          localStorage.setItem('EnediartUtilisateur', JSON.stringify(this.utilisateur));

        } else {
          const me = new Utilisateur();
          me.id = user.uid;
          me.uid = user.uid;
          if (user.displayName) {
            me.displayName = user.displayName;
          }
          me.email = user.email;
          console.log('vhlvzvbzfv');
          console.log(user);
          console.log(user.uid);
          firebase.database().ref('enediart/utilisateurs/' + user.uid).set(me).then(() => {
            console.log('Utilisateur enregistré');
            this.utilisateur = me;
            localStorage.setItem('EnediartUtilisateur', JSON.stringify(this.utilisateur));
            this.update();
            resolve(this.utilisateur);
          });
        }
      }).catch((e) => {
        console.log('Echec très mal');
        console.log(e);
      });
    });

  }

  checkIfIsAdmin(user): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/administrateurs/' + user.uid).once('value').then((snapshot) => {
        if (snapshot.val()) {
          const isAdmin = snapshot.val();
          console.log('isAdmin');
          console.log(isAdmin);
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((e) => {
        resolve(false);
      });
    });
  }

  deconnexion() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        console.log('Déconnexion !');
        this.utilisateur = null;
        this.panier = null;
        localStorage.removeItem('EnediartUtilisateur');
        localStorage.removeItem('EnediartAdmin');
        resolve(null);
        this.update();
      }, (error) => {
        console.log(error);
        reject(null);
      });
    });

  }
}
