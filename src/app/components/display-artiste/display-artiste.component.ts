import { Component, OnInit, Input } from '@angular/core';
import { Artiste } from 'src/app/models/artiste.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-artiste',
  templateUrl: './display-artiste.component.html',
  styleUrls: ['./display-artiste.component.scss']
})
export class DisplayArtisteComponent implements OnInit {

  @Input() artiste: Artiste;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ouvrirArtiste(artiste) {
    console.log('ouvrirArtiste()');
    this.router.navigate(['artistes', 'view', artiste.id]);
  }

}
