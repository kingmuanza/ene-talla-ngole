import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExpositionComponent } from './display-exposition.component';

describe('DisplayExpositionComponent', () => {
  let component: DisplayExpositionComponent;
  let fixture: ComponentFixture<DisplayExpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayExpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayExpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
