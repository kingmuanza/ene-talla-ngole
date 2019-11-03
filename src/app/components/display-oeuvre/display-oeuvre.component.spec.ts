import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOeuvreComponent } from './display-oeuvre.component';

describe('DisplayOeuvreComponent', () => {
  let component: DisplayOeuvreComponent;
  let fixture: ComponentFixture<DisplayOeuvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
