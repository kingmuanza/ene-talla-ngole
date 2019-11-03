import { Component, OnInit, Input } from '@angular/core';
import { Oeuvre } from 'src/app/models/oeuvre.model';

@Component({
  selector: 'app-display-oeuvre',
  templateUrl: './display-oeuvre.component.html',
  styleUrls: ['./display-oeuvre.component.scss']
})
export class DisplayOeuvreComponent implements OnInit {

  @Input() oeuvre: Oeuvre;

  constructor() { }

  ngOnInit() {
  }

  ouvrir(oeuvre) {
    window.location.href = 'oeuvres/view/' + oeuvre.id;
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


}
