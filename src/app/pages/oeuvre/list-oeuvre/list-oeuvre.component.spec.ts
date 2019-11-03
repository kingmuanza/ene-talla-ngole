import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOeuvreComponent } from './list-oeuvre.component';

describe('ListOeuvreComponent', () => {
  let component: ListOeuvreComponent;
  let fixture: ComponentFixture<ListOeuvreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOeuvreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
