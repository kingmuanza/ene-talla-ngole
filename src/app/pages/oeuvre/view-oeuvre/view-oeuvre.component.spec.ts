import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOeuvreComponent } from './view-oeuvre.component';

describe('ViewOeuvreComponent', () => {
  let component: ViewOeuvreComponent;
  let fixture: ComponentFixture<ViewOeuvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
