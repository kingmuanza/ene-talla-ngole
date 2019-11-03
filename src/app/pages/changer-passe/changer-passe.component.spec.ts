import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerPasseComponent } from './changer-passe.component';

describe('ChangerPasseComponent', () => {
  let component: ChangerPasseComponent;
  let fixture: ComponentFixture<ChangerPasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerPasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
