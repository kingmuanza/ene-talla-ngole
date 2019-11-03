import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';

@Component({
  selector: 'app-list-oeuvre',
  templateUrl: './list-oeuvre.component.html',
  styleUrls: ['./list-oeuvre.component.scss']
})
export class ListOeuvreComponent implements OnInit {

  oeuvres = [];
  oeuvre;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getOeuvres();
  }

  getOeuvres() {
    console.log('getOeuvres()');
    this.database.getCollection('oeuvres').then((item) => {
      console.log('item');
      console.log(item);
      this.oeuvres = item;

    });
  }

  ouvrir(i) {
    this.oeuvre = this.oeuvres[i];
    const modal = $('#exampleModal') as any;
    modal.modal('show');
  }

}
