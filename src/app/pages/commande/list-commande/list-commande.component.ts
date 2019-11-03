import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-commande',
    templateUrl: './list-commande.component.html',
    styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

    panier = [];
    oeuvre;
    backgroundImage = '';
    total = 0;
    taxe = 0.1925;
    panierSubscription: Subscription;

    constructor(private authentication: AuthenticationService) { }

    ngOnInit() {
        this.panierSubscription = this.authentication.panierSubject.subscribe((panier: any[]) => {
            this.panier = panier;
            console.log('panier format');
            console.log(panier);
            this.getPanier();
        });
        this.authentication.update();
    }

    getPanier() {
        this.total = 0;
        if (this.authentication.panier) {
            this.panier = this.authentication.panier;
            for (let i = 0; i < this.panier.length; i++) {
                const oeuvre = this.panier[i];
                this.backgroundImage = oeuvre.src;
                this.total += Number(oeuvre.prix);
            }
        }
    }

    supprimerOeuvre(oeuvre) {
        if (window.confirm('Etes-vous sûr de vouloir supprimer l`\'oeuvre : \'' + oeuvre.nom + '\' du panier')) {
            this.total = 0;
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
                    this.total += Number(oeuvr.prix);
                }
            }
            this.panier = panier;
            firebase.database().ref('enediart/utilisateurs/' + user.uid + '/panier').set(panier).then(() => {
                console.log('Element supprimer de liste');
                this.authentication.getPanier();
            });
            console.log('Element supprimer de liste');
        }

    }

    prix(prix) {
        if (this.getDevise() === 'euro') {
            return prix / 655.0;
        } else {
            return prix;
        }
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

    ouvrir(i) {
        this.oeuvre = this.panier[i];
        const modal = $('#exampleModal') as any;
        modal.modal('show');
    }

}
