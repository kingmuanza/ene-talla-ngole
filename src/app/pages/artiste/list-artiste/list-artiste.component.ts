import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';

@Component({
  selector: 'app-list-artiste',
  templateUrl: './list-artiste.component.html',
  styleUrls: ['./list-artiste.component.scss']
})
export class ListArtisteComponent implements OnInit {

  artistes = [];

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getArtistes();
  }

  getArtistes() {
    console.log('getArtistes()');
    this.database.getCollection('artistes').then((item) => {
      console.log('item');
      console.log(item);
      this.artistes = item;
    });
  }

}
