import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';
import { ActivatedRoute } from '@angular/router';
import { Oeuvre } from 'src/app/models/oeuvre.model';

@Component({
  selector: 'app-view-artiste',
  templateUrl: './view-artiste.component.html',
  styleUrls: ['./view-artiste.component.scss']
})
export class ViewArtisteComponent implements OnInit {

  artiste;
  oeuvres = [];
  oeuvre = new Oeuvre();

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

  ouvrir(oeuvre) {
    console.log('Muanza le mignon');
    console.log(oeuvre);
    this.oeuvre = oeuvre;
    const modal = $('#viewoeuvre') as any;
    modal.modal('show');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(ParamsAsMap => {
      const id = ParamsAsMap.get('id');
      this.getArtiste(id);
      this.getOeuvres(id);
    });
  }

  getOeuvres(idartiste) {
    console.log('getOeuvres()');
    this.database.getCollection('oeuvres').then((items) => {
      console.log('item');
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.artiste.id === idartiste) {
          this.oeuvres.push(item);
        }
      }

    });
  }

  getArtiste(id) {
    console.log('getArtiste()');
    this.database.getDocumentById('artistes', id).then((item) => {
      console.log('item');
      console.log(item);
      this.artiste = item;
    });
  }
}
