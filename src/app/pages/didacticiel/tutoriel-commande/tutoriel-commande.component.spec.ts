import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorielCommandeComponent } from './tutoriel-commande.component';

describe('TutorielCommandeComponent', () => {
  let component: TutorielCommandeComponent;
  let fixture: ComponentFixture<TutorielCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorielCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorielCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
