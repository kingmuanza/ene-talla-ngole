import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EneditripComponent } from './eneditrip.component';

describe('EneditripComponent', () => {
  let component: EneditripComponent;
  let fixture: ComponentFixture<EneditripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EneditripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EneditripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
