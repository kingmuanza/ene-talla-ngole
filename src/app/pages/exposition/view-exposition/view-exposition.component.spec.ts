import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpositionComponent } from './view-exposition.component';

describe('ViewExpositionComponent', () => {
  let component: ViewExpositionComponent;
  let fixture: ComponentFixture<ViewExpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
