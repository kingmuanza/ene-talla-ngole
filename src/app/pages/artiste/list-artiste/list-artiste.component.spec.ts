import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArtisteComponent } from './list-artiste.component';

describe('ListArtisteComponent', () => {
  let component: ListArtisteComponent;
  let fixture: ComponentFixture<ListArtisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArtisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
