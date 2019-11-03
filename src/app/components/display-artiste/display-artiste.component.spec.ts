import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArtisteComponent } from './display-artiste.component';

describe('DisplayArtisteComponent', () => {
  let component: DisplayArtisteComponent;
  let fixture: ComponentFixture<DisplayArtisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayArtisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
