import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaiementMoyenComponent } from './edit-paiement-moyen.component';

describe('EditPaiementMoyenComponent', () => {
  let component: EditPaiementMoyenComponent;
  let fixture: ComponentFixture<EditPaiementMoyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaiementMoyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaiementMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
