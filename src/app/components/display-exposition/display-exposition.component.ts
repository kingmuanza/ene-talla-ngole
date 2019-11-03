import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-exposition',
  templateUrl: './display-exposition.component.html',
  styleUrls: ['./display-exposition.component.scss']
})
export class DisplayExpositionComponent implements OnInit {

  @Input() exposition;

  constructor() { }

  ngOnInit() {
  }

  toDate(str) {
    return new Date(str);
  }


}
