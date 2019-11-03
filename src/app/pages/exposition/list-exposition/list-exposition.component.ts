import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';

@Component({
  selector: 'app-list-exposition',
  templateUrl: './list-exposition.component.html',
  styleUrls: ['./list-exposition.component.scss']
})
export class ListExpositionComponent implements OnInit {

  expositions = [];
  exposition;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getExpositions();
  }

  toDate(date) {
    return new Date(date);
  }

  getExpositions() {
    console.log('getExpositions()');
    this.database.getCollection('expositions').then((item) => {
      console.log('item');
      console.log(item);
      this.expositions = item;

    });
  }

  ouvrir(i) {
    this.exposition = this.expositions[i];
    const modal = $('#exampleModal') as any;
    modal.modal('show');
  }

}
