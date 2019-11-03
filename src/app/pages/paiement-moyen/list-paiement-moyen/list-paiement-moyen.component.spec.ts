import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaiementMoyenComponent } from './list-paiement-moyen.component';

describe('ListPaiementMoyenComponent', () => {
  let component: ListPaiementMoyenComponent;
  let fixture: ComponentFixture<ListPaiementMoyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaiementMoyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaiementMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
