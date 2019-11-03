import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from 'src/app/ia/database.service';

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

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getArtistes();
    this.getOeuvres();
    this.getExpositions();
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

}
