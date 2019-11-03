import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaiementMoyenComponent } from './view-paiement-moyen.component';

describe('ViewPaiementMoyenComponent', () => {
  let component: ViewPaiementMoyenComponent;
  let fixture: ComponentFixture<ViewPaiementMoyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaiementMoyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaiementMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
