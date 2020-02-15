import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from 'src/app/ia/database.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  artistes = [];
  oeuvres = [];
  expositions = [];
  oeuvre;
  newsForm: FormGroup;
  private readonly notifier: NotifierService;
  notRegisterInNewsLetter = true;

  // tslint:disable-next-line:max-line-length
  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder, private database: DatabaseService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getArtistes();
    this.getOeuvres();
    this.getExpositions();
    this.initNewsForm();
  }

  initNewsForm() {
    this.newsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitNewsForm() {
    const value = this.newsForm.value;
    const mail = value.email;
    this.ajouterMail(mail);
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


  ouvrir(i) {
    this.oeuvre = this.oeuvres[i];
    const modal = $('#exampleModal') as any;
    modal.modal('show');
  }

  toDate(str) {
    return new Date(str);
  }

  getArtistes() {
    console.log('getArtistes()');
    this.database.getCollectionLimitTo('artistes', 4, null).then((item) => {
      console.log('item');
      console.log(item);
      this.artistes = item;

    });
  }

  ouvrirArtiste(artiste) {
    console.log('ouvrirArtiste()');
    window.location.href = 'artistes/view/' + artiste.id;
  }


  getOeuvres() {
    console.log('getOeuvres()');
    this.database.getCollectionLimitTo('oeuvres', 6, null).then((item) => {
      console.log('item');
      console.log(item);
      this.oeuvres = item;

    });
  }

  ouvrirOeuvre(oeuvre) {
    window.location.href = 'oeuvres/view/' + oeuvre.id;
  }



  getExpositions() {
    console.log('getExpositions()');
    this.database.getCollectionLimitTo('expositions', 1, null).then((item) => {
      console.log('item');
      console.log(item);
      this.expositions = item;

    });
  }

  ouvrirExposition(exposition) {
    window.location.href = 'expositions/view/' + exposition.id;
  }

  generateUID() {
    return Math.floor(Math.random() * 7478855);
  }

  ajouterMail(mail) {
    console.log('email');
    console.log(mail);
    const id = this.generateUID();
    let newsletters = {

    };
    firebase.database().ref('enediart/newsletters/').once('value').then((snapshot) => {
      if (snapshot != null && snapshot.val() != null) {
        newsletters = snapshot.val();
      }
      newsletters[id] = {
        email: mail,
        date: new Date().toDateString()
      };
      firebase.database().ref('enediart/newsletters/').set(newsletters, (element) => {
        console.log('erreur : ' + element);
      });
      this.notifier.show({
        message: 'Votre email a été ajouté à la newsletter',
        type: 'success'
      });
      this.notRegisterInNewsLetter = false;
    });

  }

}
