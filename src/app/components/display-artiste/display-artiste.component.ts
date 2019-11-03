import { Component, OnInit, Input } from '@angular/core';
import { Artiste } from 'src/app/models/artiste.model';

@Component({
  selector: 'app-display-artiste',
  templateUrl: './display-artiste.component.html',
  styleUrls: ['./display-artiste.component.scss']
})
export class DisplayArtisteComponent implements OnInit {

  @Input() artiste: Artiste;

  constructor() { }

  ngOnInit() {
  }

  ouvrirArtiste(artiste) {
    console.log('ouvrirArtiste()');
    window.location.href = 'artistes/view/' + artiste.id;
  }

}
