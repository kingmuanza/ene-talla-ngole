import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-notation',
  templateUrl: './display-notation.component.html',
  styleUrls: ['./display-notation.component.scss']
})
export class DisplayNotationComponent implements OnInit {

  @Input() notation: number;

  constructor() { }

  ngOnInit() {
  }

}
