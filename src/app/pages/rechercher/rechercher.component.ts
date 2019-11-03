import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.scss']
})
export class RechercherComponent implements OnInit {

  oeuvres = [];
  artistes = [];
  expositions = [];
  nom = '';

  constructor(private database: DatabaseService) { }

  ngOnInit() {

  }

  rechercher() {
    console.log(this.nom);
    this.getOeuvres(this.nom);
    this.getArtistes(this.nom);
    this.getExpositions(this.nom);
  }

  getOeuvres(str) {
    this.oeuvres = [];
    console.log('getOeuvres()');
    this.database.getCollection('oeuvres').then((items) => {
      console.log('items');
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.nom.indexOf(str) !== -1) {
          this.oeuvres.push(item);
        }
      }
    });
  }

  getArtistes(str) {
    this.oeuvres = [];
    console.log('getArtistes()');
    this.database.getCollection('artistes').then((items) => {
      console.log('items');
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.nom.indexOf(str) !== -1) {
          this.artistes.push(item);
        }
      }
    });
  }
  getExpositions(str) {
    this.oeuvres = [];
    console.log('getExpositions()');
    this.database.getCollection('expositions').then((items) => {
      console.log('items');
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.nom.indexOf(str) !== -1) {
          this.expositions.push(item);
        }
      }
    });
  }

}
